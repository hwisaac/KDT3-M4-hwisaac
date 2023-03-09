import { createBrowserRouter } from 'react-router-dom';
import App from './App';
import MyPage from './pages/my-page/MyPage';
import MyCart from './pages/my-cart/MyCart';
import Home from './pages/home/Home';
import LogIn from './pages/login/LogIn';
import SignUp from './pages/signup/SignUp';
import ProductDetail from './pages/products/ProductDetail';
import Category from './pages/category/Category';
import Administrator from './pages/admin/Admininstartor';
import ProductManagement from './pages/admin/ProductManagement';
import SalesDetails from './pages/admin/SalesDetails';
import Transactions from './pages/admin/Transactions';
import Search from './pages/search/Search';
import MyBuy from './pages/my-buy/MyBuy';
import AddModal from './components/admin/AddModal';
import ProtectedRoute from './pages/ProtectedRoute';
import EditModal from './components/admin/EditModal';
import MyKeepProducts from './pages/my-keep-products/MyKeepProducts';
import TransactionDetail from './components/my-page/TransactionDetail';
import MyAccount from './components/my-page/MyAccount';
import MyOrder from './components/my-page/MyOrder';
import AddAccount from './components/my-page/AddAccount';
import NotFound from 'pages/NotFound';

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
            path: 'myaccount',
            element: (
              <ProtectedRoute>
                <MyAccount />
              </ProtectedRoute>
            ),
            children: [
              {
                path: 'addaccount',
                element: (
                  <ProtectedRoute>
                    <AddAccount />
                  </ProtectedRoute>
                ),
              },
            ],
          },
          {
            path: 'myorder',
            element: (
              <ProtectedRoute>
                <MyOrder />
              </ProtectedRoute>
            ),
            children: [
              {
                path: 'transactions/:detailId',
                element: (
                  <ProtectedRoute>
                    <TransactionDetail />
                  </ProtectedRoute>
                ),
              },
            ],
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
          // <ProtectedRoute requireAdmin>
          <Administrator />
          // </ProtectedRoute>
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
  {
    path: '/*',
    element: <NotFound />,
  },
]);

export default router;
