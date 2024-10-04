interface Pizza {
   id: number
   imageUrl: string
   title: string
   types: number[]
   sizes: number[]
   price: number
   category: number
   rating: number
}

interface CartItem {
   id: number
   imageUrl: string
   title: string
   type: string
   size: number
   price: number
   count: number
}

interface Sort {
   title: SortTitle
   sort: SortProp
}

interface Filter {
   category: string
   sortBy: SortProp
   page: string
}

interface FilterProps {
   categoryId: number
   activePage: number
   searchValue: string
   sort: Sort
}


type SortProp = 'rating' | 'price' | 'title'
type SortTitle = 'популярности' | 'цене' | 'алфавиту'
type Status = 'loading' | 'success' | 'error'