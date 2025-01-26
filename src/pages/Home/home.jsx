import React, { useState } from 'react'
import './home.css'
import Header from '../../comonents/header/header'
import ExploreMenu from '../../comonents/ExploreMenu/ExploreMenu'
import FoodDisplay from '../../comonents/FoodDisplay/FoodDisplay'
import AppDownload from '../../comonents/AppDownload/AppDownload'

const Home = () => {

  const [category,setCategory]=useState("All")
  return (
    <div>
      <Header/>
      <ExploreMenu category={category} setCategory={setCategory} />
      <FoodDisplay category={category} /> 
      <AppDownload/>
    </div>
  )
}

export default Home