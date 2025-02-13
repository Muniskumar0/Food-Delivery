import React, { useState } from 'react';
import "./LoginPopUp.css";
import { assets } from '../../assets/frontend_assets/assets';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const LoginPopUp = ({ setShowLogin, setIsLoggedIn }) => {
    const [currentState, setCurrentState] = useState("Login");
    const [loading, setLoading] = useState(false);

    const [registerValues, setRegisterValues] = useState({
        username: "",
        email: "",
        password: ""
    });

    const [loginUser, setLoginUser] = useState({
        username: "",
        password: ""
    });


    const handleInputChange = (e, type) => {
        const { name, value } = e.target;
        if (type === "register") {
            setRegisterValues(prev => ({ ...prev, [name]: value }));
        } else {
            setLoginUser(prev => ({ ...prev, [name]: value }));
        }
    };

    const userRegister = async (e) => {
        e.preventDefault();
        if (!registerValues.username || !registerValues.email || !registerValues.password) {
            toast.error("Please fill in all fields!");
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
            console.error("Error:", error);
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
            console.error("Error fetching data", error);
            toast.error("Login failed!");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className='login-popup'>
            <form className='login-popup-container' onSubmit={currentState === "Sign Up" ? userRegister : userLogin}>
                <div className="login-popup-title">
                    <h2>{currentState}</h2>
                    <img onClick={() => setShowLogin(false)} src={assets.cross_icon} alt="Close" />
                </div>

                <div className="login-popup-inputs">
                    {currentState === "Login" ? (
                        <>
                            <input 
                                type="text" 
                                name="username"
                                placeholder='Enter your username' 
                                value={loginUser.username} 
                                required 
                                onChange={(e) => handleInputChange(e, "login")}
                            />
                            <input 
                                type="password" 
                                name="password"
                                placeholder='Enter your password' 
                                value={loginUser.password} 
                                required 
                                onChange={(e) => handleInputChange(e, "login")}
                            />
                        </>
                    ) : (
                        <>
                            <input 
                                type="text" 
                                name="username"
                                placeholder='Your username' 
                                value={registerValues.username} 
                                required 
                                onChange={(e) => handleInputChange(e, "register")}
                            />
                            <input 
                                type="email" 
                                name="email"
                                placeholder='Enter your email' 
                                value={registerValues.email} 
                                required 
                                onChange={(e) => handleInputChange(e, "register")}
                            />
                            <input 
                                type="password" 
                                name="password"
                                placeholder='Enter your password' 
                                value={registerValues.password} 
                                required 
                                onChange={(e) => handleInputChange(e, "register")}
                            />
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
    );
}

export default LoginPopUp;
