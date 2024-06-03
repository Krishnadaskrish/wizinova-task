const multer = require("multer");
const storage = multer.diskStorage({
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
  destination: "uploads/",
});
const uploade = multer({ storage: storage });
const cloudinary = require("../config/CloudinaryConfig");

const upload = (req, res, next) => {
  uploade.single("image")(req, res, async (err) => {
    try {
      if (err) {
        return res.status(400).json({ message: err.message });
      }

      if (!req.file) {
        return res.status(400).json({ message: "No file uploaded." });
      }

      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: "wizinova",
      });

      req.body.image = result.secure_url;
      console.log(req.body.image);
      next();
    } catch (error) {
      return res
        .status(500)
        .json({ message: "Error uploading file to Cloudinary." });
    }
  });
};

module.exports = upload;
