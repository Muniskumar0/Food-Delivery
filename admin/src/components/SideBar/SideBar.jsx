import './SideBar.css'
import { assets } from '../../assets/assets'
import { NavLink } from 'react-router-dom'
import { MdAddCircleOutline, MdOutlineFastfood, MdShoppingCart, MdSupervisedUserCircle } from "react-icons/md";

const SideBar = () => {

  return (
    <div className='sidebar'>
      <div className="sidebar-options">
        <NavLink to='/add' className='sidebar-option'>
        <MdAddCircleOutline className='icon'/>
          <p>Add Items</p>
        </NavLink>
        <NavLink to='/list' className='sidebar-option'>
        <MdOutlineFastfood className='icon'/>
          <p>List Items</p>
        </NavLink>
        <NavLink to='/orders' className='sidebar-option'>
          <MdShoppingCart className='icon'/>
          <p>Orders</p>
        </NavLink>
        <NavLink to='/users' className='sidebar-option'>
          <MdSupervisedUserCircle className='icon'/>
          <p>Users</p>
        </NavLink>
      </div>
    </div>
  )
}

export default SideBar;
