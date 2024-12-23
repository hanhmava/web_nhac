
const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user");  // Đảm bảo đúng tên file mô hình user

// Middleware to verify JWT
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (!token) return res.status(401).send({ message: "Access Denied: No Token Provided" });

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.status(403).send({ message: "Invalid or Expired Token" });
    req.user = user;  // Attach user info to the request
    next();
  });
};

// User login route
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).send({ message: "Email and password are required" });
  }

  try {
    const foundUser = await User.findOne({ email });
    if (!foundUser) {
      return res.status(404).send({ message: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, foundUser.password);
    if (!isMatch) {
      return res.status(401).send({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      { user_id: foundUser._id, email: foundUser.email, role: foundUser.role },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.status(200).send({
      message: "Login successful",
      token,
      user: {
        name: foundUser.name,
        email: foundUser.email,
        role: foundUser.role,
        user_id: foundUser.user_id,  // Đảm bảo trả về user_id
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Server error" });
  }
});

// User registration route
router.post("/register", async (req, res) => {
  const { email, name, password, role = "member" } = req.body;

  if (!email || !name || !password) {
    return res.status(400).send({ message: "Email, name, and password are required" });
  }

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).send({ message: "User with this email already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      role,
      user_id: new Date().getTime().toString(),  // Hoặc dùng UUID nếu muốn
    });

    const savedUser = await newUser.save();

    const token = jwt.sign(
      { user_id: savedUser._id, email: savedUser.email, role: savedUser.role },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.status(201).send({
      message: "User registered successfully",
      token,
      user: {
        name: savedUser.name,
        email: savedUser.email,
        role: savedUser.role,
        user_id: savedUser.user_id,  // Đảm bảo trả về user_id
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Server error" });
  }
});

// Get current user (protected)
router.get("/me", authenticateToken, async (req, res) => {
  try {
    const currentUser = await User.findById(req.user.user_id);
    if (!currentUser) {
      return res.status(404).send({ message: "User not found" });
    }
    res.status(200).send({ user: currentUser });
  } catch (error) {
    res.status(500).send({ message: "Server error" });
  }
});

// Get all users (protected)
router.get("/getUsers", authenticateToken, async (req, res) => {
  try {
    const users = await User.find().sort({ createdAt: 1 });
    res.status(200).send({ success: true, data: users });
  } catch (error) {
    res.status(500).send({ success: false, msg: "Server error" });
  }
});

router.delete('/delete/:userId', authenticateToken, async (req, res) => {
  const { userId } = req.params;
  
  try {
    const user = await User.findByIdAndDelete(userId);
    if (!user) {
      return res.status(404).send({ message: 'User not found' });
    }
    res.status(200).send({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(500).send({ message: 'Error deleting user', error });
  }
});


// Update user role (protected)
router.put("/updateRole/:userId", authenticateToken, async (req, res) => {
  const { userId } = req.params;
  const { role } = req.body;

  if (!role) {
    return res.status(400).send({ message: "Role is required" });
  }

  try {
    const updatedUser = await User.findByIdAndUpdate(userId, { role }, { new: true });
    if (!updatedUser) {
      return res.status(404).send({ success: false, msg: "User not found" });
    }
    res.status(200).send({ success: true, user: updatedUser });
  } catch (err) {
    res.status(500).send({ success: false, msg: err.message });
  }
});

// Add song to favourites (protected)
router.put("/favourites/:userId", async (req, res) => {
  const { userId } = req.params;
  const { songId } = req.body;

  try {
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { $addToSet: { favourites: songId } }, // Using $addToSet to prevent duplicates
      { new: true }
    );
    if (!updatedUser) {
      return res.status(404).send({ success: false, msg: "User not found" });
    }
    res.status(200).send({ success: true, msg: "Song added to favourites" });
  } catch (error) {
    console.error("Error adding song to favourites:", error);
    res.status(500).send({ success: false, msg: "Server error" });
  }
});

// Remove song from favourites (protected)
router.put("/removeFavourites/:userId", async (req, res) => {
  const { userId } = req.params;
  const { songId } = req.body;

  try {
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { $pull: { favourites: songId } },
      { new: true }
    );
    if (!updatedUser) {
      return res.status(404).send({ success: false, msg: "User not found" });
    }
    res.status(200).send({ success: true, msg: "Song removed from favourites" });
  } catch (error) {
    res.status(500).send({ success: false, msg: "Server error" });
  }
});

module.exports = router;
