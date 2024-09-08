import { useEffect, useState } from 'react';
import Categories from './components/Categories';
import Header from './components/Header';
import PizzaBlock from './components/PizzaBlock';
import Sort from './components/Sort';
import './scss/app.scss';
import Skeleton from './components/PizzaBlock/Skeleton';


function App() {
   const [pizzas, setPizzas] = useState([])
   const [isLoadingPizzas, setIsLoadingPizzas] = useState(true)

   useEffect(() => {
      const getPizzas = async () => {
         try {
            const res = await fetch('https://66dac750f47a05d55be5f0e1.mockapi.io/items')
            if (!res.ok) throw new Error('Server error')
            const data = await res.json()
            setPizzas(data)
         } catch (err) {
            console.error(err);
         }
         setIsLoadingPizzas(false)
      }

      getPizzas()
   }, [])

   return (
      <div className="wrapper">
         <Header />
         <div className="content">
            <div className="container">
               <div className="content__top">
                  <Categories />
                  <Sort />
               </div>
               <h2 className="content__title">Все пиццы</h2>
               <div className="content__items">
                  {isLoadingPizzas
                     ? [...new Array(12)].map((_, i) => <Skeleton key={i} />)
                     : pizzas.map(pizza => <PizzaBlock key={pizza.id} {...pizza} />)
                  }
               </div>
            </div>
         </div>
      </div>
   );
}

export default App;
