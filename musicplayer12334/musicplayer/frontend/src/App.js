// import React,{useState,useEffect} from "react";
// import {Route,Routes,useNavigate} from 'react-router-dom';
// import "./App.css";
// import {Dashboard,
//     Home,
//     Loader,
//     Login,
//     MusicPlayer,
//     UserProfile} from './components';
// import { app } from "./config/firebase.config";
// import { getAuth } from "firebase/auth";
// import { validateUser,getAllSongs } from "./api";
// import { useStateValue } from "./Context/StateProvider";
// import { actionType } from "./Context/reducer";
// import { motion, AnimatePresence } from "framer-motion";
// const App = () => {
//     const firebaseAuth = getAuth(app);
//     const navigate = useNavigate();
//     const [{ user, allSongs, song, isSongPlaying, miniPlayer }, dispatch] =
//     useStateValue();
//   const [isLoading, setIsLoading] = useState(false);
    

//     const [auth, setAuth] = useState(false || window.localStorage.getItem("auth") === "true");
//     const [token , setToken] = useState('');
//     useEffect(() => {
//       firebaseAuth.onAuthStateChanged((userCred) =>{
//         if(userCred){
//             userCred.getIdToken().then((token) =>{
//                 console.log(token);
//                 setToken(token);
//                 validateUser(token).then((data) => {
//                     dispatch({
//                         type: actionType.SET_USER,
//                         user: data,
//                       });
//                 })
//             })
//             setIsLoading(false);
//         }
//         else{
//             setAuth(false);
//             dispatch({
//                 type: actionType.SET_USER,
//                 user: null,
//               });
//               setIsLoading(false);
//             window.localStorage.setItem("auth","false");
//             navigate("/login");
//         }
//       }) 
//     }, [])

//     useEffect(() => {
//         if (!allSongs && user) {
//           getAllSongs().then((data) => {
//             dispatch({
//               type: actionType.SET_ALL_SONGS,
//               allSongs: data.data,
//             });
//           });
//         }
//       }, []);
    
//     return(
//         <AnimatePresence>
//         <div className="h-auto flex items-center justify-center min-w-[680px]">
//           {isLoading ||
//             (!user && (
//               <div className="fixed inset-0 bg-loaderOverlay backdrop-blur-sm ">
//                 <Loader />
//               </div>
//             ))}
//           <Routes>
//             <Route path="/login" element={<Login setAuth={setAuth} />} />
//             <Route path="/*" element={<Home />} />
//             <Route path="/dashboard/*" element={<Dashboard />} />
//             <Route path="/userProfile" element={<UserProfile />} />
//           </Routes>
  
//           {isSongPlaying && (
//             <motion.div
//               initial={{ opacity: 0, y: 50 }}
//               animate={{ opacity: 1, y: 0 }}
//               exit={{ opacity: 0, y: 50 }}
//               className={`fixed min-w-[700px] h-26  inset-x-0 bottom-0  bg-cardOverlay drop-shadow-2xl backdrop-blur-md flex items-center justify-center`}
//             >
//               <MusicPlayer />
//             </motion.div>
//           )}
//         </div>
//       </AnimatePresence>
//     );
// };

// export default App





// import React, { useState, useEffect } from "react";
// import { Route, Routes, useNavigate } from 'react-router-dom';
// import "./App.css";
// import { Dashboard, Home, Loader, Login, MusicPlayer, UserProfile } from './components';
// import { validateUser, getAllSongs } from './api'; // Import API functions
// import { useStateValue } from './Context/StateProvider';
// import { actionType } from './Context/reducer';
// import { motion, AnimatePresence } from 'framer-motion';

// const App = () => {
//   const navigate = useNavigate();
//   const [{ user, allSongs, song, isSongPlaying, miniPlayer }, dispatch] = useStateValue();
//   const [isLoading, setIsLoading] = useState(true);
//   const [auth, setAuth] = useState(window.localStorage.getItem("auth") === "true");
//   const [token, setToken] = useState('');

//   // Lấy token từ localStorage hoặc xác thực lại
//   useEffect(() => {
//     const storedToken = window.localStorage.getItem('token');
//     if (storedToken) {
//       setToken(storedToken);

//       // Xác thực người dùng với token
//       validateUser(storedToken)
//         .then((data) => {
//           dispatch({
//             type: actionType.SET_USER,
//             user: data,
//           });
//           setIsLoading(false);
//         })
//         .catch((error) => {
//           console.error('User validation failed:', error);
//           window.localStorage.setItem("auth", "false");
//           setIsLoading(false);
//           navigate("/login");
//         });
//     } else {
//       setIsLoading(false);
//       setAuth(false);
//       window.localStorage.setItem("auth", "false");
//       navigate("/login");
//     }
//   }, []);

//   // Lấy tất cả bài hát từ backend nếu người dùng đã đăng nhập
//   useEffect(() => {
//     if (!allSongs && user) {
//       getAllSongs()
//         .then((data) => {
//           dispatch({
//             type: actionType.SET_ALL_SONGS,
//             allSongs: data,
//           });
//         })
//         .catch((error) => {
//           console.error('Error fetching songs:', error);
//         });
//     }
//   }, [user]);

//   // Đảm bảo người dùng đã đăng nhập trước khi vào các trang khác
//   if (isLoading) {
//     return (
//       <div className="fixed inset-0 bg-loaderOverlay backdrop-blur-sm">
//         <Loader />
//       </div>
//     );
//   }

//   return (
//     <AnimatePresence>
//       <div className="h-auto flex items-center justify-center min-w-[680px]">
//         <Routes>
//           <Route path="/login" element={<Login setAuth={setAuth} />} />
//           <Route path="/*" element={<Home />} />
//           <Route path="/dashboard/*" element={<Dashboard />} />
//           <Route path="/userProfile" element={<UserProfile />} />
//         </Routes>

//         {isSongPlaying && (
//           <motion.div
//             initial={{ opacity: 0, y: 50 }}
//             animate={{ opacity: 1, y: 0 }}
//             exit={{ opacity: 0, y: 50 }}
//             className="fixed min-w-[700px] h-26 inset-x-0 bottom-0 bg-cardOverlay drop-shadow-2xl backdrop-blur-md flex items-center justify-center"
//           >
//             <MusicPlayer />
//           </motion.div>
//         )}
//       </div>
//     </AnimatePresence>
//   );
// };

// export default App;


// import React, { useState, useEffect } from "react";
// import { Route, Routes, useNavigate } from "react-router-dom";
// import "./App.css";
// import { Dashboard, Home, Loader, Login, MusicPlayer, UserProfile } from "./components";
// import { app } from "./config/firebase.config";
// import { getAuth } from "firebase/auth";
// import { validateUser, getAllSongs } from "./api";
// import { useStateValue } from "./Context/StateProvider";
// import { actionType } from "./Context/reducer";
// import { motion, AnimatePresence } from "framer-motion";

// const App = () => {
//   const firebaseAuth = getAuth(app);
//   const navigate = useNavigate();
//   const [{ user, allSongs, song, isSongPlaying, miniPlayer }, dispatch] = useStateValue();
//   const [isLoading, setIsLoading] = useState(true); // Start with loading
//   const [auth, setAuth] = useState(false); // Removed redundant initial value

//   // Authentication State with Firebase Auth
//   useEffect(() => {
//     const unsubscribe = firebaseAuth.onAuthStateChanged((userCred) => {
//       if (userCred) {
//         userCred.getIdToken().then((token) => {
//           setAuth(true);
//           window.localStorage.setItem("auth", "true"); // Set auth as true
//           validateUser(token).then((data) => {
//             dispatch({
//               type: actionType.SET_USER,
//               user: data,
//             });
//             setIsLoading(false); // Authentication complete, stop loading
//           }).catch((err) => {
//             console.error("User validation failed:", err);
//             setIsLoading(false);
//             navigate("/login"); // If validation fails, redirect to login
//           });
//         });
//       } else {
//         setAuth(false);
//         window.localStorage.setItem("auth", "false"); // Set auth as false if no user
//         dispatch({
//           type: actionType.SET_USER,
//           user: null,
//         });
//         setIsLoading(false);
//         navigate("/login");
//       }
//     });

//     return () => unsubscribe(); // Clean up the listener when the component unmounts
//   }, []);

//   // Fetch all songs if not already fetched and user exists
//   useEffect(() => {
//     if (user && !allSongs) {
//       getAllSongs()
//         .then((data) => {
//           dispatch({
//             type: actionType.SET_ALL_SONGS,
//             allSongs: data.data, // Adjusted based on the data structure
//           });
//         })
//         .catch((error) => {
//           console.error("Error fetching songs:", error);
//         });
//     }
//   }, [user, allSongs, dispatch]);

//   return (
//     <AnimatePresence>
//       <div className="h-auto flex items-center justify-center min-w-[680px]">
//         {isLoading && (
//           <div className="fixed inset-0 bg-loaderOverlay backdrop-blur-sm">
//             <Loader />
//           </div>
//         )}

//         <Routes>
//           <Route path="/login" element={<Login setAuth={setAuth} />} />
//           <Route path="/*" element={<Home />} />
//           <Route path="/dashboard/*" element={<Dashboard />} />
//           <Route path="/userProfile" element={<UserProfile />} />
//         </Routes>

//         {isSongPlaying && (
//           <motion.div
//             initial={{ opacity: 0, y: 50 }}
//             animate={{ opacity: 1, y: 0 }}
//             exit={{ opacity: 0, y: 50 }}
//             className={`fixed min-w-[700px] h-26 inset-x-0 bottom-0 bg-cardOverlay drop-shadow-2xl backdrop-blur-md flex items-center justify-center`}
//           >
//             <MusicPlayer />
//           </motion.div>
//         )}
//       </div>
//     </AnimatePresence>
//   );
// };

// export default App;


import React, { useState, useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import "./App.css";
import {
  Dashboard,
  Home,
  Loader,
  Login,
  MusicPlayer,
  UserProfile,
  Favourites,
} from "./components";
import { app } from "./config/firebase.config";
import { getAuth } from "firebase/auth";
import { validateUser, getAllSongs } from "./api";
import { useStateValue } from "./Context/StateProvider";
import { actionType } from "./Context/reducer";
import { motion, AnimatePresence } from "framer-motion";

const App = () => {
  const firebaseAuth = getAuth(app);
  const navigate = useNavigate();
  const [{ user, allSongs, song, isSongPlaying }, dispatch] = useStateValue();
  const [isLoading, setIsLoading] = useState(false);

  const [auth, setAuth] = useState(false || window.localStorage.getItem("auth") === "true");
  const [token, setToken] = useState("");

  useEffect(() => {
    firebaseAuth.onAuthStateChanged((userCred) => {
      if (userCred) {
        userCred.getIdToken().then((token) => {
          console.log(token);
          setToken(token);
          validateUser(token).then((data) => {
            dispatch({
              type: actionType.SET_USER,
              user: data,
            });
          });
        });
        setIsLoading(false);
      } else {
        setAuth(false);
        dispatch({
          type: actionType.SET_USER,
          user: null,
        });
        setIsLoading(false);
        window.localStorage.setItem("auth", "false");
        navigate("/login");
      }
    });
  }, []);

  useEffect(() => {
    if (!allSongs && user) {
      getAllSongs().then((data) => {
        dispatch({
          type: actionType.SET_ALL_SONGS,
          allSongs: data.data,
        });
      });
    }
  }, []);

  return (
    <AnimatePresence>
      <div className="h-auto flex items-center justify-center min-w-[680px]">
        {isLoading || (!user && (
          <div className="fixed inset-0 bg-loaderOverlay backdrop-blur-sm ">
            <Loader />
          </div>
        ))}
        <Routes>
          <Route path="/login" element={<Login setAuth={setAuth} />} />
          <Route path="/*" element={<Home />} />
          <Route path="/dashboard/*" element={<Dashboard />} />
          <Route path="/userProfile" element={<UserProfile />} />
          <Route path="/favourites" element={<Favourites />} />
        </Routes>

        {isSongPlaying && ( 
            <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className={`fixed min-w-[700px] h-26 inset-x-0 bottom-0 bg-cardOverlay drop-shadow-2xl backdrop-blur-md flex items-center justify-center`}
          >
           <MusicPlayer />
           
          </motion.div>
        )}
      </div>
    </AnimatePresence>
  );
};

export default App;

