import { createSlice } from "@reduxjs/toolkit"

const initialState = {
   categoryId: 0,
   activePage: 1,
   sort: { title: 'популярности', sort: 'rating' }
}

const filterSlice = createSlice({
   name: 'filter',
   initialState,
   reducers: {
      setCategoryId: (state, action) => {
         state.categoryId = action.payload
      },
      setActivePage: (state, action) => {
         state.activePage = action.payload
      },
      setSort: (state, action) => {
         state.sort = action.payload
      }
   }
})


export const { setCategoryId, setSort, setActivePage } = filterSlice.actions

export default filterSlice.reducer