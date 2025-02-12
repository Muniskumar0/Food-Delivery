import React from 'react'

import './header.css'
// import { Link } from 'react-router-dom'
import vegimg from './header_img.png'

import nonveg from './banner 1.png'
import sweet from './sweet banner.png'
import Carousel from 'react-bootstrap/Carousel';




const Header = () => {
  return (
    

    <div className="header">
    <Carousel data-bs-theme="dark">
      <Carousel.Item intervel={2000}>
        <img
          className="d-block w-100 "
          src={vegimg}
          alt="First slide"
        />
        
      </Carousel.Item>
      <Carousel.Item intervel={2000}>
        <img
          className="d-block w-100"
          src={nonveg}
          alt="Second slide"
        />
        
      </Carousel.Item>
      <Carousel.Item intervel={2000}>
        <img
          className="d-block w-100"
          src={sweet}
          alt="Third slide"
        />
        
      </Carousel.Item>
    </Carousel>
   



        
    </div>
  )
}

export default Header