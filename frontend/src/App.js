import { Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './pages/Home/home';
import About from './comonents/About/About';

import Navbar from './comonents/navbar/Navbar';
import Footer from './comonents/Footer/Footer';
import FoodDisplay from './comonents/FoodDisplay/FoodDisplay';
import { useState } from 'react';
import LoginPopUp from './comonents/LoginPopUp/LoginPopUp';
import Cart from './pages/Cart/Cart';
import PlaceOrder from './pages/Placeorder/PlaceOrder';

function App() {
  const [category, setCategory] = useState("All");
  const [showLogin, setShowLogin] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Track login state

  return (
    <>
      {/* Show Login Popup if user clicks login button */}
      {showLogin && <LoginPopUp setShowLogin={setShowLogin} setIsLoggedIn={setIsLoggedIn} />}

      <Navbar setShowLogin={setShowLogin} isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />

      <div className="app">
      <Routes>
        <Route path="/about" element={<About />} />

          <Route path="/" element={<Home />} />
          <Route path="/cart" element={<Cart isLoggedIn={isLoggedIn} setShowLogin={setShowLogin} />} />
          <Route path="/order" element={<PlaceOrder />} />
          <Route path="/menu" element={<FoodDisplay category={category} />} />
        </Routes>
      </div>

      <Footer />
    </>
  );
}

export default App;
