import { TransactionsContext } from '../context/TransactionsContext';
import { useContext } from 'react';

export const useTransactionsContext = () => {
  const context = useContext(TransactionsContext);

  if (!context) {
    throw Error('useAuthContext must be used inside an AuthContextProvider');
  }

  return context;
};
