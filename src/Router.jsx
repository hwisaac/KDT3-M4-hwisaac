import { createBrowserRouter, Route, Routes } from 'react-router-dom';
import App from './App';
import MyPage from './pages/MyPage';
import MyCart from './pages/MyCart';
import Home from './pages/Home';
import LogIn from './components/login/LogIn';
import SignUp from './components/signup/SignUp';
import Slider from './components/KV/Slider';
import Best from './pages/categories/Best';
import AgriculturalProducts from './pages/categories/AgriculturalProducts';
import AllProducts from './pages/categories/AllProducts';
import LivestockProducts from './pages/categories/LivestockProducts';
import MarineProducts from './pages/categories/MarineProducts';
import ProcessedFood from './pages/categories/ProcessedFood';
import Root from './pages/Root';
import Fruits from './pages/categories/Fruits';
import Vegetables from './pages/categories/Vegetables';
import Grain from './pages/categories/Grain';
import SweetPotato from './pages/categories/SweetPotato';
import SesonalMarine from './pages/categories/SesonalMarine';
import DriedFish from './pages/categories/DriedFish';
import OrdinaryProcessed from './pages/categories/OrdinaryProcessed';
import SideDish from './pages/categories/SideDish';
import Tea from './pages/categories/Tea';
import Honey from './pages/categories/Honey';
import Snack from './pages/categories/Snack';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: 'mypage',
        element: <MyPage />,
      },
      {
        path: 'mycart',
        element: <MyCart />,
      },
      {
        path: 'login',
        element: <LogIn />,
      },
      {
        path: 'signup',
        element: <SignUp />,
      },
      {
        path: 'slider',
        element: <Slider />,
      },
      { path: '/best', element: <Best /> },
      { path: '/agriculturalproducts', element: <AgriculturalProducts /> },
      { path: '/marineproducts', element: <MarineProducts /> },
      { path: '/livestockproducts', element: <LivestockProducts /> },
      { path: '/processedfood', element: <ProcessedFood /> },
      { path: '/allproducts', element: <AllProducts /> },
      { path: '/fruits', element: <Fruits /> },
      { path: '/vegetables', element: <Vegetables /> },
      { path: '/grain', element: <Grain /> },
      { path: '/sweetPotato', element: <SweetPotato /> },
      { path: '/sesonalMarine', element: <SesonalMarine /> },
      { path: '/driedFish', element: <DriedFish /> },
      { path: '/ordinaryProcessed', element: <OrdinaryProcessed /> },
      { path: '/sideDish', element: <SideDish /> },
      { path: '/tea', element: <Tea /> },
      { path: '/honey', element: <Honey /> },
      { path: '/snack', element: <Snack /> },
    ],
  },
]);

export default router;
