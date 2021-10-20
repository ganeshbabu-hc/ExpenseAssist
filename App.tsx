import React from 'react';
import {Provider} from 'react-redux';
import {getDBConnection} from './components/database/DBController';
import Router from './components/Router';
import configureStore from './redux/store/ConfigureStore';
const store = configureStore();

const App = () => {
  getDBConnection();
  return (
    <Provider store={store}>
      <Router />
    </Provider>
  );
};

export default App;
