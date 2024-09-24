import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios';


const initialState = {
   pizzas: [],
   status: 'loading'
}

export const getPizzas = createAsyncThunk(
   'pizza/getPizzas',
   async ({ activePage, categoryId, sort, searchValue }) => {

      const { data } = await axios.get('https://66dac750f47a05d55be5f0e1.mockapi.io/items', {
         params: {
            page: activePage,
            limit: 4,
            category: categoryId || undefined,
            sortBy: sort.sort,
            order: 'desc',
            search: searchValue || undefined
         }
      })

      return data
   }
)

const pizzaSlice = createSlice({
   name: 'pizza',
   initialState,
   reducers: {},
   extraReducers: (builder) => {
      builder
         .addCase(getPizzas.pending, (state) => {
            state.status = 'loading'
            state.pizzas = []
         })
         .addCase(getPizzas.fulfilled, (state, action) => {
            state.status = 'success'
            state.pizzas = action.payload
         })
         .addCase(getPizzas.rejected, (state) => {
            state.status = 'error'
            state.pizzas = []
         })
   },
})


export default pizzaSlice.reducer