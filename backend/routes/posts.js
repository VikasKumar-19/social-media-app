const router = require("express").Router();

const getAllPosts = (req, res)=>{
  res.send("hello")
}
router.route('/').get(getAllPosts)

module.exports = router;