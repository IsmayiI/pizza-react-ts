import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../store';


interface State {
   items: CartItem[]
}

const initialState: State = {
   items: []
};

const cartSlice = createSlice({
   name: 'cart',
   initialState,
   reducers: {
      addItem: (state, action: PayloadAction<CartItem>) => {
         const existItem = state.items.find(item => item.id === action.payload.id)

         if (existItem) {
            existItem.count++
         }
         else {
            state.items.push({
               ...action.payload,
               count: 1
            })
         }
      },
      removeItem: (state, action: PayloadAction<number>) => {
         state.items = state.items.filter(item => item.id !== action.payload)
      },
      minusItem: (state, action: PayloadAction<number>) => {
         const existItem = state.items.find(item => item.id === action.payload)

         if (existItem && existItem.count > 1) {
            existItem.count--
         } else {
            state.items = state.items.filter(item => item.id !== action.payload)
         }
      },
      clearItems: (state) => {
         state.items = []
      }
   }
});

export const selectCart = (state: RootState) => state.cart

export const selectTotalPrice = (state: RootState) => {
   return state.cart.items.reduce((sum, item) => (item.price * item.count) + sum, 0);
};

export const selectTotalCount = (state: RootState) => {
   return state.cart.items.reduce((sum, item) => item.count + sum, 0);
};

export const { addItem, removeItem, minusItem, clearItems } = cartSlice.actions;

export default cartSlice.reducer;


