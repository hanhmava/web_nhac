const express = require("express");
const app = express();
require('dotenv').config();
const cors = require("cors");
const mongoose = require("mongoose");

const multer = require('multer');
const fs = require('fs');
const path = require('path');



// CORS configuration
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

// Middleware to parse JSON bodies
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// Connect to MongoDB
mongoose.set('strictQuery', false); // Set the strictQuery option to suppress warnings
mongoose.connect(process.env.DB_STRING, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.connection
    .once("open", () => console.log("Connected to MongoDB"))
    .on("error", (error) => {
        console.log(`Error: ${error}`);
    });

// Setting up multer storage for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadPath = file.fieldname === 'file' ? 'uploads' : 'audio';
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath); // Create folder if doesn't exist
    }
    cb(null, uploadPath); // Save in either 'uploads' or 'audio' folder
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Timestamp as filename
  }
});

const upload = multer({ storage });

// MongoDB Models
const artistSchema = new mongoose.Schema({
  name: { type: String, required: true },
  genre: String,
});

const Artist = mongoose.model('Artist', artistSchema);

const albumSchema = new mongoose.Schema({
  name: { type: String, required: true },
  releaseDate: Date,
  artist: { type: mongoose.Schema.Types.ObjectId, ref: 'Artist' },
});

const Album = mongoose.model('Album', albumSchema);

const songSchema = new mongoose.Schema({
  name: { type: String, required: true },
  imageURL: { type: String, required: true },
  songUrl: { type: String, required: true },
  album: { type: mongoose.Schema.Types.ObjectId, ref: 'Album' },
  artist: { type: mongoose.Schema.Types.ObjectId, ref: 'Artist' },
  language: String,
  category: String,
});

const Song = mongoose.model('Song', songSchema);

// User Authentication Route
const userRoute = require("./routes/auth");
app.use("/api/users/", userRoute);

// Artist Links
const artistsRoute = require("./routes/artists");
app.use("/api/artists/", artistsRoute);

// Album Links
const albumRoute = require("./routes/albums");
app.use("/api/albums/", albumRoute);

// Song Links
const songRoute = require("./routes/songs");
app.use("/api/songs/", songRoute);


app.listen(process.env.PORT || 4000, () => {
  console.log(`Server is running on port ${process.env.PORT || 4000}`);
});
