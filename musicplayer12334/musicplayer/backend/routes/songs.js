
const song = require("../models/song");
const express = require("express");
const router = express.Router();

// Get all songs
router.get("/getAll", async (req, res) => {
  try {
    const songs = await song.find();
    console.log("Songs:", songs); // Thêm log ở đây
    res.status(200).send({ success: true, data: songs });
  } catch (error) {
    console.error("Error fetching songs:", error.message); // Thêm log cho lỗi
    res.status(500).send({ success: false, msg: "Server Error", error: error.message });
  }
});


// Get a single song by ID
router.get("/getOne/:getOne", async (req, res) => {
  const filter = { _id: req.params.getOne };

  try {
    const songData = await song.findOne(filter);
    if (songData) {
      res.status(200).send({ success: true, data: songData });
    } else {
      res.status(200).send({ success: true, msg: "No Data Found" });
    }
  } catch (error) {
    res.status(500).send({ success: false, msg: "Server Error", error: error.message });
  }
});

// Save a new song
router.post("/save", async (req, res) => {
  const { name, imageURL, songUrl, album, artist, language, category } = req.body;

  const newSong = new song({
    name,
    imageURL,
    songUrl,
    album,
    artist,
    language,
    category,
  });

  try {
    const savedSong = await newSong.save();
    res.status(201).send({ success: true, song: savedSong });
  } catch (error) {
    res.status(400).send({ success: false, msg: "Error saving song", error: error.message });
  }
});

// Update a song by ID
router.put("/update/:updateId", async (req, res) => {
  const filter = { _id: req.params.updateId };
  const options = {
    upsert: true,
    new: true,  // Return the modified document
  };

  try {
    const updatedSong = await song.findOneAndUpdate(
      filter,
      {
        name: req.body.name,
        imageURL: req.body.imageURL,
        songUrl: req.body.songUrl,
        album: req.body.album,
        artist: req.body.artist,
        language: req.body.language,
        category: req.body.category,
      },
      options
    );
    res.status(200).send({ success: true, artist: updatedSong });
  } catch (error) {
    res.status(400).send({ success: false, msg: "Error updating song", error: error.message });
  }
});

// Delete a song by ID
router.delete("/delete/:deleteId", async (req, res) => {
  const filter = { _id: req.params.deleteId };

  try {
    const result = await song.deleteOne(filter);
    if (result.deletedCount === 1) {
      res.status(200).send({ success: true, msg: "Data Deleted" });
    } else {
      res.status(404).send({ success: false, msg: "Song not found" });
    }
  } catch (error) {
    res.status(500).send({ success: false, msg: "Error deleting song", error: error.message });
  }
});

// Get favourite songs (assuming you want to get songs based on songIds passed in query)
router.get("/getFavouritesSongs", async (req, res) => {
  const { songIds } = req.query;  // Expecting a query string like ?songIds=1,2,3

  if (!songIds) {
    return res.status(400).send({ success: false, msg: "No song IDs provided" });
  }

  const songIdArray = songIds.split(",");  // Convert string to array of song IDs

  try {
    const favourites = await song.find({ '_id': { $in: songIdArray } });

    if (favourites.length > 0) {
      res.status(200).send({ success: true, data: favourites });
    } else {
      res.status(404).send({ success: false, msg: "No favourite songs found" });
    }
  } catch (error) {
    res.status(500).send({ success: false, msg: "Error fetching favourite songs", error: error.message });
  }
});

module.exports = router;
