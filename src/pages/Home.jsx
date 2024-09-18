import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';

import Categories from '../components/Categories';
import Sort from '../components/Sort';
import PizzaBlock from '../components/PizzaBlock'
import Skeleton from '../components/PizzaBlock/Skeleton';
import Pagination from '../components/Pagination';

const Home = ({ searchValue }) => {
   const { categoryId, sort, activePage } = useSelector((state) => state.filter)

   const [pizzas, setPizzas] = useState([])
   const [isLoadingPizzas, setIsLoadingPizzas] = useState(true)


   useEffect(() => {
      const category = categoryId > 0 ? `category=${categoryId}&` : ''
      const sortStr = `sortBy=${sort.sort}&order=desc`
      const search = searchValue ? `&search=${searchValue}` : ''

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

      getPizzas()
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
         <div className="content__items">
            {isLoadingPizzas ? skeletonsContent : pizzasContent}
         </div>
         <Pagination />
      </div>
   )
}

export default Home