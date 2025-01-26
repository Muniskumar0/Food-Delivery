import React from 'react'
import './Footer.css'
import { assets } from '../../assets/frontend_assets/assets'

const Footer = () => {
  return (
    <div className='footer' id='footer'>
      <div className="footer-content">
        <div className="footer-left">
          <h1>MAVY.</h1>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. At maiores labore unde deleniti tenetur sed cupiditate ex, nisi possimus a ipsa eligendi, corrupti, molestiae fugiat quo vitae consectetur! Consectetur, quis.</p>

          <div className='footer-social-icon'>

          <img src={assets.facebook_icon} alt="" />
          <img src={assets.twitter_icon} alt="" />
          <img src={assets.linkedin_icon} alt="" />
          </div>

        </div>

        <div className="footer-center">
          <h2>COMPANY</h2>
          <ul>
            <li>Home</li>
            <li>About us</li>
            <li>Delivery</li>
            <li>Privacy policy</li>
          </ul>

        </div>
        <div className="footer-right">
          <h2>CONTACT US</h2>
          <ul>
            <li>+1-254-765-987</li>
            <li>contact@mavy.com</li>
            </ul>

        </div>

      </div>
      <hr />
      <p className='footer-copyright'>Copyright 2025 Mavy.com - All Right Reserved.</p>
    </div>
  )
}

export default Footer