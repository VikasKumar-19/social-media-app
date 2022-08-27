const router = require("express").Router();
const User = require('../models/User')
const bcrypt = require('bcryptjs');

router.post('/register', async (req, res) => {
  try{
    const user = await User.create({ ...req.body })
    res.status(201).json({ user })
  }
  catch(err){
    res.status(400).json({msg: err.message})
  }
})

router.post("/login", async (req, res)=>{
  const {email, password} = req.body;
  if(!email || !password){
    return res.status(400).json({msg: "email and password is required"})
  }
  try{
    const user = await User.findOne({email});
    if(!user){
      return res.status(404).json({msg: "user not found"});
    }
    const isPasswordMatched = await bcrypt.compare(password, user.password);
    if(!isPasswordMatched){
      return res.status(400).json({msg: "invalid email or password"});
    }
    return res.status(200).json({user})
  }
  catch(err){
    res.status(501).json({msg: err.message})
  }
})

module.exports = router;