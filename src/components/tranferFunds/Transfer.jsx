import { useState } from 'react';
import { useAccountContext } from '../../hooks/useAccountContext';
import { useAuthContext } from '../../hooks/useAuthContext';

import Spinner from '../spinner/Spinner';

const Transfer = () => {
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);

  const { account, dispatch } = useAccountContext();
  const { user } = useAuthContext();

  const [formData, setFormData] = useState({
    accountNumber: 0,
    amount: 0,
  });

  const token = user?.token;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const response = await fetch(
      `https://badbankproject-api.onrender.com/api/account/transfer/${account._id}`,
      {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      }
    );
    const { message, updatedUserAccount, error } = await response.json();

    if (!response.ok) {
      setIsLoading(false);
      setError(error);
    }

    if (response.ok) {
      setError(null);
      setIsLoading(false);
      setMessage(message);
      setFormData({
        accountNumber: 0,
        amount: 0,
      });

      dispatch({ type: 'CREATE_ACCOUNT', payload: updatedUserAccount });
    }
  };

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <div className='transfer-funds'>
      {message && <div className='success-message'>{message}</div>}
      <h4>Transact</h4>
      <p>You can easily deposit and withdraw money from your account</p>
      <form onSubmit={handleSubmit}>
        <div className='form-control'>
          <label htmlFor='accountNumber'>Account Number</label>
          <input
            type='number'
            name='accountNumber'
            id='accountNumber'
            onChange={(e) =>
              setFormData({ ...formData, accountNumber: e.target.value })
            }
            value={formData.accountNumber}
          />
        </div>
        <div className='form-control'>
          <label htmlFor='amount'>Amount</label>
          <input
            type='number'
            name='amount'
            id='amount'
            onChange={(e) =>
              setFormData({ ...formData, amount: e.target.value })
            }
            value={formData.amount}
          />
        </div>
        <button disabled={!formData.accountNumber || !formData.amount}>
          Tranfer Funds
        </button>
        {error && <div className='error'>{error}</div>}
      </form>
    </div>
  );
};

export default Transfer;
