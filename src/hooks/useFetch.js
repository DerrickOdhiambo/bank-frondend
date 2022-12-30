import { useState } from 'react';
import { useAuthContext } from './useAuthContext';

export const useFetch = () => {
  const [userTransactions, setUserTransactions] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);

  const { user } = useAuthContext();
  const token = user?.token;

  const fetchTransactions = async () => {
    setIsLoading(true);
    setError(null);

    const response = await fetch(
      'https://badbankproject-api.onrender.com/api/transactions/',
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const json = await response.json();

    if (!response.ok) {
      setIsLoading(false);
      setError(json.error);
    }

    if (response.ok) {
      setIsLoading(false);
      setError(null);
      setUserTransactions(json);
    }
  };

  return { fetchTransactions, userTransactions, isLoading, error };
};
