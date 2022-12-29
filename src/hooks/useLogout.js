import { useAccountContext } from './useAccountContext';
import { useAuthContext } from './useAuthContext';

export const useLogout = () => {
  const { dispatch } = useAuthContext();
  const { dispatch: account } = useAccountContext();

  const logout = () => {
    //remove item from local strorage
    localStorage.removeItem('user');

    //remove account from local storage
    localStorage.removeItem('account');

    //dispatch logout
    dispatch({ type: 'LOGOUT' });
    account({ type: 'CREATE_ACCOUNT', payload: null });
  };

  return { logout };
};
