import './App.css';
import { BrowserRouter as Router, Routes, Route, Link} from 'react-router-dom';
import Getproduct from './components/Getproduct';
import Addproducts from './components/Addproducts';
import Signup from './components/Signup';
import Signin from './components/Signin';
import Notfound from './components/Notfound';

function App() {
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <h1>Welcome to Sokogarden</h1>
        </header>
        {/* Below are our different routes together with the rendered components */}
        <Routes>
          <Route path ='/' element={<Getproduct />} />
          <Route path ='/addproducts' element ={<Addproducts />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/signin' element={<Signin />} />
          <Route path='*' element={<Notfound />} />

        </Routes>

      </div>
    </Router>
  );
}

export default App;
