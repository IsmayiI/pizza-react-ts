import { useEffect, useState } from 'react';
import Categories from '../components/Categories';
import Sort from '../components/Sort';
import PizzaBlock from '../components/PizzaBlock'
import Skeleton from '../components/PizzaBlock/Skeleton';

const Home = ({ searchValue }) => {
   const [pizzas, setPizzas] = useState([])
   const [isLoadingPizzas, setIsLoadingPizzas] = useState(true)
   const [activeCategoryId, setActiveCategoryId] = useState(0)
   const [activeSort, setActiveSort] = useState({ title: 'популярности', sort: 'rating' })


   useEffect(() => {
      const category = activeCategoryId > 0 ? `category=${activeCategoryId}&` : ''
      const sort = `sortBy=${activeSort.sort}&order=desc`
      const search = searchValue ? `&search=${searchValue}` : ''

      const getPizzas = async () => {
         setIsLoadingPizzas(true)

         try {
            const res = await fetch(`https://66dac750f47a05d55be5f0e1.mockapi.io/items?${category}${sort}${search}`)
            if (!res.ok) throw new Error('Server error')
            const data = await res.json()
            setPizzas(data)
         } catch (err) {
            console.error(err);
         }

         setIsLoadingPizzas(false)
      }

      getPizzas()
      window.scrollTo(0, 0)

   }, [activeCategoryId, activeSort, searchValue])


   const onClickCategory = (id) => setActiveCategoryId(id)
   const onClickSort = (sort) => setActiveSort(sort)



   return (
      <div className="container">
         <div className="content__top">
            <Categories activeId={activeCategoryId} onClickCategory={onClickCategory} />
            <Sort activeSort={activeSort} onClickSort={onClickSort} />
         </div>
         <h2 className="content__title">Все пиццы</h2>
         <div className="content__items">
            {isLoadingPizzas
               ? [...new Array(12)].map((_, i) => <Skeleton key={i} />)
               : pizzas.map(pizza => <PizzaBlock key={pizza.id} {...pizza} />)
            }
         </div>
      </div>
   )
}

export default Home