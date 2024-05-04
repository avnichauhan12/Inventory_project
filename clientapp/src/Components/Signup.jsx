import React, { useState } from 'react'
import './Signup.css';
import Axios from 'axios';
import { Link, useNavigate } from "react-router-dom";
const Signup = () => {
    const[username,setUsername]=useState('')
    const[email,setEmail]=useState('')
    const[password,setPassword]=useState('')
    const navigate = useNavigate()
    const handleSubmit=(e)=>{
        e.preventDefault();
        Axios.post('http://127.0.0.1:3002/auth/signup',{
            username,
            email,
            password}).then(response=>{
                console.log(response)
                if(response.data.status){
                    navigate('/login')
                }
            }).catch(err=>{
                console.log(err);
            })

    }

    return (
        <div className='sign-up-container'>
        <form className='signup-form' onSubmit={handleSubmit}>
            <h2>Sign Up</h2>
            <label htmlFor='username'>Username:</label>
            <input type="text" placeholder='Username' 
                onChange={(e)=> setUsername(e.target.value)}/>

            <label htmlFor='email'>Email:</label>
            <input type='email' autoComplete='off' placeholder='Email'
                onChange={(e)=> setEmail(e.target.value)}
            />

            <label htmlFor='password'>password</label>
            <input type="password" placeholder='*********'
                onChange={(e)=> setPassword(e.target.value)}
            />

            <button type='submit'>Sign Up</button><br></br>
            <p> Have an account?<Link to="/login">Login</Link></p>
        </form>
            
        </div>
        
    )
}

export default Signup
