
import React from "react";
import { IoHome, IoMusicalNotes, IoPeople, IoAlbums } from "react-icons/io5";
import { MdPerson } from "react-icons/md";
import { NavLink, Route, Routes } from "react-router-dom";
import { DashboardNewSong } from ".";
import DashboardAlbum from "./DashboardAlbum";
import DashboardArtist from "./DashboardArtist";
import DashBoardHome from "./DashBoardHome";
import DashboardSongs from "./DashboardSongs";
import DashboardUser from "./DashboardUser";

const isActiveStyles =
  "flex items-center gap-3 px-4 py-2 text-sm font-semibold text-white bg-blue-500 rounded-md shadow-md";
const isNotActiveStyles =
  "flex items-center gap-3 px-4 py-2 text-sm font-semibold text-gray-600 hover:text-gray-900 hover:bg-gray-200 rounded-md";

const Dashboard = () => {
  return (
    <div className="w-full h-screen flex bg-gray-100">
      {/* Sidebar */}
      <div className="w-1/5 h-full bg-white shadow-md flex flex-col items-start p-6">
        <h1 className="text-2xl font-bold text-blue-600 mb-6">Dashboard</h1>

        <nav className="flex flex-col gap-4 w-full">
          <NavLink
            to={"/home"}
            className={({ isActive }) =>
              isActive ? isActiveStyles : isNotActiveStyles
            }
          >
            <IoHome className="text-xl" /> Trang Chủ
          </NavLink>
          <NavLink
            to={"/dashboard/user"}
            className={({ isActive }) =>
              isActive ? isActiveStyles : isNotActiveStyles
            }
          >
            <IoPeople className="text-xl" /> Tài khoản
          </NavLink>
          <NavLink
            to={"/dashboard/songs"}
            className={({ isActive }) =>
              isActive ? isActiveStyles : isNotActiveStyles
            }
          >
            <IoMusicalNotes className="text-xl" /> Bài Hát
          </NavLink>
          <NavLink
            to={"/dashboard/artist"}
            className={({ isActive }) =>
              isActive ? isActiveStyles : isNotActiveStyles
            }
          >
            <MdPerson className="text-xl" /> Nghệ sĩ
          </NavLink>
          <NavLink
            to={"/dashboard/albums"}
            className={({ isActive }) =>
              isActive ? isActiveStyles : isNotActiveStyles
            }
          >
            <IoAlbums className="text-xl" /> Albums
          </NavLink>
        </nav>
      </div>

      {/* Content */}
      <div className="w-4/5 h-full flex flex-col">
        {/* Header */}
        <header className="w-full bg-white shadow-md px-6 py-4 flex items-center justify-between">
          <h2 className="text-xl font-semibold text-gray-800">Dashboard</h2>
          
        </header>

        {/* Main Content */}
        <main className="w-full h-full p-6 overflow-y-auto">
          <Routes>
            <Route path="/home" element={<DashBoardHome />} />
            <Route path="/user" element={<DashboardUser />} />
            <Route path="/songs" element={<DashboardSongs />} />
            <Route path="/artist" element={<DashboardArtist />} />
            <Route path="/albums" element={<DashboardAlbum />} />
            <Route path="/newSong" element={<DashboardNewSong />} />
          </Routes>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
