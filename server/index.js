const express = require('express')
const app = express();
const bodyParser = require('body-parser')
const db = require('./startup/databae_config')
const image = require('./router/image_form');

app.use(express.json())
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static('public'));
app.set('view engine', 'ejs');
app.use('/image', image);


app.get('/', async (req, res) => {
  await res.render('index')
});

app.post('/', (req, res) => {
    
    res.send('Image uploaded post')
});
db;
app.listen(3000, () => {
    console.log('running on port  3000');
})