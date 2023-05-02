import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    cartItems:localStorage.getItem('cartItems')
    ? JSON.parse(localStorage.getItem('cartItems'))
    : [],
    cartToggle: false,
}

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    ADD_TO_CART (state, action){
      const cartItemIndex = state.cartItems.findIndex(
        (item) => item.id === action.payload.id);

      if(cartItemIndex >= 0) {
          state.cartItems[cartItemIndex].quantity += 1;
          
      }

      else {
          const tempProduct = {...action.payload, quantity:1};
          state.cartItems.push(tempProduct);
          
        
      }
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },
    TOGGLE_CART(state, action){
      state.cartToggle = action.payload.cartToggle
    },
    INCREASE_QUANTITY(state, action) {

      const itemIndex= state.cartItems.findIndex(
      (item) => item.id === action.payload.id)
      state.cartItems[itemIndex].quantity += 1;
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },
    DECREASE_QUANTITY(state, action) {
      const itemIndex= state.cartItems.findIndex(
      (item) => item.id === action.payload.id) 

      if( state.cartItems[itemIndex].quantity > 1){
        state.cartItems[itemIndex].quantity -= 1;

      }
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    }, 
    CLEAR_CART(state){
      state.cartItems = []
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },

    REMOVE_ITEM_FROM_CART(state, action){
      const ItemInCart = state.cartItems.filter(item=> 
      item.id !==action.payload.id)
      state.cartItems = ItemInCart
    }, 
    TOTAL_AMOUNT_IN_CART(state){
      let {totalPrice, totalQuantity} = state.cartItems.reduce((cartTotal,item) => {
        const {price,quantity} = item
        const totalItem = price * quantity

        cartTotal.totalPrice += totalItem
        cartTotal.totalQuantity += quantity
        return cartTotal
      },{
        totalPrice:0,
        totalQuantity:0
      })
      state.totalQuantity = totalQuantity;
      state.totalAmount = totalPrice;
    }
  }
    
});

export const {
  ADD_TO_CART, 
  TOGGLE_CART,
  INCREASE_QUANTITY,
  DECREASE_QUANTITY,
  CLEAR_CART,
  REMOVE_ITEM_FROM_CART,
  TOTAL_AMOUNT_IN_CART,
  } = cartSlice.actions

export const selectCartItems = (state) => state.cart.cartItems
export const selectCartToggle = (state) => state.cart.cartToggle
export const selectTotalQuantity = (state) => state.cart.totalQuantity
export const selectTotalAmount = (state) => state.cart.totalAmount



export default cartSlice.reducer;


