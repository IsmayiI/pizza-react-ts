import { Link, useLocation } from 'react-router-dom'

import logoSvg from '../assets/img/pizza-logo.svg'
import Search from './Search'
import CartButton from './CartButton'

const Header = () => {
   const { pathname } = useLocation()

   return (
      <div className="header">
         <div className="container">
            <Link to="/">
               <div className="header__logo">
                  <img width="38" src={logoSvg} alt="Pizza logo" />
                  <div>
                     <h1>React Pizza</h1>
                     <p>самая вкусная пицца во вселенной</p>
                  </div>
               </div>
            </Link>
            {pathname === '/cart' || <>
               <Search />
               <CartButton />
            </>}
         </div>
      </div>
   )
}

export default Header