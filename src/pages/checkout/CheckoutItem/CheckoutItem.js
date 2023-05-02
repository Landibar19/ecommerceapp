import React from 'react'
import CheckoutDetails from '../CheckoutDetails/CheckoutDetails'
import { useSelector } from 'react-redux'
import { selectTotalAmount } from '../../../redux/slice/cartSlice'
import './Styles.scss';

const CheckoutItem = () => {
  const totalAmount = useSelector(selectTotalAmount)
  
  return (
    <div className='checkout'>
      {totalAmount ? (<div className='checkout_item'>
        <div className='checkout_subtotal'>
          <h5>Subtotal: </h5>
          <h5>{totalAmount} $</h5>
        </div>
      <div className='checkout_shipping'>
          <h5>Shipping:</h5>
          <h5>25 $</h5>
        </div>
      <div className='checkout_total_amount'>
            <h5>Total:</h5>
            <h5> {parseFloat(25 + totalAmount)} $</h5>
      </div>
      </div>): (
        <div className='checkout_item'>
        <div className='checkout_subtotal'>
          <h5>Subtotal: </h5>
          <h5>0 $</h5>
        </div>
      <div className='checkout_shipping'>
          <h5>Shipping:</h5>
          <h5>0 $</h5>
        </div>
      <div className='checkout_total_amount'>
            <h5>Total:</h5>
            <h5> {parseFloat(0)} $</h5>
      </div>
      </div>
      )}
        <CheckoutDetails/>
      </div>
  
    
  
  )
}

export default CheckoutItem
