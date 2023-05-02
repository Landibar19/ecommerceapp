import React, { useEffect} from 'react';
import './Styles.scss';


import { useDispatch } from 'react-redux';
import { STORE_PRODUCTS } from '../../../redux/slice/ProductSlice';
import { ADD_TO_CART, TOGGLE_CART} from '../../../redux/slice/cartSlice';

import { productData } from '../data';
const ProductDetail = ({product}) => {
  

  const dispatch = useDispatch()


  const data = productData


  
  const addToCart = (item) => {
    dispatch(ADD_TO_CART( item))
    dispatch(TOGGLE_CART({
      cartToggle: true
    }))
   
  
  }
  
  useEffect(()=> {
    dispatch(STORE_PRODUCTS({
    products: data
    }))
     },[dispatch,data])

  return (
    <div className='product'>
      
       <div className='product_all'>
      {product.map((item) => (
        <div  key={item.id}
             className='product_details'>
          <img src={item?.image} alt=''/>
          <div className='product_data'>
            <span className='product_price'>{item?.price}$</span>
            <p>{item?.name}</p>
          </div>
          <div className='product_cart'>
            <button onClick={() => addToCart(item)}>Add to cart</button>
          </div>
        </div>
       ))}
      </div> 
    </div>
  )
}

export default ProductDetail
