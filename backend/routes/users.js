const router = require("express").Router();

router.route('/').get((req, res)=>{
  res.send("hey its users route")
})


module.exports = router;