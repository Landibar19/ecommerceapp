import React, { useEffect, useState } from "react";
import {
  PaymentElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";

import Card from "../Card/Card"



import { useDispatch, useSelector } from "react-redux";
import { selectEmail, selectUserID } from "../../redux/slice/authSlice";
import {
  CLEAR_CART,
  selectCartItems,
  selectTotalAmount,
} from "../../redux/slice/cartSlice";
import { selectShippingAddress } from "../../redux/slice/CheckoutSlice";
import { addDoc, collection, Timestamp } from "firebase/firestore";
import { db } from "../../firebase/config";
import { useNavigate } from "react-router-dom";
import CheckoutSummary from "../CheckoutSummary/CheckoutSummary";

const CheckoutForm = () => {
  const [message, setMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const stripe = useStripe();
  const elements = useElements();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userID = useSelector(selectUserID);
  const userEmail = useSelector(selectEmail);
  const cartItems = useSelector(selectCartItems);
  const cartTotalAmount = useSelector(selectTotalAmount);
  const shippingAddress = useSelector(selectShippingAddress);

  useEffect(() => {
    if (!stripe) {
      return;
    }

    const clientSecret = new URLSearchParams(window.location.search).get(
      "payment_intent_client_secret"
    );

    if (!clientSecret) {
      return;
    }
  }, [stripe]);

  // Save order to Order History
  const saveOrder = () => {
    const today = new Date();
    const date = today.toDateString();
    const time = today.toLocaleTimeString();
    const orderConfig = {
      userID,
      userEmail,
      orderDate: date,
      orderTime: time,
      orderAmount: cartTotalAmount,
      orderStatus: "Order Placed...",
      cartItems,
      shippingAddress,
      createdAt: Timestamp.now().toDate(),
    };
    try {
      addDoc(collection(db, "orders"), orderConfig);
      dispatch(CLEAR_CART());
    
      navigate("/checkout-success");
    } catch (error) {
     
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(null);

    if (!stripe || !elements) {
      return;
    }

    setIsLoading(true);

    const confirmPayment = await stripe
      .confirmPayment({
        elements,
        confirmParams: {
          // Make sure to change this to your payment completion page
          return_url: "http://localhost:3000/checkout-success",
        },
        redirect: "if_required",
      })
      .then((result) => {
        // ok - paymentIntent // bad - error
        if (result.error) {
      
          setMessage(result.error.message);
          return;
        }
        if (result.paymentIntent) {
          if (result.paymentIntent.status === "succeeded") {
            setIsLoading(false);
          
            saveOrder();
          }
        }
      });

    setIsLoading(false);
  };

  return (
    <section>
      <div className='container'>
        <h2>Checkout</h2>
        <form onSubmit={handleSubmit}>
          <div>
           <CheckoutSummary/>
          </div>
          <div>
            <Card>
              <h3>Stripe Checkout</h3>
              <PaymentElement />
              <button
                disabled={isLoading || !stripe || !elements}
                id="submit"
                className=''
              >
                <span id="button-text">
                  {isLoading ? (
                    <img
                      src=''
                      alt="Loading..."
                      style={{ width: "20px" }}
                    />
                  ) : (
                    "Pay now"
                  )}
                </span>
              </button>
              {/* Show any error or success messages */}
              {message && <div >{message}</div>}
            </Card>
          </div>
        </form>
      </div>
    </section>
  );
};

export default CheckoutForm;