import { useState } from 'react';

export const useCreateTransactions = () => {
  const [userTransactions, setUserTransactions] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);

  const transactions = async (data, token) => {
    setIsLoading(true);
    setError(null);

    //create bank account
    const newTransactions = await fetch(
      'http://localhost:5000/api/transactions/',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      }
    );

    const res = await newTransactions.json();

    if (newTransactions.ok) {
      setUserTransactions(res);
    }
  };
  return { transactions, error, isLoading, userTransactions };
};
