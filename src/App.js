import React from 'react';
import { PersistGate } from 'redux-persist/integration/react';
import { ToastContainer } from 'react-toastify';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';
import { ModalProvider } from 'styled-react-modal';

import '~/config/ReactotronConfig';

import history from '~/services/history';
import { store, persistor } from '~/store';
import Routes from '~/routes';
import GlobalStyle from '~/styles/global';

function App() {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <Router history={history}>
          <ModalProvider>
            <GlobalStyle />
            <ToastContainer autoClose={3000} />
            <Routes />
          </ModalProvider>
        </Router>
      </PersistGate>
    </Provider>
  );
}

export default App;
