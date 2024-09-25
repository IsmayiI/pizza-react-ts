
import { useCallback, useRef, useState } from 'react'
import styles from './Search.module.scss'
import debounce from 'lodash.debounce'
import { useDispatch, useSelector } from 'react-redux'
import { selectFilter, setSearchValue } from '../../redux/slices/filterSlice'

const Search = () => {
   const dispatch = useDispatch()

   const { searchValue } = useSelector(selectFilter)
   const [inputValue, setInputValue] = useState(searchValue)
   const inputRef = useRef()

   const onClear = () => {
      dispatch(setSearchValue(''))
      inputRef.current.focus()
   }

   const debouncedSetSearchValue = useCallback(
      debounce((value) => {
         dispatch(setSearchValue(value))
      }, 500),
      []
   )

   const onChangeInput = (e) => {
      setInputValue(e.target.value)
      debouncedSetSearchValue(e.target.value)
   }


   return (
      <div className={styles.root}>
         <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24">
            <path
               d="M20.56 18.44l-4.67-4.67a7 7 0 10-2.12 2.12l4.67 4.67a1.5 1.5 0 002.12 0 1.49 1.49 0 000-2.12zM5 10a5 5 0 115 5 5 5 0 01-5-5z"
               fill="#464646"
            />
         </svg>
         <input
            ref={inputRef}
            value={inputValue}
            onChange={onChangeInput}
            placeholder="Поиск пиццы..." />
         <svg
            onClick={onClear}
            className={styles.close}
            style={searchValue ? { visibility: 'visible' } : { visibility: 'hidden' }}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24">
            <path
               d="M5.3 18.7c.2.2.4.3.7.3s.5-.1.7-.3l5.3-5.3 5.3 5.3c.2.2.5.3.7.3s.5-.1.7-.3c.4-.4.4-1 0-1.4L13.4 12l5.3-5.3c.4-.4.4-1 0-1.4s-1-.4-1.4 0L12 10.6 6.7 5.3c-.4-.4-1-.4-1.4 0s-.4 1 0 1.4l5.3 5.3-5.3 5.3c-.4.4-.4 1 0 1.4z"
               id="_icons"
            />
         </svg>
      </div>
   )
}

export default Search



