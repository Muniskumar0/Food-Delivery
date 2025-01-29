import { Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './pages/Home/home';
import Navbar from './comonents/navbar/Navbar';
import Footer from './comonents/Footer/Footer';
import FoodDisplay from './comonents/FoodDisplay/FoodDisplay';
import { useState } from 'react';
import LoginPopUp from './comonents/LoginPopUp/LoginPopUp';
import Cart from './pages/Cart/Cart';

function App() {
  const [category,setCategory]=useState("All")
  const[showLogin,setShowLogin]=useState(false)
  return (
    <>
    {showLogin?<LoginPopUp setShowLogin={setShowLogin}/>:<></>}

    
      <Navbar setShowLogin={setShowLogin} setCategory={setCategory}/>

    <div className="app">
    
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cart" element={<Cart />} />

        <Route path="/foodItem" element={<FoodDisplay category={category} />} />
        
      </Routes>
     
    </div>
    <Footer/>
    

    </>
    );

  }
      


export default App;
