import { useState } from 'react';
import { useAuthContext } from './useAuthContext';
import { useCreateAccount } from './useCreateAccount';
import { toast } from 'react-toastify';

export const useSignUp = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);

  const { account } = useCreateAccount();

  const { dispatch } = useAuthContext();

  const signup = async (name, email, password) => {
    setIsLoading(true);
    setError(null);

    const response = await fetch('http://localhost:5000/api/auth/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, password }),
    });

    const json = await response.json();
    const token = json.token;

    if (!response.ok) {
      setIsLoading(false);
      setError(json.error);
    }

    if (response.ok) {
      toast.success('Your account was created successfully');
      //save user to local storage
      localStorage.setItem('user', JSON.stringify(json));

      //update context
      dispatch({ type: 'LOGIN', payload: json });

      await account(name, email, password, token);

      setIsLoading(false);
    }
  };

  return { signup, isLoading, error };
};
