import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    filteredProduct:[]

}

const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    FILTER_BY_CATEGORY(state,action) {
        const {products, category} = action.payload
        let temporaryProducts = []
        if (category === "All") {
            temporaryProducts = products
        } else {
            temporaryProducts= products.filter ((product) => 
            product.category === category)
        }
        state.filteredProduct= temporaryProducts
       
  
    }
    
  }
});

export const {FILTER_BY_CATEGORY} = filterSlice.actions

export const selectFilteredProducts = (state) => state.filter.filteredProduct

export default filterSlice.reducer;