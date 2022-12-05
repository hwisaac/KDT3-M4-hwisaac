import TotalProduct from './component/TotalProduct';
import Header from './components/Header';
import LogIn from './components/LogIn';
import SignUp from './components/SignUp';
import Slider from './components/KV/Slider';
import { Outlet } from 'react-router-dom';

function App() {
  return (
    <>
      <Header />
      <Slider />

      <Outlet />

      <TotalProduct />

      {/* <SignUp /> */}
      {/* <LogIn /> */}
    </>
  );
}

export default App;
