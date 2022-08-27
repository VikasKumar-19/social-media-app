const router = require("express").Router();
const Post = require('../models/Post');
const User = require("../models/User");

const getAllPosts = (req, res) => {
  res.send("hello")
}


const createPost = async (req, res) => {
  try {
    const post = await Post.create({...req.body})
    res.status(201).json({msg: "post is created"});
  }
  catch (err) {
    res.status(500).json({msg: err.message});
  }
}

const updateAPost = async (req, res)=>{
  try{
    const post = await Post.findById(req.params.id);
    if(post.userId !== req.body.userId){
      res.status(403).json({msg: "you can update only your post"});
    }
    else{
      await post.updateOne(req.body, {});
      res.status(200).json({msg: "your post has been updated"});
    }
  }
  catch(err){
    res.status(500).json({msg: err.message})
  }
}

const deleteAPost = async (req, res)=>{
  try{
    const post = await Post.findById(req.params.id);
    if(post.userId !== req.body.userId){
      res.status(403).json({msg: "you can only delete your post"});
    }
    else{
      await post.delete();
      res.status(200).json({msg: "your post has been deleted"});
    }
  }
  catch(err){
    res.status(500).json({msg: err.message})
  }
}

const likeOrDislikeAPost = async(req, res)=>{
  try{
    const post = await Post.findById(req.params.id);
    if(!post){
      return res.status(404).json({msg: err.message});
    }
    if(post.likes.includes(req.body.userId)){
      await post.update({$pull: {likes: req.body.userId}});
      return res.status(200).json({msg: 'The post has been disliked'})
    }
    await post.update({$push:{likes: req.body.userId}})
    res.status(200).json({msg: 'The post has been liked'})
  }
  catch(err){
    res.status(500).json({msg: err.message})
  }
}

const getSinglePost = async (req, res)=>{
  try{
    const post = await Post.findById(req.params.id);
    if(!post){
      return res.status(404).json({msg: err.message});
    }
    res.status(200).json({post});

  }
  catch(err){
    res.status(500).json({msg: err.message})
  }
}

const getTimelinePosts = async (req, res)=>{
  try{
    const currentUser = await User.findById(req.body.userId);
    const userPosts = await Post.find({userId: currentUser.id});
    const friendPosts = await Promise.all(
      currentUser.followings.map((friendId)=>{
        return Post.find({userId: friendId});
      })
    )
    res.status(200).json({posts: userPosts.concat(...friendPosts)})
  }   
  catch(err){
    res.status(500).json({msg: err.message})
  }
}

//create a post,get all posts
router.route('/').get(getAllPosts).post(createPost)
//update a post, delete a post, get a post
router.get('/timeline/all', getTimelinePosts)
router.route('/:id').get(getSinglePost).put(updateAPost).delete(deleteAPost);
//like a post
router.route('/:id/like').put(likeOrDislikeAPost);

module.exports = router;