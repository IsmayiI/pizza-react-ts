import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { sorts } from "../../components/Sort"
import { RootState } from "../store"
import { ParsedQs } from "qs"

interface State extends FilterProps { }


const initialState: State = {
   categoryId: 0,
   activePage: 1,
   searchValue: '',
   sort: { title: 'популярности', sort: 'rating' }
}

const filterSlice = createSlice({
   name: 'filter',
   initialState,
   reducers: {
      setCategoryId: (state, action: PayloadAction<number>) => {
         state.categoryId = action.payload
      },
      setActivePage: (state, action: PayloadAction<number>) => {
         state.activePage = action.payload
      },
      setSearchValue: (state, action: PayloadAction<string>) => {
         state.searchValue = action.payload
      },
      setSort: (state, action: PayloadAction<Sort>) => {
         state.sort = action.payload
      },
      setFilters: (state, action: PayloadAction<Filter>) => {
         const { category, page, sortBy } = action.payload
         return {
            ...state,
            categoryId: +category,
            activePage: +page,
            sort: sorts.find(sort => sort.sort === sortBy)!,
         }
      }
   }
})


export const selectFilter = (state: RootState) => state.filter

export const { setCategoryId, setSort, setActivePage, setFilters, setSearchValue } = filterSlice.actions

export default filterSlice.reducer