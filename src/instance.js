import axios from 'axios';

export default axios.create({
    baseURL: 'https://ecommerceapp-4ff01-default-rtdb.firebaseio.com/'
})