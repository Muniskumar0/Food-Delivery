import React, { useEffect, useState } from 'react';
import "./LoginPopUp.css";
import { assets } from '../../assets/frontend_assets/assets';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const LoginPopUp = ({ setShowLogin, setIsLoggedIn }) => {
    const [currentState, setCurrentState] = useState("Login");
    const [loading, setLoading] = useState(false);
    const [registerValues, setRegisterValues] = useState({ username: "", email: "", password: "" });
    const [loginUser, setLoginUser] = useState({ username: "", password: "" });

    useEffect(() => {
        document.body.style.overflow = 'hidden'; 
        return () => { document.body.style.overflow = 'auto'; }; 
    }, []);
      

    const handleInputChange = (e, type) => {
        const { name, value } = e.target;
        if (type === "register") {
            setRegisterValues(prev => ({ ...prev, [name]: value }));
        } else {
            setLoginUser(prev => ({ ...prev, [name]: value }));
        }
    };

    // Username validation (only allows letters, no numbers)
    const validateUsername = (username) => {
        const usernameRegex = /^[a-zA-Z]{3,15}$/; // Only allows letters (3 to 15 characters)
        return usernameRegex.test(username);
    };

    // Password validation (length, and includes at least one number, one lowercase, and one uppercase)
    const validatePassword = (password) => {
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d@$!%*?&]{8,}$/;
        return passwordRegex.test(password);
    };

    // Email validation (using regex)
    const validateEmail = (email) => {
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return emailRegex.test(email);
    };

    const userRegister = async (e) => {
        e.preventDefault();

        // Validate username, email, and password
        if (!registerValues.username || !registerValues.email || !registerValues.password) {
            toast.error("Please fill in all fields!");
            return;
        }

        if (!validateUsername(registerValues.username)) {
            toast.error("Username must be between 3-15 characters and only contain letters (no numbers or special characters).");
            return;
        }

        if (!validateEmail(registerValues.email)) {
            toast.error("Please enter a valid email address.");
            return;
        }

        if (!validatePassword(registerValues.password)) {
            toast.error("Password must be at least 8 characters long and include at least one uppercase letter, one lowercase letter, and one number.");
            return;
        }

        setLoading(true);
        try {
            const response = await fetch("http://127.0.0.1:8000/users/", {  
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(registerValues),
            });

            if (!response.ok) {
                throw new Error("Registration failed");
            }

            toast.success("User registered successfully!");
            setCurrentState("Login");
        } catch (error) {
            toast.error("User registration failed!");
        } finally {
            setLoading(false);
        }
    };

    const userLogin = async (e) => {
        e.preventDefault();
        if (!loginUser.username || !loginUser.password) {
            toast.error("Please enter both username and password!");
            return;
        }

        if (!validateUsername(loginUser.username)) {
            toast.error("Invalid username. It must be between 3-15 characters and only contain letters.");
            return;
        }

        if (!validatePassword(loginUser.password)) {
            toast.error("Invalid password. It must be at least 8 characters long, containing at least one uppercase letter, one lowercase letter, and one number.");
            return;
        }

        setLoading(true);
        try {
            const response = await fetch("http://127.0.0.1:8000/users/");
            const data = await response.json();

            const userDetails = data.find(
                item => item.username === loginUser.username && item.password === loginUser.password
            );

            if (userDetails) {
                toast.success("Successfully logged in!");
                setIsLoggedIn(true);
                localStorage.setItem("username", userDetails.username);
                setTimeout(() => {
                    setShowLogin(false);
                }, 2000);
            } else {
                toast.error("Invalid username or password!");
            }
        } catch (error) {
            toast.error("Login failed!");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="login-popup-overlay"> {/* Background Overlay */}
            <div className='login-popup'>
                <form className='login-popup-container' onSubmit={currentState === "Sign Up" ? userRegister : userLogin}>
                    <div className="login-popup-title">
                        <h2>{currentState}</h2>
                        <img onClick={() => setShowLogin(false)} src={assets.cross_icon} alt="Close" />
                    </div>

                    <div className="login-popup-inputs">
                        {currentState === "Login" ? (
                            <>
                                <input type="text" name="username" placeholder='Enter your username' value={loginUser.username} required onChange={(e) => handleInputChange(e, "login")} />
                                <input type="password" name="password" placeholder='Enter your password' value={loginUser.password} required onChange={(e) => handleInputChange(e, "login")} />
                            </>
                        ) : (
                            <>
                                <input type="text" name="username" placeholder='Your username' value={registerValues.username} required onChange={(e) => handleInputChange(e, "register")} />
                                <input type="email" name="email" placeholder='Enter your email' value={registerValues.email} required onChange={(e) => handleInputChange(e, "register")} />
                                <input type="password" name="password" placeholder='Enter your password' value={registerValues.password} required onChange={(e) => handleInputChange(e, "register")} />
                            </>
                        )}
                    </div>

                    <button className='log-btn' type="submit" disabled={loading}>
                        {loading ? "Processing..." : (currentState === 'Sign Up' ? "Create your account" : "Login")}
                    </button>

                    <div className="login-popup-condition">
                        <input type="checkbox" required />
                        <p>By continuing, I agree to the terms of use & privacy policy</p>
                    </div>

                    {currentState === "Login" ? (
                        <p>Create a new account? <span onClick={() => setCurrentState("Sign Up")}>Click here</span></p>
                    ) : (
                        <p>Already have an account? <span onClick={() => setCurrentState("Login")}>Login here</span></p>
                    )}
                </form>

                <ToastContainer />
            </div>
        </div>
    );
};

export default LoginPopUp;
