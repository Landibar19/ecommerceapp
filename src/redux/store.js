import {configureStore, combineReducers} from "@reduxjs/toolkit";
import authReducer from "./slice/authSlice";
import productReducer from "./slice/ProductSlice"
import filterReducer from "./slice/filterSlice";
import cartReducer from './slice/cartSlice';
import checkoutREducer from './slice/CheckoutSlice'


const rootReducer = combineReducers({
    auth: authReducer,
    product: productReducer,
    filter:filterReducer,
    cart: cartReducer,
    checkout:checkoutREducer
});

const store = configureStore({
    reducer:rootReducer, 


})

export default store;