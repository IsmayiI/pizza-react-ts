import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import qs from 'qs';

import Categories from '../components/Categories';
import Sort from '../components/Sort';
import PizzaBlock from '../components/PizzaBlock'
import Skeleton from '../components/PizzaBlock/Skeleton';
import Pagination from '../components/Pagination';
import { setFilters } from '../redux/slices/filterSlice';

const Home = ({ searchValue }) => {
   const { categoryId, sort, activePage } = useSelector((state) => state.filter)

   const [pizzas, setPizzas] = useState([])
   const [isLoadingPizzas, setIsLoadingPizzas] = useState(true)
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
      if (!isSearch.current) getPizzas()

      isSearch.current = false
      window.scrollTo(0, 0)
   }, [categoryId, sort, searchValue, activePage])






   const getPizzas = async () => {
      setIsLoadingPizzas(true)

      try {
         const { data } = await axios.get('https://66dac750f47a05d55be5f0e1.mockapi.io/items', {
            params: {
               page: activePage,
               limit: 4,
               category: categoryId || undefined,
               sortBy: sort.sort,
               order: 'desc',
               search: searchValue || undefined
            }
         });

         setPizzas(data);
      } catch (err) {
         console.error(err);
      }

      setIsLoadingPizzas(false)
   }
   const skeletonsContent = [...new Array(4)].map((_, i) => <Skeleton key={i} />)
   const pizzasContent = pizzas.map(pizza => <PizzaBlock key={pizza.id} {...pizza} />)

   return (
      <div className="container">
         <div className="content__top">
            <Categories />
            <Sort />
         </div>
         <h2 className="content__title">Все пиццы</h2>
         <div className="content__items">
            {isLoadingPizzas ? skeletonsContent : pizzasContent}
         </div>
         <Pagination />
      </div>
   )
}

export default Home