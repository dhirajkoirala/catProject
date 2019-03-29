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
const https_redirection=require('./middleware/https_redirection')




app.enable('trust proxy');
app.use(express.json())
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors())
db;



app.use("*",https_redirection)
app.use(express.static('public'));
app.set('view engine', 'ejs');
app.use('',home)
app.use('/image', image);


var privateKey  = fs.readFileSync(__dirname+'/startup/sslcert/server.key', 'utf8');
var certificate = fs.readFileSync(__dirname+'/startup/sslcert/server.cert', 'utf8');
 
var credentials = {key: privateKey, cert: certificate};


var httpServer = http.createServer(app);
var httpsServer = https.createServer(credentials, app);

httpServer.listen(8080);
httpsServer.listen(8443);
