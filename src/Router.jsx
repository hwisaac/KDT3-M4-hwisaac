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
import Search from './pages/Search';
import MyBuy from './pages/MyBuy';
import AddModal from './components/administrator/AddModal';
import ProtectedRoute from './pages/ProtectedRoute';

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
        element: (
          <ProtectedRoute>
            <MyPage />
          </ProtectedRoute>
        ),
      },
      {
        path: 'mycart',
        element: (
          <ProtectedRoute>
            <MyCart />
          </ProtectedRoute>
        ),
      },
      {
        path: 'mybuy',
        element: (
          <ProtectedRoute>
            <MyBuy />
          </ProtectedRoute>
        ),
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
        path: 'search',
        element: <Search />,
      },
      {
        path: 'admin',
        element: (
          <ProtectedRoute>
            <Administrator />
          </ProtectedRoute>
        ),
        children: [
          {
            path: 'products',
            element: <ProductManagement />,
            children: [
              {
                path: 'add',
                element: <AddModal />,
              },
            ],
          },
          {
            path: 'sales',
            element: <SalesDetails />,
          },
          {
            path: 'transactions',
            element: <TransactionDetails />,
          },
        ],
      },
    ],
  },
]);

export default router;
