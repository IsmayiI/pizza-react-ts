import { createSlice } from '@reduxjs/toolkit';

const initialState = {
   totalPrice: 0,
   items: []
};

const cartSlice = createSlice({
   name: 'cart',
   initialState,
   reducers: {
      addItem: (state, action) => {
         const existItem = state.items.find(item => item.id === action.payload.id)

         if (existItem) {
            existItem.price += existItem.price / existItem.count
            existItem.count++
         }
         else {
            state.items.push({
               ...action.payload,
               count: 1
            })
         }

         state.totalPrice = state.items.reduce((sum, item) => item.price + sum, 0)
      },
      removeItem: (state, action) => {
         state.items = state.items.filter(item => item.id !== action.payload)
      },
      clearItems: (state) => {
         state.items = []
      }
   }
});

export const { addItem, removeItem, clearItems } = cartSlice.actions;

export default cartSlice.reducer;
