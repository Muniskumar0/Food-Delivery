import React,{useEffect, useState} from 'react'
import './Login.css'

function Login(setShowLogin) {
    const [currState,setCurrState]=useState("Login")
    const [data,setData]=useState({
        name:"",
        email:"",
        password:""
    })

    const onChangeHandler = (event)=>{
        const name = event.target.name;
        const value = event.target.value;
        setData(data=>({...data,[name]:value}))
    }


  return (
    <div>Login</div>
  )
}

export default Login