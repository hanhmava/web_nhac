
import React, { useEffect } from "react";
import { actionType } from "../Context/reducer";
import { useStateValue } from "../Context/StateProvider";
import { getAllAlbums, getAllArtist } from "../api";
import { filterByLanguage, filters } from "../utils/supportfunctions";
import FilterButtons from "./FilterButtons";
import { MdClearAll } from "react-icons/md";
import { motion } from "framer-motion";

const Filter = ({ setFilteredSongs }) => {
  const [{ filterTerm, artists, allAlbums, allSongs, artistFilter, languageFilter, albumFilter }, dispatch] = useStateValue();

  useEffect(() => {
    // Fetch artists and albums if not available
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
  }, [artists, allAlbums, dispatch]);

  useEffect(() => {
    // Apply default filter behavior if no filter term is set
    if (!filterTerm && allSongs) {
      setFilteredSongs(allSongs); // Show all songs by default
    }
  }, [filterTerm, allSongs, setFilteredSongs]);

  const updateFilter = (value) => {
    dispatch({
      type: actionType.SET_FILTER_TERM,
      filterTerm: value,
    });

    if (value && allSongs) {
      const filtered = allSongs.filter((song) => song.category === value);
      setFilteredSongs(filtered);
    }
  };

  const clearAllFilter = () => {
    // Clear all filters
    setFilteredSongs(allSongs); // Reset to all songs
    dispatch({ type: actionType.SET_ARTIST_FILTER, artistFilter: null });
    dispatch({ type: actionType.SET_LANGUAGE_FILTER, languageFilter: null });
    dispatch({ type: actionType.SET_ALBUM_FILTER, albumFilter: null });
    dispatch({ type: actionType.SET_FILTER_TERM, filterTerm: null });
  };

  return (
    <div className="text-cyan-600 w-full my-4 px-6 py-4 flex items-center justify-start md:justify-center gap-10">
      {/* Artist Filter */}
      <FilterButtons filterData={artists} flag={"Nghệ Sĩ"} />

      {/* Category Filter */}
      <div className="text-cyan-600 flex items-center gap-6 mx-4">
        {filters?.map((data) => (
          <p
            key={data.id}
            onClick={() => updateFilter(data.value)}
            className={`text-white text-base ${
              data.value === filterTerm ? "font-semibold" : "font-normal"
            } text-cyan-600 cursor-pointer hover:font-semibold transition-all duration-100 ease-in-out`}
          >
            {data.name}
          </p>
        ))}
      </div>

      {/* Albums Filter */}
      <FilterButtons filterData={allAlbums} flag={"Albums"} />

      {/* Language Filter */}
      <FilterButtons filterData={filterByLanguage} flag={"Ngôn Ngữ"} />

      {/* Clear All Filters */}
      <motion.i
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        whileTap={{ scale: 0.75 }}
        onClick={clearAllFilter}
      >
        <MdClearAll className="text-cyan-600 text-xl cursor-pointer" />
      </motion.i>
    </div>
  );
};

export default Filter;
