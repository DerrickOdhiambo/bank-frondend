import Header from './components/header/Header';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import './styles/App.scss';
import Register from './pages/Register';
import Login from './pages/Login';
import Homepage from './pages/Homepage';
import Transactions from './pages/Transactions';
import { useAuthContext } from './hooks/useAuthContext';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const { user } = useAuthContext();

  return (
    <Router>
      <div className='App'>
        <ToastContainer />
        <Header />
        <Routes>
          <Route
            path='/create-account'
            element={!user ? <Register /> : <Navigate to='/' />}
          />
          <Route
            path='/signin'
            element={!user ? <Login /> : <Navigate to='/' />}
          />
          <Route
            path='/'
            element={user ? <Homepage /> : <Navigate to='/signin' />}
          />
          <Route
            path='/transactions'
            element={user ? <Transactions /> : <Navigate to='/signin' />}
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
