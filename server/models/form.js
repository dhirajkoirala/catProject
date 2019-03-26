const mongoose = require('mongoose')

const ImageSchema = new mongoose.Schema({
    category: {
        type: String
    },
    title: {
        type: String,
    },
    description: {
        type: String,
    },
    image_source: {
        type: String,
    }
})

const image = mongoose.model('Image', ImageSchema);
module.exports = image;