import React from 'react';
import { Provider } from 'react-redux';
import configureStore from './redux/store/ConfigureStore';
import AppWrapper from './AppWrapper';

const store = configureStore();
const App = () => {
  return (
    <Provider store={store}>
      <AppWrapper />
    </Provider>
  );
};

export default App;
