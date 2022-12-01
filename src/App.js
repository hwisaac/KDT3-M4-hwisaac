import TotalProduct from './component/TotalProduct';
import Header from './components/Header';
import LogIn from './components/LogIn';
import SignUp from './components/SignUp';

function App() {
  return (
    <>
      <Header />
      <div className="App">
        <TotalProduct />
      </div>
      
      <SignUp />
      {/* <LogIn /> */}
    </>
  );
}

export default App;
