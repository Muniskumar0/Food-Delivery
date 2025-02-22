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
import PaymentPage from './pages/Payment/Payment';
import DeliveryStatus from './pages/Delivery/DeliveryStatus';
import About from './comonents/About/About';
import Contact from './comonents/Contact/Contact';

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
          <Route path="/" element={<Home setCategory={setCategory} />} />
          <Route path="/cart" element={<Cart isLoggedIn={isLoggedIn} setShowLogin={setShowLogin} />} />
          <Route path="/order" element={<PlaceOrder />} />
          <Route path="/menu" element={<FoodDisplay category={category} />} />
          <Route path="/payment" element={<PaymentPage />} />
          <Route path="/delivery-status" element={<DeliveryStatus />} /> 
          <Route path="/about" element={<About />} /> 
          <Route path="/contact" element={<Contact />} /> 

        </Routes>

      </div>
      

      <Footer />
    </>
  );
}

export default App;
