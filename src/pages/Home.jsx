import { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import qs from 'qs';

import Categories from '../components/Categories';
import Sort from '../components/Sort';
import PizzaBlock from '../components/PizzaBlock'
import Skeleton from '../components/PizzaBlock/Skeleton';
import Error from '../components/PizzaBlock/Error';
import Pagination from '../components/Pagination';
import { setFilters } from '../redux/slices/filterSlice';
import { getPizzas } from '../redux/slices/PizzaSlice';

const Home = ({ searchValue }) => {
   const { categoryId, sort, activePage } = useSelector((state) => state.filter)
   const { pizzas, status } = useSelector(state => state.pizza)

   const isSearch = useRef(false)
   const isMounted = useRef(false)

   const dispatch = useDispatch()
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
         const params = qs.parse(window.location.search.slice(1))

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
   const pizzasContent = pizzas.map(pizza => <PizzaBlock key={pizza.id} {...pizza} />)

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