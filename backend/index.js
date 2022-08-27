const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const helmet = require('helmet');
const morgan = require('morgan');
const usersRouter = require('./routes/users');
const authRouter = require('./routes/auth');
const postsRouter = require('./routes/posts');
const connectDB = require('./db/connectDB');
dotenv.config();

const app = express();
app.use(express.json());
app.use(helmet());
// app.use(morgan("common"));

app.use('/api/auth', authRouter)
app.use('/api/users', usersRouter)
app.use('/api/posts', postsRouter)

app.get('/', (req, res)=>{
  res.send("helo")
})


const PORT = process.env.PORT || 8800;

const start = async ()=>{
  try{
    await connectDB(process.env.MONGO_URI);
    app.listen(PORT, ()=>{
      console.log('app is running on http://localhost:'+PORT);
    })

  }
  catch(err){
    console.log(err);
  }
}

start();