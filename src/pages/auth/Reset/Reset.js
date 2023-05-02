import React from 'react';
import "./Styles.scss";

import { Link } from 'react-router-dom';

import Card from '../../../components/Card/Card';

const Reset = () => {
  return (
    <section className='reset'>
    <Card>
    <form className='reset_form'>
      <h2>Reset Password</h2>
      <div className='reset_data'>
        <input type="email" placeholder='Email' required />
        
        <button className='reset_button'>Reset Password</button>
        <div className='reset_none'>
          <h5><Link to='/login'>Login</Link></h5>
          <h5><Link to='/register'>Register</Link></h5>
          
        </div>
      </div>
    </form>
    </Card>
  </section>
  )
}

export default Reset
