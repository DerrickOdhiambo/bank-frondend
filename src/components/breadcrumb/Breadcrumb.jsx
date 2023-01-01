import { Link } from 'react-router-dom';

const Breadcrumb = () => {
  return (
    <div className='breadcrumb'>
      <Link to='/'>My Account</Link>
      <div className='box'></div>
      <Link to='/transactions'>Transactions</Link>
    </div>
  );
};

export default Breadcrumb;
