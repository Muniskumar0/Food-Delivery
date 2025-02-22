import React from 'react'
import { BsFacebook, BsInstagram, BsTelephone } from 'react-icons/bs'
import { IoLocationSharp } from 'react-icons/io5'
import './Contact.css'

function Contact() {
  return (
    <div className='contact'>
      <h1 className='title'>CONTACT DETAILS</h1>
      <div className="contact-details">
        <div className="map">
          <h1 className='location'><IoLocationSharp />Location</h1>
          <iframe title="Google Map Location" src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d31103.05519280627!2d80.2193408!3d12.9794048!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a525d3154bf18fb%3A0x706bf6b0e2157ca9!2sLogin360!5e0!3m2!1sen!2sin!4v1740202998441!5m2!1sen!2sin" width="600" height="450" loading="lazy" referrerpolicy="no-referrer-when-downgrade">
          </iframe>
        </div>
        <div className="contact-numbers">
          <h1>Contact Us</h1>
          <a href="tel:+919943257606"><BsTelephone /> +91 9943257606</a>
          <a href="https://instagram.com/mavy_food"><BsInstagram /> mavy_food</a>
          <a href="https://facebook.com/mavy_food"><BsFacebook /> mavy_food</a>
        </div>
      </div>
    </div>
  )
}

export default Contact
