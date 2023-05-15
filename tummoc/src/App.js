import logo from './logo.svg';
import './App.css';
import AllRoutes from './AllRoutes/Allroutes';
import Nav from './Components/Navbar';

function App() {
  return (
    <div className="App">
      <Nav />
      <AllRoutes />
    </div>
  );
}

export default App;
