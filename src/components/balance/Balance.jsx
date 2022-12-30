import { useEffect, useRef, useState } from 'react';
import { useAccountContext } from '../../hooks/useAccountContext';
import { useAuthContext } from '../../hooks/useAuthContext';
import jwt from 'jwt-decode';

import Modal from '../modal/Modal';
import Spinner from '../spinner/Spinner';

import { numberWithSpaces, roundToTwo } from '../../utils/utils';

import { HiOutlineArrowNarrowRight } from 'react-icons/hi';
import AccountDetails from '../accDetails/AccountDetails';

const Balance = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);

  const modalRef1 = useRef();

  const { account, dispatch } = useAccountContext();
  const { user } = useAuthContext();
  const token = user?.token;
  const decoded = jwt(token);
  const id = decoded?._id;

  useEffect(() => {
    const fetchTranscations = async () => {
      setIsLoading(true);
      setError(null);

      if (token && id) {
        const response = await fetch(
          `https://badbankproject-api.onrender.com/api/account/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const json = await response.json();

        if (!response.ok) {
          setIsLoading(false);
          setError(json.error);
        }

        if (response.ok) {
          setIsLoading(false);
          //persist bank account details to local storage
          localStorage.setItem('account', JSON.stringify(json));

          dispatch({ type: 'CREATE_ACCOUNT', payload: json });
        }
      }
    };

    fetchTranscations();
  }, [dispatch, token, id]);

  let accNum = 0;

  if (account?.accountNumber) {
    accNum = numberWithSpaces(account?.accountNumber);
  }

  if (isLoading) return <Spinner />;

  return (
    <div className='homepage'>
      <div className='homepage-card'>
        <div className='card-heading'>
          <p>Main account</p>
          <p className='available-funds'>Available funds</p>
        </div>
        <div className='card-body'>
          <div className='savings'>
            <h3>Savings account</h3>
            <span>
              {'0000 ' + accNum} <HiOutlineArrowNarrowRight />
            </span>
          </div>
          <div className='funds'>
            <p className='responsive-funds'>Available funds</p>
            <p>
              {roundToTwo(account?.balance)} <span>$</span>
            </p>
          </div>
        </div>
        <div className='card-footer'>
          <button
            className='account-details-btn'
            onClick={() => modalRef1.current.open()}
          >
            Account Details
          </button>
          <Modal ref={modalRef1}>
            <div>
              <h3>Account Details</h3>
              <AccountDetails account={account} />
            </div>
          </Modal>
          {error && <div className='error'>{error}</div>}
        </div>
      </div>
      <div className='advert-card'>
        <div className='card-description'>
          <h3>BadBank </h3>
          <p>A partner for life</p>
          <p>This is where we help you reach your true potential</p>
        </div>
        <div className='card-image'>
          <img src='/assets/bank.png' alt='bank' />
        </div>
      </div>
    </div>
  );
};

export default Balance;
