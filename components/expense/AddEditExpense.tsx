import React, {useEffect, useRef, useState} from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Pressable,
  Animated,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useDispatch, useSelector} from 'react-redux';
import {
  SHOW_TOAST,
  UPDATE_TRANSACTION_LIST,
  UPDATE_SUMMARY,
} from '../../redux/constants/StoreConstants';
import AppHeader from '../common/AppHeader';
import {
  getTransactions,
  saveTransaction,
  updateTransaction,
} from '../database/transaction/TransactionController';
import {ITransaction, TransactionType} from '../database/transaction/TransactionTypes';
import {colors, commonStyles, formStyles} from '../styles/theme';
import {dateFormatter} from '../utils/Formatter';
import ExpenseCategoryList from './ExpenseCategotyList';
import PaymentsDropdown from '../common/PaymentsDropdown';
import WeeklyView from '../common/WeeklyView';
import {getSummary} from '../database/common/SummaryController';
import {ICurrency} from '../database/common/CurrencyController';
import ScrollViewWrapper from '../common/ScrollViewWrapper';
import {THEME} from '../utils/Constants';
import t from '../common/translations/Translation';

interface IAddEditExpense {
  navigation: any;
  route?: any;
}

interface IErrorMessages {
  title?: string;
  amount?: string;
  transactionCategoryId?: string;
}

const defaultErrMsg: IErrorMessages = {
  title: '',
  amount: '',
  transactionCategoryId: '',
};

const AddEditExpense = ({navigation, route}: IAddEditExpense) => {
  const scrollY = useRef(new Animated.Value(0)).current;

  const currency: ICurrency = useSelector((state: any) => {
    return state.common.configuration.currency.value;
  });

  const {expense}: {expense: ITransaction} = route.params;

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
  const [transactionCategoryId, setTransactionCategoryId] = useState<
    number | null
  >(() => {
    return expense?.transactionCategoryId ?? null;
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
      msg.title = t('invalidExpenseTitle');
      isValid = false;
    }
    if (!amount.trim()) {
      msg.amount = t('invalidAmount');
      isValid = false;
    }

    if (transactionCategoryId == null) {
      msg.transactionCategoryId = t('invalidtransactionCatgoeryId');
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
    // setTransactionCategoryId(null);
    setDateAddedTlm(dateFormatter(new Date()));
  };

  const saveEditExpenseHandler = async () => {
    if (!validateInputs()) {
      return;
    }

    const modExpense: ITransaction = {
      transactionId: expense?.transactionId ?? undefined,
      title,
      amount: Number(amount),
      paymentId: Number(paymentId),
      transactionType: TransactionType.EXPENSE,
      description,
      transactionCategoryId: Number(transactionCategoryId),
      currencyId: 47,
      dateAddedTlm,
    };
    let result = null;
    if (editMode) {
      result = await updateTransaction(modExpense);
      if (result) {
        dispatch({
          type: SHOW_TOAST,
          payload: [
            {
              title: t('expenseUpdated', {name: modExpense.title}),
            },
          ],
        });
        navigation.goBack();
      }
    } else {
      result = await saveTransaction([modExpense]);
      if (result) {
        dispatch({
          type: SHOW_TOAST,
          payload: [
            {
              title: t('expenseSaved', {name: modExpense.title}),
            },
          ],
        });
        clearInputs();
      }
    }
    const savedExpenses = await getTransactions(10, TransactionType.EXPENSE);
    dispatch({type: UPDATE_TRANSACTION_LIST, payload: savedExpenses});
    const summary = await getSummary();
    dispatch({type: UPDATE_SUMMARY, payload: summary});
  };

  useEffect(() => {
    setErrMsg(defaultErrMsg);
  }, [title, amount]);

  return (
    <SafeAreaView style={commonStyles.screen}>
      <View style={commonStyles.container}>
        <AppHeader
          title={`${editMode ? 'Edit' : 'Add'} Expense`}
          navigation={navigation}
          homeScreen={false}
          backTo=""
          scrollY={scrollY}
        />
      </View>
      <ScrollViewWrapper scrollY={scrollY}>
        <View style={[commonStyles.container, styles.expenseWrapper]}>
          <WeeklyView defaultValue={dateAddedTlm} onChange={setDateAddedTlm} />
          <View>
            <View style={formStyles.inputWrapper}>
              <Text style={formStyles.inputLabel}>Expense title</Text>
              <TextInput
                placeholderTextColor={colors.theme[THEME].textCardGray}
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
                placeholderTextColor={colors.theme[THEME].textCardGray}
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
            defaultValue={transactionCategoryId}
            onChange={setTransactionCategoryId}
          />
          {errMsg.transactionCategoryId !== '' && (
            <Text style={formStyles.inputError}>
              {errMsg.transactionCategoryId}
            </Text>
          )}
          <View>
            <View style={formStyles.inputWrapper}>
              <Text style={formStyles.inputLabel}>Note</Text>
              <TextInput
                multiline
                numberOfLines={4}
                placeholder="Description"
                placeholderTextColor={colors.theme[THEME].textCardGray}
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
              {editMode ? 'Update' : 'Add'}
            </Text>
          </Pressable>
        </View>
      </ScrollViewWrapper>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  expenseWrapper: {
    backgroundColor: colors.theme[THEME].brandLight,
    display: 'flex',
    flex: 1,
    marginTop: 30,
    marginVertical: 40,
  },
});

export default AddEditExpense;
