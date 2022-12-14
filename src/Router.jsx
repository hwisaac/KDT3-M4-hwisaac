import { createBrowserRouter, Route, Routes } from 'react-router-dom';
import App from './App';
import MyPage from './pages/MyPage';
import MyCart from './pages/MyCart';
import Home from './pages/Home';
import LogIn from './components/login/LogIn';
import SignUp from './components/signup/SignUp';
import Slider from './components/kv/Slider';
import ProductDetail from './pages/ProductDetail';
import Category from './pages/Category';
import Administrator from './pages/Admininstartor';
import NotFound from './pages/NotFound';
import ProductManagement from './components/administrator/ProductManagement';
import SalesDetails from './components/administrator/SalesDetails';
import TransactionDetails from './components/administrator/TransactionDetails';

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
      {
        path: 'category/:tag',
        element: <Category />,
      },
      {
        path: 'products/:id',
        element: <ProductDetail />,
      },
      {
        path: 'admin',
        element: <Administrator />,
        children: [
          { path: 'products', element: <ProductManagement /> },
          {
            path: 'sales',
            element: <SalesDetails />,
          },
          {
            path: 'transaction',
            element: <TransactionDetails />,
          },
        ],
      },
    ],
  },
]);

export default router;
