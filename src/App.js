import { Route, Routes } from 'react-router-dom';
import './App.css';
import Cart from './pages/Cart/Cart';
import Home from './pages/Home/home';
import Navbar from './comonents/navbar/Navbar';
import Footer from './comonents/Footer/Footer';

function App() {
  return (
    <>
    <div className="app">
      <Navbar />


      <Routes>
        <Route path="/" element={<Home />} />
        <Route path='/cart' element={<Cart/>}/>
      </Routes>

     
    </div>
    <Footer/>
    </>


      
  );
}

export default App;
