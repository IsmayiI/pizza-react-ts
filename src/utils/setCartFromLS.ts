
export const setCartFromLS = (items: CartItem[]) => {
   const json = JSON.stringify(items)
   localStorage.setItem('cart', json)
}