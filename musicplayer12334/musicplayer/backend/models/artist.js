const mongoose = require("mongoose");

const artistSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: false,
    },

    imageURL: {
      type: String,
      required: false,
    },
    twitter: {
      type: String,
      required: false,
    },
    instagram: {
      type: String,
      required: false,
    },
  },
  { timestamps: false }
);

module.exports = mongoose.model("artist", artistSchema);
