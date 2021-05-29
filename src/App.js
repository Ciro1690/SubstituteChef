import './App.css';
import { BrowserRouter, Route } from 'react-router-dom'
import Home from './components/home/Home';
import Search from './components/search/Search'
import Navbar from './components/home/Navbar';
import Login from './components/auth/Login';
import Register from './components/auth/Register';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <Route exact path = "/">
          <Home />
        </Route>
        <Route exact path = "/Search">
          <Search />
        </Route>
        <Route exact path = "/Login">
          <Login />
        </Route>
        <Route exact path = "/Register">
          <Register />
        </Route>
      </BrowserRouter>
    </div>
  );
}

export default App;
