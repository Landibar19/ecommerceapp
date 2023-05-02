import React from 'react'
import { useState } from 'react';
import './Styles.scss'
import instance from '../../instance';

const Contact = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("")
  const [message, setMessage] = useState("")
 

  const Data = {
          name:name,
          email:email,
          message:message
  }
  const handleSubmit = async  (e)=> {
    e.preventDefault()
   await instance.post('/contacts.json',Data).then(response => {
      console.log(response)
    })
    .catch((error) => {
        alert(error.message)
    }) 
    setName("")
    setEmail("")
    setMessage("") 
    
  }

 
  return (

    <form onSubmit={handleSubmit}> 
        <h1> Contact us</h1>
        <input type="text" 
        value={name}
        placeholder="Enter your name"
        onChange={(e) => setName(e.target.value)}
        />
        <input 
        type="email"
        value={email}
        placeholder="Enter your email"
        onChange={(e) => setEmail(e.target.value)}
        />
       
        <textarea
        cols="50"
        rows="10" 
        value={message}
        placeholder="Type your message here..."
        onChange={(e) => setMessage(e.target.value)}/>
        <button type='submit'>Send</button>
    </form>
   
   
  )
}

export default Contact;
