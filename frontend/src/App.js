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
<<<<<<< HEAD:frontend/src/App.js
      <Navbar setShowLogin={setShowLogin}/>
=======
    
      <Navbar setShowLogin={setShowLogin} setCategory={setCategory}/>
      
>>>>>>> f12bd146a8af07447847840df79137e269aefb89:src/App.js

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
