import { useState } from "react"

const categories = ['Все', 'Мясные', 'Вегетарианская', 'Гриль', 'Острые', 'Закрытые']

const Categories = ({ activeId, onClickCategory }) => {
   return (
      <div className="categories">
         <ul>
            {categories.map((category, i) => (
               <li key={category}
                  onClick={() => onClickCategory(i)}
                  className={activeId === i ? 'active' : ''}>
                  {category}
               </li>
            ))}
         </ul>
      </div>
   )
}

export default Categories

