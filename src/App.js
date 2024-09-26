import { Route, Routes } from 'react-router-dom';

import './scss/app.scss';

import Home from './pages/Home';
import NotFound from './pages/NotFound';
import Cart from './pages/Cart';
import MainLayout from './layouts/MainLayout';


function App() {
   return (
      <Routes>
         <Route path='/' element={<MainLayout />}>
            <Route index element={<Home />} />
            <Route path='cart' element={<Cart />} />
            <Route path='*' element={<NotFound />} />
         </Route>
      </Routes>
   );
}

export default App;



