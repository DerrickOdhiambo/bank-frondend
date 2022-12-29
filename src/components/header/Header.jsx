import { Link } from 'react-router-dom';
import { useLogout } from '../../hooks/useLogout';
import { useAuthContext } from '../../hooks/useAuthContext';

const Header = () => {
  const { logout } = useLogout();
  const { user } = useAuthContext();

  const handleLogout = () => {
    logout();
  };

  return (
    <div className='header'>
      <div className='logo'>
        <Link to='/'>
          <img src='/assets/bank.png' alt='' /> <span>BadBank</span>
        </Link>
      </div>
      <div className='nav'>
        {user ? (
          <>
            <ul>
              <li>
                <Link to='/' className='account'>
                  My Account
                </Link>
              </li>
              <li>
                <Link to='/transactions'>Transactions</Link>
              </li>
              <li>
                <Link className='email'>{user.email}</Link>
              </li>
            </ul>
            <div className='logout-btn'>
              <button className='logout' onClick={handleLogout}>
                Logout
              </button>
            </div>
          </>
        ) : (
          <ul>
            <li>
              <Link to='/create-account'>Create Account</Link>
            </li>
            <li>
              <Link to='/signin'>Login</Link>
            </li>
          </ul>
        )}
      </div>
    </div>
  );
};

export default Header;
