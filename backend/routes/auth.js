const router = require("express").Router();
const User = require('../models/User')

router.post('/register', async (req, res) => {
  const user = await User.create({ ...req.body })
  res.status(201).json({ user })
})

module.exports = router;