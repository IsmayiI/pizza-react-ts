import { useDispatch, useSelector } from 'react-redux';
import ReactPaginate from 'react-paginate';
import styles from './Pagination.module.scss'

import { selectActivePage, setActivePage } from '../../redux/slices/filterSlice';
import { memo } from 'react';

const Pagination = () => {
   const activePage = useSelector(selectActivePage)
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

export default memo(Pagination)