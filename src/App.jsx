import Header from './components/header/Header';
import Footer from './components/footer/Footer';
import Gnb from './components/gnb/Gnb';
import RecentlyViewed from './components/recently-viewed/RecentlyViewed';
import { Outlet } from 'react-router-dom';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

// import './reset.css';
// import './App.css';

function App() {
  return (
    <>
      <Header />
      <Gnb />
      <Outlet />
      <Footer />
      <RecentlyViewed/>
      <ReactQueryDevtools initialIsOpen={false} />
    </>
  );
}

export default App;
