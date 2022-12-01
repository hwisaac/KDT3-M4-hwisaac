import TotalProduct from './component/TotalProduct';
import Header from './components/Header';
import LogIn from './components/LogIn';
import SignUp from './components/SignUp';
import Slider from './components/KV/Slider';

function App() {
  return (
    <>
      <Header />
      <div>
        <Slider />
      </div>
      <div className="App">
        <TotalProduct />
      </div>
      
      <SignUp />
      {/* <LogIn /> */}
    </>
  );
}

export default App;
