import { createSlice } from "@reduxjs/toolkit"
import { sorts } from "../../components/Sort"

const initialState = {
   categoryId: 0,
   activePage: 1,
   searchValue: '',
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
      setSearchValue: (state, action) => {
         state.searchValue = action.payload
      },
      setSort: (state, action) => {
         state.sort = action.payload
      },
      setFilters: (state, action) => {
         const { category, page, sortBy } = action.payload
         return {
            ...state,
            categoryId: +category,
            activePage: +page,
            sort: sorts.find(sort => sort.sort === sortBy),
         }
      }
   }
})


export const { setCategoryId, setSort, setActivePage, setFilters, setSearchValue } = filterSlice.actions

export default filterSlice.reducer