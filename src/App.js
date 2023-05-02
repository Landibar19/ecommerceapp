
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import React from 'react';
import {Header, Footer} from './components';
import  {Home,Contact, Register, Login, Reset,Store, Cart,CheckoutItem } from './pages';


function App() {


  return (
    <div className="App">
      <BrowserRouter>
      <Header/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/reset" element={<Reset />} />
        <Route path="/store" element={<Store />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/contacts" element={<Contact/>} />
        <Route path="/checkout" element={<CheckoutItem/>} />

  
      </Routes>
      <Footer/>
      </BrowserRouter>
     
    </div>
  );
}

export default App;
