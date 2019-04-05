const express = require('express');
const router = express.Router();
const {User} = require('../models/user');
const  bcrypt=require('bcryptjs');
const jwt = require('jsonwebtoken')
const _=require('lodash');                                  // _lodash is library for pickup from object


 router.get('/', async (req,res)=>{
   const user= await User.find({}).select('-password')   
    res.send(user);
 })   



 router.post('/', async (req, res) => {                                              //registering new user
  
  let user =await User.findOne({email: req.body.email})
  if(user) return res.status(400).send('user already registered')
  
  user =new User( _.pick(req.body,['name','email','password','isAdmin']));
  const salt = await bcrypt.genSalt(10) ;
  user.password=await bcrypt.hash(user.password,salt,);  
  await user.save();
  
  const token=user.generateAuthToken();
  res.header('x-auth-token',token).send(_.pick(user,['_id','name','email']))
  
});

module.exports=router;