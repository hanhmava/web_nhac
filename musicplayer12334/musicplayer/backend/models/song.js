const mongoose = require("mongoose");

const SongSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: false,
    },

    imageURL: {
      type: String,
      required: false,
    },
    songUrl: {
      type: String,
      required: false,
    },
    album: {
      type: String,
    },
    artist: {
      type: String,
      required: false,
    },
    language: {
      type: String,
      required: false,
    },
    category: {
      type: String,
      required: false,
    },
  },
  { timestamps: false }
);

module.exports = mongoose.model("song", SongSchema);
