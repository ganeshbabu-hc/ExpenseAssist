import React, {useEffect} from 'react';
import {Text} from 'react-native';
import {getExpenses} from '../database/expense/ExpenseController';

const RecentExpenses = () => {
  useEffect(() => {
    const list = getExpenses();
    console.log('--getExpenses--', list);
  }, []);
  return <Text>Hai</Text>;
};

export default RecentExpenses;
