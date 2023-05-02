import React, { useState } from 'react';
import "./Styles.scss";
import {getAuth, signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { useNavigate } from 'react-router-dom';
import { GoogleAuthProvider } from "firebase/auth";
import { auth } from '../../../firebase/config';

const Login = () => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const[isLoading, setIsloading] = useState(false);
  const navigate = useNavigate()

  const loginUser = (e) => {
    e.preventDefault()
    setIsloading(true)

    signInWithEmailAndPassword(getAuth(), email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log(user)
        setIsloading(false)
        alert ('Login successful...')
        navigate("/")
      })
      .catch((error) => {
        alert(error.message)
        setIsloading(false)
      });
  }

  

const provider = new GoogleAuthProvider();
const signInWithGoogle = () => {

signInWithPopup(auth, provider)
  .then((result) => {
    const user = result.user;
    alert("login succesfull")
    navigate("/")
   
  }).catch((error) => {
  alert(error.message)
  });
  }

  
  return (
    <section className='login'>
   
      <form className='login_form' onSubmit={loginUser}>
        <h2>Login</h2>
        <div className='login_data'>
          <input 
          type="email" 
          placeholder='Email' 
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          />
          <input
          type='password' 
          placeholder='Enter password'
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          />
          <button type='submit' className='login_button'>Login</button>
          <a href='/reset' >Forgot password?</a> 
          <div className='login_none'>
            <h5> ---or---</h5>
            <button className='login_google' onClick={signInWithGoogle}>Login with Google</button>
            <h5>Dont have an account?</h5>
            <a href='/register' >Register</a>
          </div>
        </div>
      </form>
     
    </section>
  )
}

export default Login
