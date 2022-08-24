const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require('bcryptjs');

const updateUser = async (req, res)=>{
  if(req.body.userId === req.params.id || req.body.isAdmin){
    if(req.body.password) {
      try{
        const salt = await bcrypt.genSalt(10);
        req.body.password = await bcrypt.hash(req.body.password, salt);
      }
      catch(err){
        res.status(500).json({msg: err.message})
      }
    }
    try{
      const user = await User.findByIdAndUpdate(req.params.id, req.body);
      res.status(200).json({msg: "account has been updated"})
    }
    catch(err){
      res.status(500).json({msg: "internal server error"})
    }
  }
  else{
    res.status(403).json({msg: "you can only update your account."})
  }
}

router.route('/')
router.route('/:id').put(updateUser)

module.exports = router;