
import axios from "axios";

const baseURL = "http://localhost:4000/";

export const validateUser = async (token) => {
    try {
      const res = await axios.get(`${baseURL}api/users/login`, {
        headers: {
          Authorization: "Bearer " + token,
        },
      });
      return res.data;
    } catch (error) {
      return null;
    }
  };

  export const getAllArtist = async () => {
    try {
      const res = await axios.get(`${baseURL}api/artists/getAll`);
      return res.data;
    } catch (error) {
      return null;
    }
  };
  

  export const getAllUsers = async () => {
    const token = window.localStorage.getItem("token");  // Hoặc lấy từ nơi khác nếu bạn lưu token ở nơi khác
    try {
      const res = await axios.get(`${baseURL}api/users/getUsers`, {
        headers: {
          Authorization: `Bearer ${token}`,  // Gửi token vào header
        }
      });
      return res.data;
    } catch (error) {
      console.error("Error fetching users:", error.response || error.message);
      return null;
    }
  };
  
  
  

  export const removeUser = async (userId) => {
    try {
      const token = window.localStorage.getItem("token");  // Lấy token từ localStorage
      const res = await axios.delete(`${baseURL}api/users/delete/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,  // Gửi token trong header Authorization
        },
      });
      return res.data;  // Trả về dữ liệu từ server (nếu có)
    } catch (error) {
      console.error("Error removing user:", error.response || error.message);  // In lỗi chi tiết nếu có
      return null;  // Trả về null nếu có lỗi
    }
  };
  
  
  export const getAllSongs = async () => {
    try {
      const res = await axios.get(`${baseURL}api/songs/getAll`);
      return res.data;
    } catch (error) {
      return null;
    }
  };
  
  export const getAllAlbums = async () => {
    try {
      const res = await axios.get(`${baseURL}api/albums/getAll`);
      return res.data;
    } catch (error) {
      return null;
    }
  };
  

  //   try {
  //     const res = axios.put(`${baseURL}api/users/updateRole/${userId}`, {
  //       data: { role: role },
  //     });
  //     return res;
  //   } catch (error) {
  //     return null;
  //   }
  // };
  export const changingUserRole = async (userId, role) => {
    try {
      const res = await axios.put(
        `${baseURL}api/users/updateRole/${userId}`,
        { role: role },  // Directly send the role in the request body
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,  // Ensure you include the token for authentication
          },
        }
      );
      return res.data;  // Return the response data
    } catch (error) {
      console.error("Error changing user role:", error.response ? error.response.data : error.message);
      return null;
    }
  };
  
  export const saveNewArtist = async (data) => {
    try {
       const res = await axios.post(`${baseURL}api/artists/save`, data);
       return res.data.artist;
    } catch (error) {
       if (error.response) {
          // Lỗi do server phản hồi (status code >= 400)
          console.error('Error Response:', error.response.data);
          console.error('Error Status:', error.response.status);
       } else if (error.request) {
          // Lỗi do không nhận được phản hồi
          console.error('Error Request:', error.request);
       } else {
          // Lỗi khác
          console.error('Error Message:', error.message);
       }
       return null;
    }
 };
 
  
  export const saveNewAlbum = async (data) => {
    try {
      const res = axios.post(`${baseURL}api/albums/save`, { ...data });
      return (await res).data.album;
    } catch (error) {
      return null;
    }
  };
  
  export const saveNewSong = async (data) => {
    try {
      const res = axios.post(`${baseURL}api/songs/save`, { ...data });
      return (await res).data.song;
    } catch (error) {
      return null;
    }
  };
  
  export const deleteSongById = async (id) => {
    try {
      const res = axios.delete(`${baseURL}api/songs/delete/${id}`);
      return res;
    } catch (error) {
      return null;
    }
  };
  export const getOneSong = async (songId) => {
  try {
    const res = await axios.get(`${baseURL}api/songs/getOne/${songId}`);
    return res.data; // Return song data or success message
  } catch (error) {
    console.error("Error fetching song:", error.response || error.message);
    return null;
  }
};
export const deleteAlbumsId  = async (id) => {
  try {
    const res = axios.delete(`${baseURL}api/albums/delete/${id}`);
    return res;
  } catch (error) {
    return null;
  }
};
export const deleteArtistId  = async (id) => {
  try {
    const res = axios.delete(`${baseURL}api/artists/delete/${id}`);
    return res;
  } catch (error) {
    return null;
  }
};
export const addSongToFavourites = async (userId,songId) => {
  try {
    const response = await axios.put(`${baseURL}api/users/favourites/${userId}`, { songId });
    return response.data;
  } catch (error) {
    console.error("Error adding song to favourites:", error);
    throw error;
  }
};

export const removeSongFromFavourites = async (songId) => {
  try {
    const userToken = localStorage.getItem("userToken"); // Get the user token from localStorage
    if (!userToken) {
      throw new Error("User not authenticated");
    }

    // Get the userId from the token or user context
    const userId = localStorage.getItem("userId"); // Assuming the userId is also saved in localStorage
    if (!userId) {
      throw new Error("User ID not found");
    }

    // Make the PUT request to remove the song from the user's favorites
    const response = await axios.put(
      `${baseURL}api/users/removeFavourites/${userId}`, // Use correct API endpoint
      { songId }, // Send the songId in the body of the request
      {
        headers: {
          Authorization: `Bearer ${userToken}`, // Pass the JWT in the Authorization header
        },
      }
    );

    return response.data; // Return the response data (success or error message)
  } catch (error) {
    console.error("Error removing song from favourites", error);
    throw error; // Throw the error to be handled at the calling function
  }
};