import { useEffect } from 'react';
import { useAuthContext } from '../hooks/useAuthContext';
import { useFetch } from '../hooks/useFetch';

const Transactions = () => {
  const { user } = useAuthContext();
  const token = user?.token;

  const { fetchTransactions, userTransactions } = useFetch();

  useEffect(() => {
    const transactions = async () => {
      if (token) {
        await fetchTransactions();
      }
    };
    transactions();
    // eslint-disable-next-line
  }, []);

  return (
    <div>
      <h3>Transactions</h3>
      <div className='transcations'>
        <div className='table'>
          <table>
            <tbody>
              <tr>
                <th>ID</th>
                <th>Date</th>
                <th>Transaction</th>
                <th>Amount</th>
              </tr>
              {userTransactions?.map((item) => (
                <tr key={item?._id}>
                  <td>{item?._id}</td>
                  <td>{new Date(item?.createdAt).toLocaleDateString()}</td>
                  <td>{item?.transactionType}</td>
                  <td>{item?.amount}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Transactions;
