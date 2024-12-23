

import React, { useEffect, useState } from "react";
import { getAllSongs, getOneSong, getAllAlbums, getAllArtist } from "../api";
import { actionType } from "../Context/reducer";
import { useStateValue } from "../Context/StateProvider";
import { motion, AnimatePresence } from "framer-motion";
import Filter from "./Filter";
import Header from "./Header";
import SearchBar from "./SearchBar";
import AdBanner from "./AdBanner";
import { saveAs } from "file-saver";

const downloadSong = async (songId) => {
  if (!songId) {
    console.error("Song ID không hợp lệ");
    return;
  }

  try {
    const data = await getOneSong(songId);
    if (data && data.success && data.data) {
      const songData = data.data;
      const songUrl = songData.songUrl;

      if (songUrl) {
        const sanitizedUrl = songUrl.split("?")[0];
        if (
          sanitizedUrl.endsWith(".mp3") ||
          sanitizedUrl.endsWith(".wav") ||
          sanitizedUrl.endsWith(".ogg")
        ) {
          const response = await fetch(sanitizedUrl);
          if (!response.ok) throw new Error(`HTTP Error: ${response.status}`);
          const blob = await response.blob();
          const fileName = sanitizedUrl.split("/").pop();
          if (fileName) saveAs(blob, fileName);
          else console.error("Không thể xác định tên tệp từ URL");
        } else {
          console.error("URL không phải là định dạng nhạc hợp lệ");
        }
      } else {
        console.error("URL bài hát không hợp lệ");
      }
    } else {
      console.error("Không thể lấy thông tin bài hát từ API");
    }
  } catch (error) {
    console.error("Lỗi khi tải bài hát: ", error);
  }
};

const Home = () => {
  const [
    {
      searchTerm,
      allSongs,
      allAlbums,
      artists,
      artistFilter,
      filterTerm,
      albumFilter,
      languageFilter,
    },
    dispatch,
  ] = useStateValue();

  const [filteredSongs, setFilteredSongs] = useState([]);
  const [visibleArtists, setVisibleArtists] = useState([]);
  const [visibleAlbums, setVisibleAlbums] = useState([]);

  useEffect(() => {
    if (!allSongs || allSongs.length === 0) {
      getAllSongs()
        .then((data) => {
          if (data && data.data) {
            dispatch({
              type: actionType.SET_ALL_SONGS,
              allSongs: data.data,
            });
            setFilteredSongs(data.data);
          } else {
            console.error("No songs data returned from API");
          }
        })
        .catch((err) => {
          console.error("Error fetching songs: ", err);
        });
    } else {
      setFilteredSongs(allSongs);
    }

    if (!allAlbums) {
      getAllAlbums()
        .then((data) => {
          dispatch({ type: actionType.SET_ALL_ALBUMNS, allAlbums: data.data });
          setVisibleAlbums(data.data.slice(0, 5));
        })
        .catch((err) => console.error("Error fetching albums: ", err));
    }

    if (!artists) {
      getAllArtist()
        .then((data) => {
          dispatch({ type: actionType.SET_ARTISTS, artists: data.data });
          setVisibleArtists(data.data.slice(0, 5));
        })
        .catch((err) => console.error("Error fetching artists: ", err));
    }
  }, [allSongs, allAlbums, artists, dispatch]);

  useEffect(() => {
    if (allSongs) {
      let songs = [...allSongs];

      if (searchTerm && searchTerm.length > 0) {
        songs = songs.filter(
          (data) =>
            data.artist?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            data.language?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            data.name?.toLowerCase().includes(searchTerm.toLowerCase())
        );
      }

      setFilteredSongs(songs);
    }
  }, [allSongs, searchTerm, artistFilter, filterTerm, albumFilter, languageFilter]);

  useEffect(() => {
    const artistInterval = setInterval(() => {
      if (artists && artists.length > 0) {
        setVisibleArtists((prev) => {
          const currentIndex = artists.indexOf(prev[0]);
          const nextIndex = (currentIndex + 1) % artists.length;
          return artists.slice(nextIndex, nextIndex + 5);
        });
      }
    }, 5000);

    const albumInterval = setInterval(() => {
      if (allAlbums && allAlbums.length > 0) {
        setVisibleAlbums((prev) => {
          const currentIndex = allAlbums.indexOf(prev[0]);
          const nextIndex = (currentIndex + 1) % allAlbums.length;
          return allAlbums.slice(nextIndex, nextIndex + 5);
        });
      }
    }, 5000);

    return () => {
      clearInterval(artistInterval);
      clearInterval(albumInterval);
    };
  }, [artists, allAlbums]);

  return (
    <div
      className="w-full h-screen flex flex-row items-start justify-start relative overflow-y-auto bg-gradient-to-b from-blue-900 to-black"
    >
      {/* Sticky Sidebar */}
      <header className="w-64 h-screen fixed top-0 left-0 bg-gray-900 bg-opacity-90 shadow-md z-50 flex flex-col items-center py-4">
        <Header />
      </header>

      {/* Main Content */}
      <div className="ml-64 mt-10 w-full flex flex-col items-center">
        {/* Search Bar */}
        <div className="w-full max-w-4xl px-4 py-2">
          <SearchBar />
        </div>

        {/* Filters */}
        <div className="w-full max-w-6xl mt-4">
          <Filter setFilteredSongs={setFilteredSongs} />
        </div>

        {/* Quảng cáo dưới filter */}
        <AdBanner />

        {/* Searched Info */}
        {searchTerm?.length > 0 && (
          <p className="mt-4 text-base text-gray-300">
            Searched for: <span className="text-lg text-blue-400 font-semibold">{searchTerm}</span>
          </p>
        )}
        <div className="w-full max-w-6xl mt-6">
          <h2 className="text-2xl font-bold text-white mb-4">Top Artists</h2>
          <AnimatePresence>
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {visibleArtists.map((artist) => (
                <motion.div
                  key={artist._id}
                  className="bg-gray-800 rounded-lg shadow-lg p-4 flex flex-col items-center"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                >
                  <img
                    src={artist.imageURL}
                    alt={artist.name}
                    className="w-24 h-24 object-cover rounded-full mb-4"
                  />
                  <p className="text-lg text-white truncate">{artist.name}</p>
                </motion.div>
              ))}
            </div>
          </AnimatePresence>
        </div>

        {/* Songs Container */}
        <div className="w-full max-w-6xl mt-6 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 px-4">
          <HomeSongContainer musics={filteredSongs} downloadSong={downloadSong} />
        </div>

        {/* Artists Section */}
        

        {/* Albums Section */}
        <div className="w-full max-w-6xl mt-6">
          <h2 className="text-2xl font-bold text-white mb-4">Top Albums</h2>
          <AnimatePresence>
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {visibleAlbums.map((album) => (
                <motion.div
                  key={album._id}
                  className="bg-gray-800 rounded-lg shadow-lg p-4 flex flex-col items-center"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                >
                  <img
                    src={album.imageURL}
                    alt={album.name}
                    className="w-full h-40 object-cover rounded-md mb-4"
                  />
                  <p className="text-lg text-white truncate">{album.name}</p>
                </motion.div>
              ))}
            </div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

const HomeSongContainer = ({ musics, downloadSong }) => {
  const [{ isSongPlaying, song }, dispatch] = useStateValue();

  const addSongToContext = (index) => {
    if (!isSongPlaying) {
      dispatch({
        type: actionType.SET_SONG_PLAYING,
        isSongPlaying: true,
      });
    }
    if (song !== index) {
      dispatch({
        type: actionType.SET_SONG,
        song: index,
      });
    }
  };

  return (
    <>
      {Array.isArray(musics) && musics.length > 0 ? (
        musics.map((data, index) => {
          return (
            <motion.div
              key={data._id}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="relative bg-gray-900 bg-opacity-90 shadow-lg rounded-lg overflow-hidden cursor-pointer hover:shadow-2xl transition duration-300"
              onClick={() => addSongToContext(index)}
            >
              <div className="relative h-48 w-full overflow-hidden">
                <img
                  src={data.imageURL}
                  alt="Song"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-4">
                <p className="text-lg font-semibold text-white truncate">
                  {data.name}
                </p>
                <p className="text-sm text-gray-400 mt-1">{data.artist}</p>

                {/* Download button */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    if (data._id) {
                      downloadSong(data._id);
                    } else {
                      console.error("Không có ID bài hát");
                    }
                  }}
                  className="mt-2 text-sm text-blue-500 hover:underline"
                >
                  Tải về
                </button>
              </div>
            </motion.div>
          );
        })
      ) : (
        <p className="text-gray-400">Không có bài hát nào</p>
      )}
    </>
  );
};

export default Home;
