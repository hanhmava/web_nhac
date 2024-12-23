
import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { isActiveStyles, isNotActiveStyles } from "../utils/styles";
import { motion } from "framer-motion";
import { useStateValue } from "../Context/StateProvider";  // Import useStateValue để lấy dữ liệu từ context

const Header = () => {
  const navigate = useNavigate();
  const [{ user }, dispatch] = useStateValue();  // Lấy dữ liệu user từ reducer (context)

  const [isMenu, setIsMenu] = useState(false);

  // In ra user để kiểm tra
  console.log("User:", user);  // Kiểm tra dữ liệu user từ context

  // Kiểm tra role của user và gán giá trị mặc định là "member" nếu không có role
  const userRole = user?.role ?? "member"; // Nếu role không có, mặc định là "member"
  console.log("User Role:", userRole);  // Kiểm tra giá trị của userRole

  const userName = user?.name || "Guest";  // Trực tiếp lấy user từ context, nếu không có tên, mặc định là "Guest"
  const userImage = user?.image || "https://tse1.mm.bing.net/th?id=OIP.bW-lmEx0rsWY_i9gwtsuegHaHa&pid=Api&P=0&h=180";  // Placeholder image if no image exists

  // Logout handler
  const logout = () => {
    window.localStorage.removeItem("auth");
    window.localStorage.removeItem("token");
    dispatch({
      type: "SET_USER",
      user: null,  // Reset user trong context
    });
    navigate("/login", { replace: true });
  };

  return (
    <header className="flex flex-col w-64 h-full bg-gray-900 text-white p-4 fixed top-0 left-0 shadow-md z-30">
      <NavLink to={"/"} className="flex items-center mb-8">
        <img
          src="https://solution.com.vn/upload_images/images/2021/12/logo-am-nhac/logo-am-nhac-10.jpg"
          className="w-16 rounded-full"
          alt="Music"
        />
        <span className="ml-4 text-2xl font-semibold">MusicApp</span>
      </NavLink>

      <ul className="flex flex-col gap-4">
        <li>
          <NavLink to={"/"} className={({ isActive }) => isActive ? isActiveStyles : isNotActiveStyles}>
            Trang Chủ
          </NavLink>
        </li>
        <li>
          <NavLink to={"/musics"} className={({ isActive }) => isActive ? isActiveStyles : isNotActiveStyles}>
            Nhạc
          </NavLink>
        </li>
      </ul>

      <div
        className="flex flex-col items-center mt-auto cursor-pointer gap-2 relative"
        onClick={() => setIsMenu(!isMenu)}
      >
        <img
          className="w-16 h-16 object-cover rounded-full shadow-lg"
          src={userImage}
          alt={userName}
          referrerPolicy="no-referrer"
        />
        <p className="text-lg font-semibold mt-2">{userName}</p>

        {isMenu && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className="absolute z-40 bottom-24 w-64 p-4 bg-gray-800 shadow-lg rounded-lg backdrop-blur-sm flex flex-col"
          >
            {/* <NavLink to={"/userProfile"} className="text-base py-2 hover:font-semibold">
              Profile
            </NavLink>
            <NavLink to={"/favourites"} className="text-base py-2 hover:font-semibold">
              My Favourites
            </NavLink> */}
            {userRole === "admin" && (
              <>
                <hr className="my-2 border-gray-600" />
                <NavLink to={"/dashboard/home"} className="text-base py-2 hover:font-semibold">
                  Hệ thống
                </NavLink>
              </>
            )}
            <hr className="my-2 border-gray-600" />
            <button
              className="text-base py-2 text-left w-full hover:font-semibold"
              onClick={logout}
            >
              Đăng Xuất
            </button>
          </motion.div>
        )}
      </div>
    </header>
  );
};

export default Header;
