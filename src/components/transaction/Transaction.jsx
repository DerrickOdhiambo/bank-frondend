import { useState } from 'react';
import SelectDropdown from '../select/SelectDropdown';
import { useAccountContext } from '../../hooks/useAccountContext';
import { useAuthContext } from '../../hooks/useAuthContext';
import { useCreateTransactions } from '../../hooks/useCreateTransaction';

const options = [
  { value: 'deposit', label: 'Deposit' },
  { value: 'withdrawal', label: 'Withdraw' },
];
const Transaction = () => {
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

    const response = await fetch(
      `http://localhost:5000/api/account/${account._id}`,
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
      setError(null);
      setIsLoading(false);
      setFormData({
        transactionType: 'deposit',
        amount: '',
      });

      dispatch({ type: 'CREATE_ACCOUNT', payload: json });

      await transactions(formData, token);
    }
  };

  if (isLoading) {
    return <div>Loading ...</div>;
  }

  return (
    <div className='transactions'>
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
            placeholder={'Please choose the transaction you want...'}
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
