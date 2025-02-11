import { Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './pages/Home/home';
import Navbar from './comonents/navbar/Navbar';
import Footer from './comonents/Footer/Footer';
import FoodDisplay from './comonents/FoodDisplay/FoodDisplay';
import { useState } from 'react';
import LoginPopUp from './comonents/LoginPopUp/LoginPopUp';
import Cart from './pages/Cart/Cart';
import PlaceOrder from './pages/Placeorder/PlaceOrder';
import Category from './comonents/Category/Category';

function App() {
  const [category,setCategory]=useState("All")
  const[showLogin,setShowLogin]=useState(false)
  return (
    <>
    {showLogin?<LoginPopUp setShowLogin={setShowLogin}/>:<></>}

    
      <Navbar setShowLogin={setShowLogin} setCategory={setCategory}/>

      {/* <Category /> */}
    <div className="app">
    
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/order" element={<PlaceOrder/>} />


        <Route path="/menu" element={<FoodDisplay category={category} />} />


      </Routes>
      {/* <input type='search' className='search-bar' placeholder='Search your food...' /> */}
    </div>
    <Footer/>
    

    </>
    );

  }
      


export default App;
