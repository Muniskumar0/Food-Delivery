
import React from 'react';
import './About.css';
import bike from "./bike.png"


const About = () => {
  return (
    <div id="about">

      <section className="about-hero">
        <div className="hero-content">
          <marquee direction="right">
            <img src={bike} alt="bike" />
          </marquee>
          
        </div>
      </section>

      <section className="about-story">
        <div className="container">
          <div className="story-text">
            <h2>Our Story</h2>
            <p>
              At MAVY, we believe that dining is more than just sustenance; it's an immersive experience that engages all your senses. Established in 2025, our platform was born from a passion for delivering exceptional food experiences.
            </p>
            <p>
              We offer a wide variety of vegetarian, non-vegetarian, and dessert options to satisfy every palate. From fast food favorites to authentic Chinese cuisine, our menu has something for everyone. We carefully curate our selections to bring you the best flavors from across Tamil Nadu.
            </p>
            <p>
              MAVY provides a secure and user-friendly payment system, ensuring a hassle-free ordering experience. We use the latest encryption technologies to protect your transactions.

            </p>

            <p>
              Our delivery network covers all major cities across Tamil Nadu, bringing delicious meals right to your doorstep. We partner with the best local restaurants to maintain quality and freshness.

            </p>

            <p>
              Our commitment to quality starts with sourcing the freshest, locally-sourced ingredients. Our chefs craft each dish with precision and creativity, ensuring a symphony of flavors.

            </p>

            <p>
              More than just a food delivery service, MAVY is a community. We aim to provide a warm and inviting experience where customers can enjoy their favorite meals and create cherished memories.

            </p>


          </div>
        </div>
      </section>
    </div>
  );
};

export default About;