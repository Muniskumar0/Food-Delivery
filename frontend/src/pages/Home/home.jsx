// import React, { useState } from 'react'
import './home.css'
import Header from '../../comonents/header/header'
import ExploreMenu from '../../comonents/ExploreMenu/ExploreMenu'
import About from '../../comonents/About/About'
// import FoodDisplay from '../../comonents/FoodDisplay/FoodDisplay'




const Home = ({ setCategory }) => {

  
  return (
    <div>
      <Header/>
      <ExploreMenu category={category} setCategory={setCategory} />
      {/* <FoodDisplay category={category} />  */}
      <About/>
    </div>
  )
}

export default Home