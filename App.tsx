import * as React from 'react';
import {getDBConnection} from './components/database/DBController';
import Router from './components/Router';

const App = () => {
  getDBConnection();
  return <Router />;
};

export default App;
