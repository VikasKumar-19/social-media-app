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
      const user = await User.findByIdAndUpdate(req.params.id, req.body, {new: true});
      res.status(200).json({user, msg: "account has been updated"})
    }
    catch(err){
      res.status(500).json({msg: "internal server error"})
    }
  }
  else{
    res.status(403).json({msg: "you can only update your account."})
  }
}

const deleteUser = async(req, res)=>{
  if(req.body.userId === req.params.id || req.body.isAdmin){
    try{
      const user = await User.findByIdAndDelete(req.params.id);
      if(!user){
        return res.status(404).json({msg: "Account not found."})
      }
      res.status(200).json({user, msg: "account has been deleted"})
    }
    catch(err){
      res.status(500).json({msg: "internal server error"})
    }
  }
  else{
    res.status(403).json({msg: "you can only delete your account."})
  }
}

const getSingleUser = async(req, res)=>{
  try{
    const user = await User.findById(req.params.id).select('-password -updatedAt');
    res.status(200).json({user})
  }
  catch(err){
    res.status(500).json({msg: "internal server error"})
  }
}

const followAUser = async(req, res)=>{
  if(req.body.userId !== req.params.id){
    try{
      const user = await User.findById(req.params.id);
      const currentUser = await User.findById(req.body.userId);
      if(user.followers.includes(req.body.userId)){
        return res.status(403).json({msg: "you already followed this user"});
      }
      await user.updateOne({$push:{followers: req.body.userId}});
      await currentUser.updateOne({$push: {followings: req.params.id}});
      res.status(200).json({msg: "user has been followed"})
    } 
    catch(err){
      res.status(500).json({msg: err.message});
    }
  }else{
    res.status(403).json({msg:"you cannot follow yourself"})
  }
}

const unfollowAUser = async(req, res)=>{
  if(req.body.userId !== req.params.id){
    try{
      const user = await User.findById(req.params.id);
      const currentUser = await User.findById(req.body.userId);
      if(!user.followers.includes(req.body.userId)){
        return res.status(403).json({msg: "you don't follow this user"});
      }
      await user.updateOne({$pull:{followers: req.body.userId}});
      await currentUser.updateOne({$pull: {followings: req.params.id}});
      res.status(200).json({msg: "user has been unfollowed"})
    } 
    catch(err){
      res.status(500).json({msg: err.message});
    }
  }else{
    res.status(403).json({msg:"you cannot unfollow yourself"})
  }
}

const getAllUsers = async(req, res)=>{
  try{
    const users = await User.find({});
    res.status(200).json({users, total: users.length})
  }
  catch(err){
    res.status(500).json({err: err.message});
  }
}

router.route('/').get(getAllUsers)
router.route('/:id').get(getSingleUser).put(updateUser).delete(deleteUser);
router.route('/:id/follow').put(followAUser);
router.route('/:id/unfollow').put(unfollowAUser);

module.exports = router;