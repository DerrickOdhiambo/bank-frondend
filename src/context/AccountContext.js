import { useReducer, createContext, useEffect } from 'react';

export const AccountsContext = createContext();

export const accountReducer = (state, action) => {
  switch (action.type) {
    case 'SET_ACCOUNT':
      return { account: action.payload };
    case 'CREATE_ACCOUNT':
      return { account: action.payload };
    case 'UPDATE_ACCOUNT':
      return { account: action.payload };
    default:
      return state;
  }
};

export const AccountsContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(accountReducer, {
    account: null,
  });

  useEffect(() => {
    const account = JSON.parse(localStorage.getItem('account'));

    if (account) {
      dispatch({ type: 'SET_ACCOUNT', payload: account });
    }
  }, []);

  return (
    <AccountsContext.Provider value={{ ...state, dispatch }}>
      {children}
    </AccountsContext.Provider>
  );
};
