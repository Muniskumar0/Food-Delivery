import React from 'react'
import './NavBar.css'
import {assets} from '../../assets/assets'

const NavBar = () => {
  return (
    <div className='navbar'>
      <div>
        <h1>.MAVY</h1>
        <h4>Admin Panel</h4>
      </div>
      
      <img className='profile' src={assets.profile_image} alt="" />
    </div>
  )
}

export default NavBar