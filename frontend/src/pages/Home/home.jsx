// import React, { useState } from 'react'
import './home.css'
import Header from '../../comonents/header/header'
import ExploreMenu from '../../comonents/ExploreMenu/ExploreMenu'
// import FoodDisplay from '../../comonents/FoodDisplay/FoodDisplay'




const Home = ({ setCategory }) => {

  
  return (
    <div>
      <Header/>
      <ExploreMenu setCategory={setCategory} />   
         {/* <FoodDisplay category={category} />  */}
    </div>
  )
}

export default Home