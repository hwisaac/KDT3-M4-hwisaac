import { createBrowserRouter } from 'react-router-dom';
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
import ProductManagement from './components/administrator/ProductManagement';
import SalesDetails from './components/administrator/SalesDetails';
import Transactions from './components/administrator/Transactions';
import Search from './pages/Search';
import MyBuy from './pages/MyBuy';
import AddModal from './components/administrator/AddModal';
import ProtectedRoute from './pages/ProtectedRoute';
import EditModal from './components/administrator/EditModal';
import AddAccount from './components/mypage/AddAccount';
import MyKeepProducts from './pages/MyKeepProducts';

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
        children: [
          {
            path: 'addaccount',
            element: <AddAccount />,
          },
        ],
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
        path: 'myKeepProducts',
        element: <MyKeepProducts />,
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
        path: 'mybuy',
        element: <MyBuy />,
      },
      {
        path: 'admin',
        element: (
          <ProtectedRoute requireAdmin>
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
              {
                path: 'edit/:id',
                element: <EditModal />,
              },
            ],
          },
          {
            path: 'sales',
            element: <SalesDetails />,
          },
          {
            path: 'transactions',
            element: <Transactions />,
          },
        ],
      },
    ],
  },
]);

export default router;
