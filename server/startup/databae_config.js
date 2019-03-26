const mongoose = require('mongoose')


module.exports = mongoose.connect('mongodb://localhost/server-side-scripting', { useNewUrlParser: true })
    .then(() => {
        console.log('Connected to database...');

    })
    .catch((err) => {
        console.log('Connection error..., ', err);

    })

