import { createBrowserRouter, Route, Routes } from 'react-router-dom';
import App from './App';
import MyPage from './pages/MyPage';
import MyCart from './pages/MyCart';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: 'mypage',
        element: <MyPage />,
      },
      {
        path: 'mycart',
        element: <MyCart />,
      },
    ],
  },
]);

export default router;
