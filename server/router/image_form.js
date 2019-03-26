const express = require('express');
const path = require('path');
const router = express.Router();
const upload = require('../middleware/image_uploader')
const Resize = require('../utility/image_resizer')
const Image = require('../models/form')

router.get('/', async function (req, res) {
  const images=await Image.find({})
  res.send(images)
});

router.post('/', upload.single('image'), async function (req, res) {
  console.log('I am here');

  const imagePath = path.join(__dirname, '/../public/images');
  const fileUpload = new Resize(imagePath);
  if (!req.file) {
    res.status(401).json({ error: 'Please provide an image' });
  }

  const filename = await fileUpload.save(req.file.buffer);
  console.log(req.body);
  
  const payload = {
    category: req.body.category,
    title: req.body.title,
    description: req.body.description,
    image_source: filename
  }

  const image=  Image (payload)
  await image.save()
  return res.status(200).json(image);
  });

module.exports = router;