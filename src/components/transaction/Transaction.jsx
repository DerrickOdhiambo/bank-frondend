import { useState } from 'react';
import SelectDropdown from '../select/SelectDropdown';
import { useAccountContext } from '../../hooks/useAccountContext';
import { useAuthContext } from '../../hooks/useAuthContext';
import { useCreateTransactions } from '../../hooks/useCreateTransaction';

import Spinner from '../spinner/Spinner';

const options = [
  { value: 'deposit', label: 'Deposit' },
  { value: 'withdrawal', label: 'Withdraw' },
];
const Transaction = () => {
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);

  const { account, dispatch } = useAccountContext();
  const { user } = useAuthContext();
  const { transactions } = useCreateTransactions();

  const [formData, setFormData] = useState({
    transactionType: '',
    amount: 0,
  });

  const token = user?.token;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const response = await fetch(
      `https://badbankproject-api.onrender.com/api/account/${account._id}`,
      {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      }
    );
    const json = await response.json();

    if (!response.ok) {
      setIsLoading(false);
      setError(json.error);
    }

    if (response.ok) {
      setMessage(`Your transaction was successful`);
      setError(null);
      setIsLoading(false);
      setFormData({
        transactionType: 'deposit',
        amount: 0,
      });

      dispatch({ type: 'CREATE_ACCOUNT', payload: json });

      await transactions(formData, token);
    }
  };

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <div className='transactions'>
      {message && <div className='success-message'>{message}</div>}
      <h4>Transact</h4>
      <p>You can easily deposit and withdraw money from your account</p>
      <form onSubmit={handleSubmit}>
        <div className='form-control'>
          <SelectDropdown
            value={formData.transactionType}
            options={options}
            onChange={(e) =>
              setFormData({ ...formData, transactionType: e.value })
            }
            placeholder={'Choose transaction...'}
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
        <button disabled={!formData.transactionType || !formData.amount}>
          {formData.transactionType === 'withdrawal'
            ? 'Withdraw Funds'
            : 'Deposit Funds'}
        </button>
        {error && <div className='error'>{error}</div>}
      </form>
    </div>
  );
};

export default Transaction;
