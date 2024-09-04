import { useState } from "react"

const categories = ['Все', 'Мясные', 'Вегетарианская', 'Гриль', 'Острые', 'Закрытые']

const Categories = () => {
   const [activeCategoryIndex, setActiveCategoryIndex] = useState(0)

   return (
      <div className="categories">
         <ul>
            {categories.map((category, i) => (
               <li key={category}
                  onClick={() => setActiveCategoryIndex(i)}
                  className={activeCategoryIndex === i ? 'active' : ''}>
                  {category}
               </li>
            ))}
         </ul>
      </div>
   )
}

export default Categories

