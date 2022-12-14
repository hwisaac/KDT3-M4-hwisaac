import Header from './components/header/Header';
import Footer from './components/footer/Footer';
import GNB from './components/gnb/GNB';
import { Outlet } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

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
