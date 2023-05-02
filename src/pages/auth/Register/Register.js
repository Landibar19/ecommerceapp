import React, { useState } from 'react';
import "./Styles.scss";

import Card from '../../../components/Card/Card';

import {createUserWithEmailAndPassword} from "firebase/auth";
import {auth} from "../../../firebase/config"
import { useNavigate } from 'react-router-dom';


const Register = () => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const[isLoading, setIsloading] = useState(false);

  const navigate = useNavigate()
  
  const registerUser = (e) => {
    e.preventDefault()
    if (password !== confirmPassword) {
      alert("Passwords do not match!!")
    }
    setIsloading(true)
    createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
 
    const user = userCredential.user;
    console.log(user)
    setIsloading(false)
    alert('Registration successful..')
    navigate("/login")
  })
  .catch((error) => {
    alert(error.message)
    setIsloading(false)
  });
  }


  return (
    <section className='register'>
    <Card>
    <form className='register_form' onSubmit={registerUser}>
      <h2>Register</h2>
      <div className='register_data'>
        <input
        type="email"
        placeholder='Email'
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        />
        <input 
        type='password' 
        placeholder='Enter Password'
        required
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        />
        <input 
        type='password' 
        placeholder='Confirm Password'
        required
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        />
        <button  type='submit' className='register_button'>Register</button>
        <div className='register_none'>
          <h5>Already have an account?</h5>
          <a href='/login' >Login</a>
        </div>
      </div>
    </form>
    </Card>
  </section>
  )
}

export default Register
