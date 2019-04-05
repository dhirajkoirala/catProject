const express = require("express");
const path = require("path");
const router = express.Router();
const Image = require("../models/Image");
const multerUploads = require("../middleware/image_uploader");
const sharp = require("sharp");
const ExifImage = require("exif").ExifImage;
const fs = require("fs");
const auth=require('../middleware/auth')
require("dotenv").config();


router.get("/",async function(req, res) {
  const images = await Image.find({}, " -__v");
  res.send(images);
});

router.get("/:id", async function(req, res) {
  const images = await Image.findById(req.params.id, "-_id -__v");
  res.send(images);
});

router.get("/:title", async function(req, res) {
  const images = await Image.find({title : req.params.title})
  res.send(images);
});


router.post("/", multerUploads, async (req, res) => {
  const image_path =
    path.join(__dirname, "/../public/images/") + req.file.filename;

  sharp(req.file.path)
    .resize(800, 800)
    .toFile(image_path);

  try {
    new ExifImage({ image: req.file.path }, async function(error, exifData) {
      if (error) console.log("Error: " + error.message);
      else {
        const payload = {
          ...req.body,
          image_source: image_path,
          Longitude: exifData.gps.GPSLongitude,
          Latitude: exifData.gps.GPSLatitude
        };
        fs.unlink(req.file.path, (err) => {
          if (err) {
            console.error(err)
            return
          }
        
        })
        const image = new Image(payload);
        const result = await image.save();
        res.status(201).send(result);
      }
    });
  } catch (error) {
    console.log("Error: " + error.message);
  }
});

router.put("/:id", async function(req, res) {
  const image = await Image.findById(req.params.id);
  image.category = req.body.category;
  image.title = req.body.title;
  image.description = req.body.description;
  const result=await image.save()
  res.send(result)
});

router.delete("/:id", async function(req, res) {
  const image = await Image.findOneAndDelete(req.params.id);
  if (!image) return res.status(400).send('No data found of given id ')
  try {
    fs.unlinkSync(image.image_source)
    res.send("Data removed");    
  } catch(err) {
    console.error(err)
  } 
});

module.exports = router;
