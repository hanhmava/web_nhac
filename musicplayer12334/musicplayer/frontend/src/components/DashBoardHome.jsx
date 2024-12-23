

import React, { useEffect } from "react";
import { getAllAlbums, getAllArtist, getAllSongs, getAllUsers } from "../api";
import { actionType } from "../Context/reducer";
import { useStateValue } from "../Context/StateProvider";

// Import recharts components
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

const DashBoardHome = () => {
  const [{ allUsers, allSongs, artists, allAlbums }, dispatch] = useStateValue();

  useEffect(() => {
    if (!allUsers) {
      getAllUsers().then((data) => {
        dispatch({
          type: actionType.SET_ALL_USERS,
          allUsers: data.data,
        });
      });
    }

    if (!allSongs) {
      getAllSongs().then((data) => {
        dispatch({
          type: actionType.SET_ALL_SONGS,
          allSongs: data.data,
        });
      });
    }

    if (!artists) {
      getAllArtist().then((data) => {
        dispatch({ type: actionType.SET_ARTISTS, artists: data.data });
      });
    }

    if (!allAlbums) {
      getAllAlbums().then((data) => {
        dispatch({ type: actionType.SET_ALL_ALBUMNS, allAlbums: data.data });
      });
    }
  }, []);

  // Prepare data for the chart
  const data = [
    {
      name: "Users",
      count: allUsers?.length || 0,
    },
    {
      name: "Songs",
      count: allSongs?.length || 0,
    },
    {
      name: "Artists",
      count: artists?.length || 0,
    },
    {
      name: "Albums",
      count: allAlbums?.length || 0,
    },
  ];

  return (
    <div className="w-full p-6 flex flex-col items-center justify-center">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">Thông Kê Dữ Liệu</h2>
      <div className="w-full h-96">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="count" fill="#8884d8" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default DashBoardHome;
