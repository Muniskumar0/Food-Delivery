import React from 'react'
import NavBar from './components/NavBar/NavBar';
import SideBar from './components/SideBar/SideBar';
import { Route, Routes } from 'react-router-dom';
import Add from './pages/Add/Add';
import List from './pages/List/List';
import Orders from './pages/Orders/Orders';
import { ToastContainer } from 'react-toastify';
import User from './pages/Users/User';

const App = ()=>{
  return(
    <div>
      <ToastContainer />
        <NavBar />
          <hr />
          <div className="app-content">
            <SideBar />
            <Routes>
              <Route path='/add' element={<Add />} />
              <Route path='/list' element={<List />} />
              <Route path='/orders' element={<Orders />} />
              <Route path='/users' element={<User />} />
            </Routes>
          </div>
    </div>
  )
}

export default App;