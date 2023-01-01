const AccountDetails = ({ account }) => {
  return (
    <div className='account-details'>
      <div className='acc-titles'>
        <p>Name :</p>
        <p>Number :</p>
        <p>Date :</p>
      </div>
      <div>
        <p>{account.name}</p>
        <p>{'0000' + account.accountNumber}</p>
        <p>{new Date(account.createdAt).toLocaleDateString()}</p>
      </div>
    </div>
  );
};

export default AccountDetails;
