import React  from 'react';
import  './Styles.scss';
import ProductDetail from '../ProductDetail/ProductDetail';
import { useDispatch, useSelector } from 'react-redux';
import {selectProducts } from '../../../redux/slice/ProductSlice';
import { FILTER_BY_CATEGORY, selectFilteredProducts } from '../../../redux/slice/filterSlice';


const ProductList = () => {

  const products = useSelector(selectProducts)
  const category = useSelector(selectFilteredProducts)
 
 
  const dispatch = useDispatch()

  const allCategories = [
    "All",
    ...new Set(products.map((product) => product.category))
  ]
   
  const filterProducts = (ctg) => {
    dispatch(FILTER_BY_CATEGORY({ products, category: ctg }));
  };

  return (
    <div className='product_list'>
      <div className='product_list_filter'>
        <h3>Shop by Category</h3>
        <div className='product_select'>
            { allCategories.map((ctg,idx) =>{
              return(
              <button
              type='button'
                key={idx}
                className="choose item"
                onClick={() => filterProducts(ctg)}
              >
                {ctg}
              </button>
            )})}
          </div>
      </div> 
      {category && category.length >= 1 
      ? (<ProductDetail product = {category}/>) 
      : ((<ProductDetail product = {products}/>) )}  
    </div>
  )
}

export default ProductList;
