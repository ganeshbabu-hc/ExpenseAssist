import React, {useEffect} from 'react';
import {Text} from 'react-native';
import {getExpenses} from '../database/expense/ExpenseController';
import IconMap from './IconMap';

const RecentExpenses = () => {
  useEffect(() => {
    const list = getExpenses();
    console.log('--getExpenses--', list);
  }, []);
  return (
    <React.Fragment>
      <IconMap iconName="cash" />
      <Text>Hai</Text>
    </React.Fragment>
  );
};

export default RecentExpenses;
