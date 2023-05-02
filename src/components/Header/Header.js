
import React, { useEffect, useState } from 'react'

import './Styles.scss'

import {BiMenuAltRight} from 'react-icons/bi';
import {AiOutlineCloseCircle} from 'react-icons/ai';
import {MdShoppingCart} from 'react-icons/md';

import {Link, useNavigate} from 'react-router-dom'

import logo from '../../assets/img/logo1.svg';

import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from '../../firebase/config';
import { useDispatch, useSelector } from 'react-redux';
import { REMOVE_ACTIVE_USER, SET_ACTIVE_USER } from '../../redux/slice/authSlice';
import { ShowonLogin, ShowonLogout } from '../ShowHideLinks/ShowHideLinks';
import { TOGGLE_CART, selectCartToggle } from '../../redux/slice/cartSlice';
import Cart from '../../pages/cart/Cart';
import { CartToggle} from '../../pages/cart/ShowHideCart/CartToggle';


const Header = () => {
  const cartToggle = useSelector(selectCartToggle)
  const [showMenu, setShowMenu ] = useState(false);
  const [userName, setUserName ] = useState("");
   
  const menuToggle = () => setShowMenu(!showMenu)

  const navigate = useNavigate() 
  const dispatch = useDispatch()

  const logoutUser = () => {
    signOut(auth).then(() => {
    alert("signout succesfull...")
    navigate("/")
    }).catch((error) => {
    alert(error.message)
    });
  }
const ShowCart = () => {
    dispatch(TOGGLE_CART({
      cartToggle: !cartToggle
    }))
}

  useEffect (() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const uid = user.uid;
        setUserName(user.displayName)

        dispatch(SET_ACTIVE_USER({
          email: user.email,
          userName: user.userName,
          userID: uid
        }))
      } else {
       setUserName("")
       dispatch(REMOVE_ACTIVE_USER())
      }
    });
  },[dispatch, userName])

  return (

    <div className='header'>
      <div className='header_content'>
        <div className='header_logo' onClick={(()=> setShowMenu(false))}>
          <Link to="/">
          <img src={logo} alt=''/>
          <span>Mobile Shop </span>
          </Link>
        </div>
        <div>
          <nav className={`${`nav`} ${showMenu ? [`nav--open`]: {}}`}>
            <a className='nav_item' href="/">Home</a>
            <a className='nav_item' href="/store">Store</a>
            <a className='nav_item' href="/contact">Contact</a>
            <span className='nav_auth'>
              <ShowonLogout>
              <a className='nav_item' href="/login">Login</a>  
              </ShowonLogout>
              <ShowonLogout>
                 <ShowonLogin>
              <a className='nav_item' href="/Register">Register</a>  
              </ShowonLogin>
              </ShowonLogout>
            </span>
            </nav>
        </div>
        <div className='cart_item'>
          <ShowonLogin>
            <span className='nav_orders'><Link to="/order-history">My Orders</Link></span>
          </ShowonLogin>
          <ShowonLogin>
            <span className='nav_logout'><Link to="/" 
             onClick={logoutUser}>Logout</Link></span>
          </ShowonLogin>
          <span className='nav_cart'>
             <Link  onClick={ShowCart}>
              Cart
              <MdShoppingCart className='nav_cart_icon'/>
              <p>0</p>
             </Link>
            </span>
        </div>
        <div>
          <a href='#'> Hi! {userName}</a>
          <button className='header_toggler' onClick={menuToggle}>
            {!showMenu ? <BiMenuAltRight/> : <AiOutlineCloseCircle />}
          </button>
          
        </div>
      </div>
      <CartToggle>
        <Cart /> 
      </CartToggle>  
    </div>
  )
}




export default Header;
