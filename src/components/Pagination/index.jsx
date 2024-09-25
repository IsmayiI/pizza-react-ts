import { useDispatch, useSelector } from 'react-redux';
import ReactPaginate from 'react-paginate';
import styles from './Pagination.module.scss'

import { selectFilter, setActivePage } from '../../redux/slices/filterSlice';

const Pagination = () => {
   const { activePage } = useSelector(selectFilter)
   const dispatch = useDispatch()

   return (
      <ReactPaginate
         className={styles.root}
         breakLabel="..."
         nextLabel=">"
         previousLabel="<"
         onPageChange={(e) => dispatch(setActivePage(e.selected + 1))}
         pageRangeDisplayed={4}
         pageCount={3}
         forcePage={activePage - 1}
         renderOnZeroPageCount={null}
      />
   )
}

export default Pagination