import Header from './components/header/Header';
import Footer from './components/footer/Footer';
import GNB from './components/gnb/GNB';
import { Outlet } from 'react-router-dom';
<<<<<<< HEAD
import { useRecoilValue } from 'recoil';
import { loginState, userInfoState } from './data/LoginData';
=======
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
>>>>>>> a3b63b1452ba61deac4cd10551cbe0ec75ff1ca7

// import './reset.css';
// import './App.css';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Header />
      <GNB />
      <Outlet />
      <Footer />
    </QueryClientProvider>
  );
}

export default App;
