import { useState } from 'react';
import { useAuthContext } from './useAuthContext';

export const useFetch = () => {
  const [userTransactions, setUserTransactions] = useState([]);
  const { user } = useAuthContext();
  const token = user?.token;

  const fetchTransactions = async () => {
    const response = await fetch('http://localhost:5000/api/transactions/', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const json = await response.json();

    console.log(json);

    if (response.ok) {
      setUserTransactions(json);
    }
  };

  return { fetchTransactions, userTransactions };
};
