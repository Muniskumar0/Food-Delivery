import React, { useContext, useState, useEffect } from "react";
import './Navbar.css';
import { Link } from "react-router-dom";
import { StoreContext } from "../../context/StoreContext";
import { BsCartCheckFill } from "react-icons/bs";
import { IoSearch } from "react-icons/io5";

const Navbar = ({ setShowLogin, isLoggedIn, setIsLoggedIn }) => {
    const [menu, setMenu] = useState("home");
    const { cartItem } = useContext(StoreContext);
    const totalItems = Object.values(cartItem).reduce((acc, qty) => acc + qty, 0);

    const [username, setUsername] = useState("");
    const [showProfileMenu, setShowProfileMenu] = useState(false);

    useEffect(() => {
        const storedUsername = localStorage.getItem("username");
        const storedIsLoggedIn = localStorage.getItem("isLoggedIn");

        if (storedIsLoggedIn === "true") {
            setIsLoggedIn(true);
        } else {
            setIsLoggedIn(false);
        }

        if (storedUsername) {
            setUsername(storedUsername);
        }
    }, [setIsLoggedIn]);

    const handleLogout = () => {
        setIsLoggedIn(false);
        localStorage.removeItem("username");
        localStorage.removeItem("isLoggedIn");
        setUsername("");
        setShowProfileMenu(false);
    };

    return (
        <div className="navbar">
            <h1 className="logo"><Link to="/"> MAVY. </Link></h1>
            <ul className="navbar-menu">
                <Link to={'/'} onClick={() => setMenu("home")} className={menu === "home" ? "active" : ""}>Home</Link>
                <Link to={'/menu'} onClick={() => setMenu("menu")} className={menu === "menu" ? "active" : ""}>Menu</Link>
                <a href="#about" onClick={() => setMenu("about")} className={menu === "about" ? "active" : ""}>About</a>
                <a href="#footer" onClick={() => setMenu("contact")} className={menu === "contact" ? "active" : ""}>Contact</a>
            </ul>
            <div className="navbar-right icons">
                <IoSearch style={{ fontSize: "30px" }} />
                <div className="navbar-search-icon icons">
                    <Link to={'/Cart'}><BsCartCheckFill style={{ fontSize: "30px" }} /></Link>
                    <div className={totalItems === 0 ? "" : "dot"}>
                        {totalItems > 0 && <span>{totalItems}</span>}
                    </div>
                </div>

                {isLoggedIn ? (
                    <div className="navbar-user" onClick={() => setShowProfileMenu(!showProfileMenu)}>
                        <span>🙎‍♂️ {username}</span>
                        {showProfileMenu && (
                            <div className="profile-dropdown">
                                <p><Link to="/delivery-status">Delivery Status</Link></p>
                                <button onClick={handleLogout}>Logout</button>
                            </div>
                        )}
                    </div>
                ) : (
                    <button onClick={() => setShowLogin(true)}>Sign In</button>
                )}
            </div>
        </div>
    );
};

export default Navbar;
