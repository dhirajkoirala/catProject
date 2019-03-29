const express = require('express')
const app = express();


const https_redirection= (req, res, next) =>{
  if (req.secure) {
    next();
  } else {
    console.log('redirecting to https');
    res.redirect('https://' + req.headers.host + req.url);
  }
}

module.exports=https_redirection;