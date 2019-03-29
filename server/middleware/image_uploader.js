const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: path.resolve(path.join(__dirname, "/../public/temp/")),
  filename: function(req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  }
});
const multerUploads = multer({ storage: storage }).single("image");
module.exports = multerUploads;
