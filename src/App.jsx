import Header from './components/header/Header';
import Footer from './components/footer/Footer';
import { Outlet } from 'react-router-dom';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { useEffect } from 'react';
import { useScroll } from 'framer-motion';
import styled from 'styled-components';

// import './reset.css';
// import './App.css';

export default function App() {
  // const { scrollY } = useScroll();
  // useEffect(() => {
  //   console.log(scrollY.current);
  // }, [scrollY.current]);
  return (
    <Layout>
      <Header />
      <Outlet />
      <Footer />
      <ReactQueryDevtools initialIsOpen={false} />
    </Layout>
  );
}

const Layout = styled.div``;
