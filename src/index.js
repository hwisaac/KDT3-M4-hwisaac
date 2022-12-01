import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import MyPage from './pages/MyPage';
import MyCart from './pages/MyCart';


const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
  },
  {
    path: '/mypage',
    element: <MyPage />,
  },
  {
    path: '/mycart',
    element: <MyCart />,
  },
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);