import { useState } from 'react';
import { useAccountContext } from './useAccountContext';

export const useCreateAccount = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);

  const { dispatch } = useAccountContext();

  const account = async (name, email, password, token) => {
    setIsLoading(true);
    setError(null);

    //create bank account
    const bankAccount = await fetch(
      'http://localhost:5000/api/account/create-account',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ name, email, password }),
      }
    );

    const res = await bankAccount.json();

    //persist bank account details to local storage
    localStorage.setItem('account', JSON.stringify(res));

    //update context
    dispatch({ type: 'CREATE_ACCOUNT', payload: res });
  };
  return { account, error, isLoading };
};
