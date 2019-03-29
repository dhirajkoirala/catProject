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
    },
    Longitude:{
        type: [Number]
    },
    Latitude: {
        type:[Number]
    }
})

const image = mongoose.model('Image', ImageSchema);
module.exports = image;

// { category: 'ad',
//   title: 'asd',
//   description: 'dfasd',
//   Longitude: [ 22, 16, 26.3683 ],
//   Latitude: [ 60, 30, 40.6972 ] }