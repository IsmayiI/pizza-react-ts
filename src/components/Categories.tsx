import { memo } from "react";
import { useDispatch, useSelector } from "react-redux"
import { selectCategoryId, setCategoryId } from "../redux/slices/filterSlice"

const categories = ['Все', 'Мясные', 'Вегетарианская', 'Гриль', 'Острые', 'Закрытые']

const Categories = () => {
   const categoryId = useSelector(selectCategoryId)
   const dispatch = useDispatch()

   return (
      <div className="categories">
         <ul>
            {categories.map((category, i) => (
               <li key={category}
                  onClick={() => dispatch(setCategoryId(i))}
                  className={categoryId === i ? 'active' : ''}>
                  {category}
               </li>
            ))}
         </ul>
      </div>
   )
}

export default memo(Categories)

