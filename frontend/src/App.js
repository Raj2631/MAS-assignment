import './App.css';
import { Route } from 'react-router-dom';
import AuthProvider from './context/AuthContext';
import Home from './pages/Home';
import Register from './pages/Register';
import Login from './pages/Login';

function App() {
  return (
    <div className="App">
      <AuthProvider>
        <Route path="/" exact>
          <Home />
        </Route>
        <Route path="/register">
          <Register />
        </Route>
        <Route path="/login">
          <Login />
        </Route>
      </AuthProvider>
    </div>
  );
}

export default App;
