import { lazy } from 'react';
import { Route, Routes } from 'react-router-dom';

import './scss/app.scss';

import Home from './pages/Home';
import MainLayout from './layouts/MainLayout';
import SuspenseLayout from './layouts/SuspenseLayout';

const Cart = lazy(() => import(/* webpackChunkName: "Cart"*/ './pages/Cart'))
const NotFound = lazy(() => import(/* webpackChunkName: "NotFound"*/ './pages/NotFound'))


function App() {
   return (
      <Routes>
         <Route path='/' element={<MainLayout />}>
            <Route index element={<Home />} />
            <Route element={<SuspenseLayout />}>
               <Route path='cart' element={<Cart />} />
               <Route path='*' element={<NotFound />} />
            </Route>
         </Route>
      </Routes>
   );
}

export default App;



