import React, { useContext, useState, useEffect } from "react";
import './Navbar.css';
import { Link } from "react-router-dom";
import { StoreContext } from "../../context/StoreContext";
import { BsCartCheckFill } from "react-icons/bs";
import { IoSearch } from "react-icons/io5";
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import Logout from '@mui/icons-material/Logout';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

const AccountMenu = ({ username, handleLogout }) => {
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <React.Fragment>
            <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
                <Tooltip title="Account settings">
                    <IconButton
                        onClick={handleClick}
                        size="small"
                        sx={{ ml: 2 }}
                        aria-controls={open ? 'account-menu' : undefined}
                        aria-haspopup="true"
                        aria-expanded={open ? 'true' : undefined}
                    >
                        <Avatar sx={{ width: 32, height: 32 }}>
                            {username.charAt(0)}
                        </Avatar>
                    </IconButton>
                </Tooltip>
            </Box>
            <Menu
                anchorEl={anchorEl}
                id="account-menu"
                open={open}
                onClose={handleClose}
                onClick={handleClose}
                slotProps={{
                    paper: {
                        elevation: 0,
                        sx: {
                            overflow: 'visible',
                            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                            mt: 1.5,
                            '& .MuiAvatar-root': {
                                width: 32,
                                height: 32,
                                ml: -0.5,
                                mr: 1,
                            },
                            '&::before': {
                                content: '""',
                                display: 'block',
                                position: 'absolute',
                                top: 0,
                                right: 14,
                                width: 10,
                                height: 10,
                                bgcolor: 'background.paper',
                                transform: 'translateY(-50%) rotate(45deg)',
                                zIndex: 0,
                            },
                        },
                    },
                }}
                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
            >
                <MenuItem onClick={handleClose}>
                    <Avatar /> My account
                </MenuItem>
                <Divider />
                <MenuItem onClick={handleClose}>
                    <ListItemIcon>
                        <ShoppingCartIcon /> 
                    </ListItemIcon>
                    <Link to="/delivery-status" className="navbar-link"> 
                        Delivery Status
                    </Link>
                </MenuItem>

                <MenuItem onClick={() => { handleLogout(); handleClose(); }}>
                    <ListItemIcon>
                        <Logout fontSize="small" />
                    </ListItemIcon>
                    Logout
                </MenuItem>
            </Menu>
        </React.Fragment>
    );
};

const Navbar = ({ setShowLogin, isLoggedIn, setIsLoggedIn }) => {
    const [menu, setMenu] = useState("home");
    const { cartItem } = useContext(StoreContext);
    const totalItems = Object.values(cartItem).reduce((acc, qty) => acc + qty, 0);

    const [username, setUsername] = useState("");

    useEffect(() => {
        const storedIsLoggedIn = localStorage.getItem("isLoggedIn");
        const storedUsername = localStorage.getItem("username");

        if (storedIsLoggedIn === "true" && storedUsername) {
            setIsLoggedIn(true);
            setUsername(storedUsername);
        } else {
            setIsLoggedIn(false);
            setUsername("");
        }
    }, [setIsLoggedIn]);

    const handleLogout = () => {
        setIsLoggedIn(false);
        localStorage.removeItem("username");
        localStorage.removeItem("isLoggedIn");
        setUsername("");
    };

    return (
        <div className="navbar">
            <h1 className="logo"><Link to="/"> MAVY. </Link></h1>
            <ul className="navbar-menu">
                <Link to={'/'} onClick={() => setMenu("home")} className={menu === "home" ? "active" : ""}>Home</Link>
                <Link to={'/menu'} onClick={() => setMenu("menu")} className={menu === "menu" ? "active" : ""}>Menu</Link>
                <Link to={'/about'} onClick={() => setMenu("about")} className={menu === "about" ? "active" : ""}>About</Link>
                <Link to={'/contact'} onClick={() => setMenu("contact")} className={menu === "contact" ? "active" : ""}>Contact</Link>
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
                    <AccountMenu username={username} handleLogout={handleLogout} />
                ) : (
                    <button onClick={() => setShowLogin(true)}>Sign In</button>
                )}
            </div>
        </div>
    );
};

export default Navbar;