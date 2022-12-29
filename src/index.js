import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

//context
import { AuthContextProvider } from './context/AuthContext';
import { AccountsContextProvider } from './context/AccountContext';
import { TransactionsContextProvider } from './context/TransactionsContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthContextProvider>
      <AccountsContextProvider>
        <TransactionsContextProvider>
          <App />
        </TransactionsContextProvider>
      </AccountsContextProvider>
    </AuthContextProvider>
  </React.StrictMode>
);
