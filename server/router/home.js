const express = require("express");
const router=express.Router()
router.get('/', async (req, res) => {
    await res.render('index')
  });
  
  router.post('/', (req, res) => {    
      res.send('Image uploaded post')
  });
  
  module.exports=router;