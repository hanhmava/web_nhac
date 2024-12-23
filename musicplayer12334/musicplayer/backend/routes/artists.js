const artist = require("../models/artist");

const router = require("express").Router();

router.get("/getAll", async (req, res) => {
  try {
    const Arists = await artist.find();
    console.log("Arists:", Arists); // Thêm log ở đây
    res.status(200).send({ success: true, data: Arists });
  } catch (error) {
    console.error("Error fetching Arists:", error.message); // Thêm log cho lỗi
    res.status(500).send({ success: false, msg: "Server Error", error: error.message });
  }
});

router.get("/getOne/:getOne", async (req, res) => {
  const filter = { _id: req.params.getOne };

  const cursor = await artist.findOne(filter);

  if (cursor) {
    res.status(200).send({ success: true, data: cursor });
  } else {
    res.status(200).send({ success: true, msg: "No Data Found" });
  }
});

// router.post("/save", async (req, res) => {
//   const newArtist = artist({
//     name: req.body.name,
//     imageURL: req.body.imageURL,
//     twitter: req.body.twitter,
//     instagram: req.body.instagram,
//   });
//   try {
//     const savedArtist = await newArtist.save();
//     res.status(200).send({ artist: savedArtist });
//   } catch (error) {
//     res.status(400).send({ success: false, msg: error });
//   }
// });

router.post("/save", async (req, res) => {
  // Kiểm tra xem các trường bắt buộc có trong req.body không
  const { name, imageURL, twitter, instagram } = req.body;

  if (!twitter || !instagram) {
    return res.status(400).send({
      success: false,
      msg: "Twitter and Instagram are required fields."
    });
  }

  // Tạo mới artist
  const newArtist = new artist({
    name: name,
    imageURL: imageURL,
    twitter: twitter,
    instagram: instagram,
  });

  try {
    // Lưu artist vào database
    const savedArtist = await newArtist.save();
    res.status(200).send({ success: true, artist: savedArtist });
  } catch (error) {
    // Trả về lỗi nếu lưu không thành công
    console.error(error);
    res.status(400).send({ success: false, msg: "Error saving artist", error: error.message });
  }
});




router.put("/update/:updateId", async (req, res) => {
  const filter = { _id: req.params.updateId };
  const options = {
    upsert: true,
    new: true,
  };
  try {
    const result = await artist.findOneAndUpdate(
      filter,
      {
        name: req.body.name,
        imageURL: req.body.imageURL,
        twitter: req.body.twitter,
        instagram: req.body.instagram,
      },
      options
    );
    res.status(200).send({ artist: result });
  } catch (error) {
    res.status(400).send({ success: false, msg: error });
  }
});

router.delete("/delete/:deleteId", async (req, res) => {
  const filter = { _id: req.params.deleteId };

  const result = await artist.deleteOne(filter);
  if (result.deletedCount === 1) {
    res.status(200).send({ success: true, msg: "Data Deleted" });
  } else {
    res.status(200).send({ success: false, msg: "Data Not Found" });
  }
});

module.exports = router;
