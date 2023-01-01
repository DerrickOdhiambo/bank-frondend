import Balance from '../components/balance/Balance';
import Breadcrumb from '../components/breadcrumb/Breadcrumb';
import Transaction from '../components/transaction/Transaction';

const Homepage = () => {
  return (
    <div>
      <Breadcrumb />
      <Balance />
      <Transaction />
    </div>
  );
};

export default Homepage;
