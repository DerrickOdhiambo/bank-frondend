import { AccountsContext } from '../context/AccountContext';
import { useContext } from 'react';

export const useAccountContext = () => {
  const context = useContext(AccountsContext);

  if (!context) {
    throw Error('useAuthContext must be used inside an AuthContextProvider');
  }

  return context;
};
