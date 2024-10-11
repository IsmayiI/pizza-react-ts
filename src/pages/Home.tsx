import { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import qs from 'qs';

import { Pagination, Error, Skeleton, PizzaBlock, Sort, Categories } from '../components'

import { selectFilter, setFilters } from '../redux/slices/filterSlice';
import { getPizzas, selectPizza } from '../redux/slices/PizzaSlice';
import { useAppDispatch } from '../redux/store';

const Home = () => {
   const { categoryId, sort, activePage, searchValue } = useSelector(selectFilter)
   const { pizzas, status } = useSelector(selectPizza)

   const isSearch = useRef(false)
   const isMounted = useRef(false)

   const dispatch = useAppDispatch()
   const navigate = useNavigate()

   useEffect(() => {
      if (isMounted.current) {
         const queryString = qs.stringify({
            category: categoryId,
            sortBy: sort.sort,
            page: activePage
         })

         navigate(`?${queryString}`)
      }

      isMounted.current = true
   }, [categoryId, sort, activePage])

   useEffect(() => {
      if (window.location.search) {
         const params = qs.parse(window.location.search.slice(1)) as unknown as Filter

         dispatch(setFilters(params))

         isSearch.current = true
      }
   }, [])

   useEffect(() => {
      if (!isSearch.current) {
         dispatch(getPizzas({ activePage, categoryId, sort, searchValue }))
      }

      isSearch.current = false
      window.scrollTo(0, 0)
   }, [categoryId, sort, searchValue, activePage])



   const skeletonsContent = [...new Array(4)].map((_, i) => <Skeleton key={i} />)
   const pizzasContent = pizzas.map((pizza) => <PizzaBlock key={pizza.id} {...pizza} />)

   return (
      <div className="container">
         <div className="content__top">
            <Categories />
            <Sort />
         </div>
         <h2 className="content__title">Все пиццы</h2>
         {status === 'error' && <Error />}
         <div className="content__items">
            {status === 'loading' ? skeletonsContent : pizzasContent}
         </div>
         <Pagination />
      </div>
   )
}

export default Home