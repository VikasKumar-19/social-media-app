import React from 'react'
import './leftbar.css';
import RssFeedIcon from '@mui/icons-material/RssFeed';

const Leftbar = () => {
  return (
    <div className='leftbar'>
      <div className="leftbarWrapper">
        <ul className="leftbarList">
          <li className="sidebarListItem">
            <RssFeedIcon className='sidebarIcon' />
            <span className="sidebarListItemText">Feed</span>
          </li>
          <li className="sidebarListItem">
            <RssFeedIcon className='sidebarIcon' />
            <span className="sidebarListItemText">Feed</span>
          </li>
          <li className="sidebarListItem">
            <RssFeedIcon className='sidebarIcon' />
            <span className="sidebarListItemText">Feed</span>
          </li>
        </ul>
      </div>
    </div>
  )
}

export default Leftbar