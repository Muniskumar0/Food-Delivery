import React, { useState } from "react";
import './Navbar.css';
import { assets } from "../../assets/frontend_assets/assets";

// Update Navbar to accept props, specifically numbers
const Navbar = ({ numbers }) => {
    const [menu, setMenu] = useState("home");

    return (
        <div className="navbar">
            <h1 className="logo">FOOD DELIVERY</h1>
            <ul className="navbar-menu">
                <li onClick={() => setMenu("home")} className={menu === "home" ? "active" : ""}>Home</li>
                <li onClick={() => setMenu("menu")} className={menu === "menu" ? "active" : ""}>Menu</li>
                <li onClick={() => setMenu("about")} className={menu === "about" ? "active" : ""}>About</li>
                <li onClick={() => setMenu("contact")} className={menu === "contact" ? "active" : ""}>Contact</li>
            </ul>
            <div className="navbar-right">
                <img src={assets.search_icon} alt="" />
                <div className="navbar-search-icon">
                    <img src={assets.basket_icon} alt="" />
                    <div className="dot">{numbers}
                    </div>
                </div>
                <button>Sign In</button>
            </div>
        </div>
    );
}

export default Navbar;
