const album = require("../models/album");

const router = require("express").Router();

router.get("/getAll", async (req, res) => {
  try {
    const Album = await album.find();
    console.log("Album:", Album); // Thêm log ở đây
    res.status(200).send({ success: true, data: Album });
  } catch (error) {
    console.error("Error fetching album:", error.message); // Thêm log cho lỗi
    res.status(500).send({ success: false, msg: "Server Error", error: error.message });
  }
});

router.get("/getOne/:getOne", async (req, res) => {
  const filter = { _id: req.params.getOne };

  const cursor = await album.findOne(filter);
  console.log(cursor);
  if (cursor) {
    res.status(200).send({ success: true, data: cursor });
  } else {
    res.status(200).send({ success: true, msg: "No Data Found" });
  }
});

router.post("/save", async (req, res) => {
  const newAlbum = album({
    name: req.body.name,
    imageURL: req.body.imageURL,
  });
  try {
    const savedAlbum = await newAlbum.save();
    res.status(200).send({ album: savedAlbum });
  } catch (error) {
    res.status(400).send({ success: false, msg: error });
  }
});

router.put("/update/:updateId", async (req, res) => {
  const filter = { _id: req.params.updateId };
  const options = {
    upsert: true,
    new: true,
  };
  try {
    const result = await album.findOneAndUpdate(
      filter,
      {
        name: req.body.name,
        imageURL: req.body.imageURL,
      },
      options
    );
    res.status(200).send({ album: result });
  } catch (error) {
    res.status(400).send({ success: false, msg: error });
  }
});

router.delete("/delete/:deleteId", async (req, res) => {
  const filter = { _id: req.params.deleteId };

  try {
    const result = await album.deleteOne(filter);
    if (result.deletedCount === 1) {
      res.status(200).send({ success: true, msg: "Data Deleted" });
    } else {
      res.status(404).send({ success: false, msg: "Song not found" });
    }
  } catch (error) {
    res.status(500).send({ success: false, msg: "Error deleting song", error: error.message });
  }
});

module.exports = router;
