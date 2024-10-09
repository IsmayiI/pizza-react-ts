
export const getCartFromLS = () => {
   const items = localStorage.getItem('cart') || '[]'
   return JSON.parse(items)
}