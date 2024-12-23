import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useStateValue } from "../Context/StateProvider";
import { Link } from "react-router-dom";
import { IoLogoInstagram, IoLogoTwitter } from "react-icons/io5";
import { MdDelete } from "react-icons/md";
import { getAllArtist, deleteArtistId } from "../api";
import { actionType } from "../Context/reducer";
import AlertSuccess from "./AlertSuccess";
import AlertError from "./AlertError";

const DashboardArtist = () => {
  const [{ artists }, dispatch] = useStateValue();

  // Fetch artist data when the component mounts
  useEffect(() => {
    if (!artists) {
      getAllArtist().then((data) => {
        dispatch({ type: actionType.SET_ARTISTS, artists: data.data });
      }).catch((error) => {
        console.error("Error fetching artists:", error);
      });
    }
  }, [artists, dispatch]);

  return (
    <div className="w-full p-4 flex items-center justify-center flex-col">
      <div className="relative w-full gap-3 my-4 p-4 py-12 border border-gray-300 rounded-md flex flex-wrap justify-evenly">
        {artists && artists.length > 0 ? (
          artists.map((data, index) => (
            <ArtistCard key={data._id} data={data} index={index} />
          ))
        ) : (
          <p>No artists available</p>
        )}
      </div>
    </div>
  );
};

export const ArtistCard = ({ data, index }) => {
  const [{}, dispatch] = useStateValue();
  const [isDelete, setIsDelete] = useState(false);
  const [alert, setAlert] = useState(null);
  const [alertMsg, setAlertMsg] = useState("");

  // Delete artist and update the state
  const handleDelete = (id) => {
    deleteArtistId(id).then((res) => {
      if (res.data.success) {
        setAlert("success");
        setAlertMsg(res.data.msg);

      
        getAllArtist().then((data) => {
          dispatch({ type: actionType.SET_ARTISTS, artists: data.data });
        }).catch((error) => {
          console.error("Error fetching artists:", error);
        });
      } else {
        setAlert("error");
        setAlertMsg(res.data.msg);
      }

   
      setTimeout(() => {
        setAlert(null);
        setAlertMsg("");
      }, 4000);
    }).catch((error) => {
      setAlert("error");
      setAlertMsg("Something went wrong, please try again.");
      setTimeout(() => {
        setAlert(null);
        setAlertMsg("");
      }, 4000);
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, translateX: -50 }}
      animate={{ opacity: 1, translateX: 0 }}
      transition={{ duration: 0.3, delay: index * 0.1 }}
      className="relative w-44 min-w-180 px-2 py-4 gap-3 cursor-pointer hover:shadow-xl hover:bg-card bg-gray-100 shadow-md rounded-lg flex flex-col items-center"
    >
      <img
        src={data?.imageURL}
        className="w-full h-40 object-cover rounded-md"
        alt={data?.name}
      />

      <p className="text-base text-textColor">{data?.name}</p>

      <div className="flex items-center gap-4">
        {data.instagram && (
          <a href={data.instagram} target="_blank" rel="noopener noreferrer">
            <motion.i whileTap={{ scale: 0.75 }}>
              <IoLogoInstagram className="text-gray-500 hover:text-headingColor text-xl" />
            </motion.i>
          </a>
        )}
        {data.twitter && (
          <a href={data.twitter} target="_blank" rel="noopener noreferrer">
            <motion.i whileTap={{ scale: 0.75 }}>
              <IoLogoTwitter className="text-gray-500 hover:text-headingColor text-xl" />
            </motion.i>
          </a>
        )}
      </div>

      <motion.i
        className="absolute bottom-2 right-2"
        whileTap={{ scale: 0.75 }}
        onClick={() => setIsDelete(true)}
      >
        <MdDelete className="text-gray-400 hover:text-red-400 text-xl cursor-pointer" />
      </motion.i>

      {/* Delete Confirmation Modal */}
      {isDelete && (
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.5 }}
          className="absolute inset-0 p-2 bg-darkOverlay backdrop-blur-md flex flex-col items-center justify-center gap-4"
        >
          <p className="text-gray-100 text-base text-center">
            Bạn chắc chắn muốn xóa nghệ sĩ?
          </p>
          <div className="flex items-center w-full justify-center gap-3">
            <div
              className="bg-red-300 px-3 rounded-md cursor-pointer"
              onClick={() => handleDelete(data._id)}
            >
              <p className="text-headingColor text-sm">Yes</p>
            </div>
            <div
              className="bg-green-300 px-3 rounded-md cursor-pointer"
              onClick={() => setIsDelete(false)}
            >
              <p className="text-headingColor text-sm">No</p>
            </div>
          </div>
        </motion.div>
      )}

      {/* Display Alert if necessary */}
      {alert === "success" && <AlertSuccess msg={alertMsg} />}
      {alert === "error" && <AlertError msg={alertMsg} />}
    </motion.div>
  );
};

export default DashboardArtist;
