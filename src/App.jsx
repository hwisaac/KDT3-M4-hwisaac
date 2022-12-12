import Header from './components/header/Header';
import Footer from './components/footer/Footer';
import GNB from './components/gnb/GNB';
import { Outlet } from 'react-router-dom';

// import './reset.css';
// import './App.css';

function App() {
  return (
    <>
      <Header />
      <GNB />
      <Outlet />
      <Footer />
    </>
  );
}

export default App;
