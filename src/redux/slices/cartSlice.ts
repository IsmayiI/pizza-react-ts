import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../store';
import { getCartFromLS } from '../../utils/getCartFromLS';
import { setCartFromLS } from '../../utils/setCartFromLS';


interface State {
   items: CartItem[]
}

const initialState: State = {
   items: getCartFromLS()
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
         setCartFromLS(state.items)
      },
      removeItem: (state, action: PayloadAction<number>) => {
         state.items = state.items.filter(item => item.id !== action.payload)
         setCartFromLS(state.items)
      },
      minusItem: (state, action: PayloadAction<number>) => {
         const existItem = state.items.find(item => item.id === action.payload)

         if (existItem && existItem.count > 1) {
            existItem.count--
         } else {
            state.items = state.items.filter(item => item.id !== action.payload)
         }
         setCartFromLS(state.items)
      },
      clearItems: (state) => {
         state.items = []
         setCartFromLS(state.items)
      }
   }
});

export const selectCartItems = (state: RootState) => state.cart.items

export const selectTotalPrice = (state: RootState) => state.cart.items.reduce((sum, item) => (item.price * item.count) + sum, 0)

export const selectTotalCount = (state: RootState) => state.cart.items.reduce((sum, item) => item.count + sum, 0)

export const { addItem, removeItem, minusItem, clearItems } = cartSlice.actions;

export default cartSlice.reducer;


