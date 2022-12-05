import { createBrowserRouter, Route, Routes } from 'react-router-dom';
import App from './App';
import MyPage from './pages/MyPage';
import MyCart from './pages/MyCart';
import Home from './pages/Home';
import LogIn from './components/login/LogIn';
import SignUp from './components/signup/SignUp';
import Slider from './components/KV/Slider';
import Detail from './pages/Detail';

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
        path: 'detail/:id',
        element: <Detail />,
      },
    ],
  },
]);

export default router;
