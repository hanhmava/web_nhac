import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useStateValue } from "../Context/StateProvider";
import { actionType } from "../Context/reducer";
import Swal from "sweetalert2"; // Import SweetAlert2

const Login = () => {
  const navigate = useNavigate();
  const [, dispatch] = useStateValue();

  // Form states
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState(""); // Confirm password state
  const [username, setUsername] = useState(""); // Username state (for registration)
  const [isLogin, setIsLogin] = useState(true); // Toggle between login/register
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false); // Loading state

  // Check if user is already logged in when the page reloads
  useEffect(() => {
    const auth = window.localStorage.getItem("auth");
    const token = window.localStorage.getItem("token");
    const user = window.localStorage.getItem("user");

    if (auth === "true" && token && user) {
      dispatch({
        type: actionType.SET_USER,
        user: JSON.parse(user), // Parse user object from localStorage
      });
      navigate("/home", { replace: true });
    }
  }, [dispatch, navigate]);

  // Handle user authentication (login)
  const handleAuth = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      setError("Email and Password are required");
      return;
    }

    setLoading(true); // Show loading indicator

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError("Please enter a valid email.");
      return;
    }

    // If it's a registration form, check for matching passwords
    if (!isLogin) {
      if (password !== confirmPassword) {
        setError("Passwords do not match.");
        return;
      }
      if (!username) {
        setError("Username is required.");
        return;
      }
    }

    try {
      const url = isLogin ? "http://localhost:4000/api/users/login" : "http://localhost:4000/api/users/register";
      const data = isLogin ? { email, password } : { email, password, name: username, role: "member" };

      const response = await axios.post(url, data);

      if (response.data.token) {
        // Lưu thông tin người dùng và token vào localStorage
        window.localStorage.setItem("auth", "true");
        window.localStorage.setItem("token", response.data.token);
        window.localStorage.setItem("user", JSON.stringify(response.data.user));

        dispatch({
          type: actionType.SET_USER,
          user: response.data.user, // Cập nhật user vào context
        });

        // Hiển thị thông báo thành công
        Swal.fire({
          icon: 'success',
          title: 'Đăng nhập thành công!',
          text: 'Chào mừng bạn trở lại.',
          timer: 1500,
          showConfirmButton: false
        });

        navigate("/home", { replace: true });
      }
    } catch (err) {
      setError(err.response ? err.response.data.message : "Authentication failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative w-screen h-screen bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500">
      <img
        src="https://cdn.sforum.vn/sforum/wp-content/uploads/2020/06/anh-bia-34.png"
        alt="Play music"
        className="w-full h-full object-cover opacity-40"
      />

      <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
        <div className="w-full md:w-96 p-8 bg-white rounded-lg shadow-lg backdrop-blur-lg">
          <img
            src="https://solution.com.vn/upload_images/images/2021/12/logo-am-nhac/logo-am-nhac-10.jpg"
            alt="Play music"
            className="w-24 h-20 object-cover opacity-90 mx-28"
          />
          <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">
           
          </h2>

          {error && <div className="text-red-500 text-sm text-center mb-4">{error}</div>}

          <form
            onSubmit={handleAuth}
            className="flex flex-col items-center gap-6"
          >
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="p-3 w-full rounded-lg border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
              required
            />

            {!isLogin && (
              <input
                type="text"
                placeholder="Tên Người Dùng"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="p-3 w-full rounded-lg border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
                required
              />
            )}

            <input
              type="password"
              placeholder="Mật Khẩu"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="p-3 w-full rounded-lg border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
              required
            />

            {!isLogin && (
              <input
                type="password"
                placeholder="Xác Nhận Mật khẩu"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="p-3 w-full rounded-lg border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
                required
              />
            )}

            <button
              type="submit"
              className="bg-blue-600 text-white px-6 py-3 rounded-lg w-full mt-4 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
              disabled={loading}
            >
              {loading ? "Loading..." : isLogin ? "Đăng Nhập" : "Đăng Ký"}
            </button>
          </form>

          <div className="mt-6 text-center">
            <button
              onClick={() => setIsLogin(!isLogin)}
              className="text-blue-500 hover:underline"
            >
              {isLogin ? "Tạo tài khoản mới" : "Đăng nhập tài khoản"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
