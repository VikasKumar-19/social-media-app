import React from 'react'
import Feed from '../../components/feed'
import Leftbar from '../../components/left-bar'
import Rightbar from '../../components/right-bar'
import Topbar from '../../components/top-bar'
import './home.css';


const Home = () => {
  return (
    <>
      <Topbar />
      <div className="homeContainer">
        <Leftbar />
        <Feed />
        <Rightbar />
      </div>
    </>
  )
}

export default Home