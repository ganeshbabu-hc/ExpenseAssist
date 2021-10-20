import {Picker} from '@react-native-community/picker';
import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Pressable,
  ScrollView,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useDispatch} from 'react-redux';
import {UPDATE_EXPENSE_LIST} from '../../redux/constants/StoreConstants';
import AppHeader from '../common/AppHeader';
import {getExpenses, saveExpense} from '../database/expense/ExpenseController';
import {IExpense} from '../database/expense/ExpenseTypes';
import {colors, commonStyles, formStyles} from '../styles/common';
import {dateFormatter} from '../utils/Formatter';
import ExpenseCategoryList from './ExpenseCategotyList';
import PaymentsDropdown from './PaymentsDropdown';
import WeeklyView from './WeeklyView';

const AddExpense = ({navigation}) => {
  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState('');
  const [paymentId, setPaymentId] = useState(1);
  const [description, setDescription] = useState('');
  const [expenseCategoryId, setExpenseCategoryId] = useState(1);
  const [dateAddedTlm, setDateAddedTlm] = useState(() => {
    return dateFormatter(new Date());
  });
  const dispatch = useDispatch();

  const saveExpenseHandler = async () => {
    const expense: IExpense = {
      title,
      amount: Number(amount),
      paymentId: Number(paymentId),
      description,
      expenseCategoryId: Number(expenseCategoryId),
      currencyId: 47,
      dateAddedTlm,
    };
    const result = await saveExpense([expense]);
    if (result) {
      const savedExpenses = await getExpenses();
      dispatch({type: UPDATE_EXPENSE_LIST, payload: savedExpenses});
    }
  };

  return (
    <SafeAreaView>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentInsetAdjustmentBehavior="automatic">
        <View style={[commonStyles.container, styles.expenseWrapper]}>
          <AppHeader
            title="Add Expense"
            navigation={navigation}
            homeScreen={false}
            backTo=""
          />
          <WeeklyView onChange={setDateAddedTlm} />
          <View>
            <View style={formStyles.inputWrapper}>
              <Text style={formStyles.inputLabel}>Income title</Text>
              <TextInput
                placeholder="Eg, Spetember salary"
                style={formStyles.input}
                onChangeText={setTitle}
                value={title}
              />
            </View>
          </View>
          <View style={formStyles.inputContainer}>
            <View style={[formStyles.inputWrapper, formStyles.halfWidth]}>
              <Text style={formStyles.inputLabel}>Amount</Text>
              <TextInput
                keyboardType="number-pad"
                numberOfLines={1}
                placeholder="Eg, 20,000"
                style={formStyles.input}
                onChangeText={setAmount}
                value={amount}
              />
            </View>
            <View style={formStyles.inputDivider} />
            <PaymentsDropdown onChange={setPaymentId} />
          </View>
          <ExpenseCategoryList onChange={setExpenseCategoryId} />
          <View>
            <View style={formStyles.inputWrapper}>
              <Text style={formStyles.inputLabel}>Note</Text>
              <TextInput
                multiline
                numberOfLines={4}
                placeholder="Description"
                style={formStyles.input}
                onChangeText={setDescription}
                value={description}
              />
            </View>
          </View>
          <Pressable
            style={[formStyles.button, formStyles.fullWidth]}
            onPress={() => {
              saveExpenseHandler();
            }}>
            <Text style={formStyles.buttonLabel}>Save</Text>
          </Pressable>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  expenseWrapper: {
    backgroundColor: colors.brandLight,
    display: 'flex',
    overflow: 'scroll',
  },
});

export default AddExpense;
