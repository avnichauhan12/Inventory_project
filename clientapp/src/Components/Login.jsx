import React from 'react'

import  { useState } from 'react'
import './Signup.css';
import Axios from 'axios';
import { Link, useNavigate } from "react-router-dom";
const Login = () => {
    const[email,setEmail]=useState('')
    const[password,setPassword]=useState('')
    const navigate = useNavigate()
    Axios.defaults.withCredentials=true;
    const handleSubmit=(e)=>{
        e.preventDefault();
        Axios.post('http://127.0.0.1:3002/auth/login',{
            email,
            password}).then(response=>{
                console.log(response)
                if(response.data.status){
                    navigate('/')
                }
            }).catch(err=>{
                console.log(err);
            })

    }

    return (
        <div className='sign-up-container'>
        <form className='signup-form' onSubmit={handleSubmit}>
            <h2>LogIn</h2>

            <label htmlFor='email'>Email:</label>
            <input type='email' autoComplete='off' placeholder='Email'
                onChange={(e)=> setEmail(e.target.value)}
            />

            <label htmlFor='password'>password</label>
            <input type="password" placeholder='*********'
                onChange={(e)=> setPassword(e.target.value)}/>

            <button type='submit'>Login</button>
            <Link to="/forgotPassword">Forgot Password?</Link>
            <p> Don't have account?<Link to="/signup">Sign Up</Link></p>
        </form>
            
        </div>
        
    )
}


export default Login
