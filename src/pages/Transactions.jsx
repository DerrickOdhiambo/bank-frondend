import { useEffect } from 'react';
import { useAuthContext } from '../hooks/useAuthContext';
import { useFetch } from '../hooks/useFetch';

import Spinner from '../components/spinner/Spinner';
import Breadcrumb from '../components/breadcrumb/Breadcrumb';

const Transactions = () => {
  const { user } = useAuthContext();
  const token = user?.token;

  const { fetchTransactions, userTransactions, isLoading, error } = useFetch();

  useEffect(() => {
    const transactions = async () => {
      if (token) {
        await fetchTransactions();
      }
    };
    transactions();
    // eslint-disable-next-line
  }, []);

  if (isLoading) return <Spinner />;

  return (
    <>
      <Breadcrumb />
      <div>
        <h3>Transactions</h3>
        {error && <div className='error'>{error}</div>}
        <div className='transcations'>
          <div className='table'>
            <table>
              <tbody>
                <tr>
                  <th>Date</th>
                  <th>Transaction</th>
                  <th>Amount</th>
                </tr>
                {userTransactions?.map((item) => (
                  <tr key={item?._id}>
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
    </>
  );
};

export default Transactions;
