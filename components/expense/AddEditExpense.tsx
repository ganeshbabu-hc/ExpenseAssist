import {Picker} from '@react-native-community/picker';
import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Pressable,
  ScrollView,
  TouchableHighlight,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useDispatch, useSelector} from 'react-redux';
import {
  UPDATE_EXPENSE_LIST,
  UPDATE_SUMMARY,
} from '../../redux/constants/StoreConstants';
import AppHeader from '../common/AppHeader';
import {
  getExpenses,
  saveExpense,
  updateExpense,
} from '../database/expense/ExpenseController';
import {IExpense} from '../database/expense/ExpenseTypes';
import {colors, commonStyles, formStyles, ripple} from '../styles/theme';
import {dateFormatter} from '../utils/Formatter';
import ExpenseCategoryList from './ExpenseCategotyList';
import PaymentsDropdown from '../common/PaymentsDropdown';
import WeeklyView from '../common/WeeklyView';
import {ShowSnackBar} from '../common/Util';
import {getSummary} from '../database/common/SummaryController';
import { ICurrency } from '../database/common/CurrencyController';

interface IAddEditExpense {
  navigation: any;
  route?: any;
}

interface IErrorMessages {
  title?: string;
  amount?: string;
}

const defaultErrMsg: IErrorMessages = {
  title: '',
  amount: '',
};

const AddEditExpense = ({navigation, route}: IAddEditExpense) => {
  const currency: ICurrency = useSelector((state: any) => {
    return state.common.configuration.currency.value;
  });

  const {expense}: {expense: IExpense} = route.params;

  const [errMsg, setErrMsg] = useState<IErrorMessages>(defaultErrMsg);

  const [title, setTitle] = useState(() => {
    return expense?.title ?? '';
  });
  const [amount, setAmount] = useState(() => {
    return expense?.amount.toString() ?? '';
  });
  const [paymentId, setPaymentId] = useState(() => {
    return expense?.paymentId ?? 1;
  });
  const [description, setDescription] = useState(() => {
    return expense?.description ?? '';
  });
  const [expenseCategoryId, setExpenseCategoryId] = useState(() => {
    return expense?.expenseCategoryId ?? 1;
  });
  const [editMode] = useState(() => {
    return expense ? true : false;
  });
  const [dateAddedTlm, setDateAddedTlm] = useState(() => {
    return expense?.dateAddedTlm ?? dateFormatter(new Date());
    // return new Date();
  });
  const dispatch = useDispatch();

  const validateInputs = (): boolean => {
    const msg: IErrorMessages = {...defaultErrMsg};
    let isValid = true;
    if (!title.trim()) {
      msg.title = 'Income title is needed';
      isValid = false;
    }
    if (!amount.trim()) {
      msg.amount = 'Enter a valid amount';
      isValid = false;
    }
    setErrMsg(msg);
    return isValid;
  };

  const clearInputs = () => {
    setTitle('');
    setAmount('');
    setPaymentId(1);
    setDescription('');
    setExpenseCategoryId(1);
    setDateAddedTlm(dateFormatter(new Date()));
  };

  const saveEditExpenseHandler = async () => {
    if (!validateInputs()) {
      return;
    }

    const modExpense: IExpense = {
      expenseId: expense?.expenseId ?? undefined,
      title,
      amount: Number(amount),
      paymentId: Number(paymentId),
      description,
      expenseCategoryId: Number(expenseCategoryId),
      currencyId: 47,
      dateAddedTlm,
    };
    let result = null;
    if (editMode) {
      result = await updateExpense(modExpense);
      if (result) {
        ShowSnackBar(`${modExpense.title} is updated`);
        navigation.goBack();
      }
    } else {
      result = await saveExpense([modExpense]);
      if (result) {
        ShowSnackBar(`${modExpense.title} is saved`);
        clearInputs();
      }
    }
    const savedExpenses = await getExpenses();
    dispatch({type: UPDATE_EXPENSE_LIST, payload: savedExpenses});
    const summary = await getSummary();
    dispatch({type: UPDATE_SUMMARY, payload: summary});
  };

  useEffect(() => {
    setErrMsg(defaultErrMsg);
  }, [title, amount]);

  return (
    <SafeAreaView>
      <ScrollView
        keyboardDismissMode="interactive"
        keyboardShouldPersistTaps="always"
        showsVerticalScrollIndicator={false}
        contentInsetAdjustmentBehavior="automatic">
        <View style={[commonStyles.container, styles.expenseWrapper]}>
          <AppHeader
            title={`${editMode ? 'Edit' : 'Add'} Expense`}
            navigation={navigation}
            homeScreen={false}
            backTo=""
          />
          <WeeklyView defaultValue={dateAddedTlm} onChange={setDateAddedTlm} />
          <View>
            <View style={formStyles.inputWrapper}>
              <Text style={formStyles.inputLabel}>Expense title</Text>
              <TextInput
                placeholderTextColor={colors.grayCardText}
                placeholder="Eg, Spetember salary"
                style={formStyles.input}
                onChangeText={setTitle}
                value={title}
              />
              {errMsg.title !== '' && (
                <Text style={formStyles.inputError}>{errMsg.title}</Text>
              )}
            </View>
          </View>
          <View style={formStyles.inputContainer}>
            <View style={[formStyles.inputWrapper, formStyles.halfWidth]}>
              <Text style={formStyles.inputLabel}>
                {currency.symbol} Amount
              </Text>
              <TextInput
                placeholderTextColor={colors.grayCardText}
                keyboardType="number-pad"
                numberOfLines={1}
                placeholder="Eg, 20,000"
                style={formStyles.input}
                onChangeText={setAmount}
                value={amount}
              />
              {errMsg.amount !== '' && (
                <Text style={formStyles.inputError}>{errMsg.amount}</Text>
              )}
            </View>
            <View style={formStyles.inputDivider} />
            <PaymentsDropdown
              defaultValue={paymentId}
              onChange={setPaymentId}
            />
          </View>
          <ExpenseCategoryList
            navigation={navigation}
            defaultValue={expenseCategoryId}
            onChange={setExpenseCategoryId}
          />
          <View>
            <View style={formStyles.inputWrapper}>
              <Text style={formStyles.inputLabel}>Note</Text>
              <TextInput
                multiline
                numberOfLines={4}
                placeholder="Description"
                placeholderTextColor={colors.grayCardText}
                style={formStyles.input}
                onChangeText={setDescription}
                value={description}
              />
            </View>
          </View>
          <Pressable
            style={[formStyles.button, formStyles.fullWidth]}
            onPress={() => {
              saveEditExpenseHandler();
            }}>
            <Text style={formStyles.buttonLabel}>
              {editMode ? 'Save' : 'Add'}
            </Text>
          </Pressable>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  expenseWrapper: {
    backgroundColor: colors.brand.brandLight,
    display: 'flex',
    overflow: 'scroll',
  },
});

export default AddEditExpense;
