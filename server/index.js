const express = require('express')
const app = express();
const bodyParser = require('body-parser')
const https = require('https')
const cors=require('cors')
const http = require('http');
const fs = require("fs");
const db = require('./startup/databae_config')
const image = require('./router/image_form');
const home=require('./router/home')
const user= require('./router/user')
const helmet=require('helmet')






app.enable('trust proxy');
app.use(express.json())
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors())
app.use(helmet())
db;



  

app.use(express.static('public'));
app.set('view engine', 'pug')






app.use('',home)
app.use('/image', image);
app.use('/user',user)




var privateKey  = fs.readFileSync(__dirname+'/startup/sslcert/server.key', 'utf8');
var certificate = fs.readFileSync(__dirname+'/startup/sslcert/server.cert', 'utf8');
 
const options = {
      key: privateKey,
      cert: certificate
};



https.createServer(options, app).listen(3000);
http.createServer((req, res) => {
      res.writeHead(301, { 'Location': 'https://localhost:3000' + req.url });
      res.end();
}).listen(8080);
