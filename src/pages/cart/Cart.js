import React, { useEffect } from 'react';
import "./Styles.scss";

import {AiOutlineCloseCircle} from 'react-icons/ai';
import {BiPlus,BiMinus} from 'react-icons/bi';
import {IoIosRemoveCircle} from 'react-icons/io';

import { DECREASE_QUANTITY, INCREASE_QUANTITY, 
       selectCartItems,CLEAR_CART, REMOVE_ITEM_FROM_CART, 
       TOTAL_AMOUNT_IN_CART, selectTotalAmount } 
       from '../../redux/slice/cartSlice';

import {useDispatch, useSelector} from "react-redux";
import { ShowonLogin } from '../../components/ShowHideLinks/ShowHideLinks';
import { Link } from 'react-router-dom';



const Cart = () => {

 const cartItems = useSelector(selectCartItems)
 const totalAmount = useSelector(selectTotalAmount)

 const dispatch = useDispatch()


 useEffect(()=> {
  dispatch(TOTAL_AMOUNT_IN_CART())
 },[cartItems,dispatch])

 return (
    <section>
      <div className='cart'>
        <div className='cart_header'>
            <div className='cart_clear' onClick={() => dispatch(CLEAR_CART())}>
             <AiOutlineCloseCircle/>Clear</div>
        </div>  
        <div className='cart_body'>
        {cartItems.map((item,idx) => (
          <div key={idx} className='cart_body_item'>
             <div>
              <img src={item.image}  alt=''/>
              <span> Price ${parseFloat(item.price * item.quantity)}</span>
            </div> 
            <div className='cart_item_name'>
              <p>{item.name}</p>
            </div>
            <div className='cart_item_quantity'>
             <BiMinus className='minus' onClick={ () =>dispatch(DECREASE_QUANTITY(item))} />
             <p>{item.quantity}</p>
             <BiPlus  className='plus' onClick={ () =>dispatch(INCREASE_QUANTITY(item))}/>
            </div>
            <div className='cart_item_remove' onClick={() => dispatch(REMOVE_ITEM_FROM_CART(item))}>
            <IoIosRemoveCircle className='cart_item_icon'/>
            </div>
          </div>
        ))} 
        </div> 
        <div className='cart_line'></div>
        <div className='cart_shipping'>
          <div className='cart_shipping_amount'>
          <p>Shipping</p>
          <p>$5</p>
          </div>
        </div>
        <div className='cart_line'></div>
        <div className='cart_total'>
          <div className='cart_total_amount'>
            <p>Total</p>
            <p>$ {parseFloat(5 + totalAmount)} </p>
          </div>
          
        </div>
        <div className='cart_line'></div>
        <ShowonLogin>
          <div className="cart_checkout">
            <Link to='/checkout'>
            <button >Go to checkout</button>
            </Link>
            
          </div>
        </ShowonLogin>   
      </div>
    </section>
    
    
  )
}

export default Cart;
