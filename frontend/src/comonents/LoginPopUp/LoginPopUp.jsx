import React, { useState } from 'react';
import "./LoginPopUp.css";
import { assets } from '../../assets/frontend_assets/assets';





const LoginPopUp = ({ setShowLogin }) => {
    const [currentState, setCurrentState] = useState("Login");
    const [registerValues, setRegisterValues] = useState({
        id: 0,
        username: "",
        email: "",
        password: ""

    });
    const [loginUser, setLoginUser] = useState({
        username: "",
        password: ""
    });




    function userResister(e) {
        e.preventDefault();
        

        fetch("http://127.0.0.1:8000/users/", {  
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(registerValues),
        })
            .then((response) => {
                if (!response.ok) {
                    return response.json().then(err => { throw new Error(JSON.stringify(err)) });
                }
                return response.json();
            })
            .then((data) => {

                console.log("User registered:", data);
                alert("User registered successfully!");
                setCurrentState("Login")
            })
            .catch((error) =>{
                 console.error("Error:", error);
                 alert("User not registered")
                });
    }


    function userLogin(e) {
        e.preventDefault();
        fetch("http://127.0.0.1:8000/users/")
 
            .then((res) => res.json())
            .then((data) => {
                let details = data.find((item) => item.username === loginUser.username && item.password === loginUser.password)
                if (details) {
                    alert("Successfully logged in");
                    
                } else {
                    alert("Invalid username or password");
                }

            })
            .catch((error) => console.error("Error fetching data", error));
    }

    return (
        <div className='login-popup'>

            <form className='login-popup-container'>
                <div className="login-popup-title">
                    <h2>{currentState}</h2>
                    <img onClick={() => setShowLogin(false)} src={assets.cross_icon} alt="" />
                </div>
                <div className="login-popup-inputs">
                    {currentState === "Login" ? (
                        <>
                            <input type="text" placeholder='Enter your name' value={loginUser.username} required onChange={(e) => setLoginUser({ ...loginUser, username: e.target.value })} />
                            <input type="password" placeholder='Enter your password' value={loginUser.password} required onChange={(e) => setLoginUser({ ...loginUser, password: e.target.value })} />
                        </>
                    ) : (
                        <>
                            <input type="text" placeholder='Your name' value={registerValues.username} required onChange={(e) => setRegisterValues({ ...registerValues, username: e.target.value })} />
                            <input type="email" placeholder='Enter your email' value={registerValues.email} required onChange={(e) => setRegisterValues({ ...registerValues, email: e.target.value })} />
                            <input type="password" placeholder='Enter your password' value={registerValues.password} required onChange={(e) => setRegisterValues({ ...registerValues, password: e.target.value })} />
                        </>
                    )}
                </div>
                <button className='log-btn' onClick={currentState === "Sign Up" ? userResister : userLogin}>
                    {currentState === 'Sign Up' ? "Create your account" : "Login"}
                </button>
                <div className="login-popup-condition">
                    <input type="checkbox" required />
                    <p>By continuing, I agree to the terms of use & privacy policy</p>
                </div>
                {currentState === "Login"
                    ? <p>Create a new account? <span onClick={() => setCurrentState("Sign Up")}>Click here</span></p>
                    : <p>Already have an account? <span onClick={() => setCurrentState("Login")}>Login here</span></p>
                }
            </form>
        </div>
    );
}

export default LoginPopUp;
