const AccountDetails = ({ account }) => {
  return (
    <div className='account-details'>
      <div className='acc-titles'>
        <p>Account Name :</p>
        <p>Account Number :</p>
        <p>Account Date Created :</p>
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
