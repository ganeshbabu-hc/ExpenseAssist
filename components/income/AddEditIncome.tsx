import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Pressable,
  Animated,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useDispatch, useSelector } from 'react-redux';
import {
  SHOW_TOAST,
  UPDATE_TRANSACTION_LIST,
  UPDATE_SUMMARY,
} from '../../redux/constants/StoreConstants';
import AppHeader from '../common/AppHeader';
import { colors, commonStyles, formStyles } from '../styles/theme';
import { dateFormatter } from '../utils/Formatter';
import IncomeCategoryList from './IncomeCategoryList';
import PaymentsDropdown from '../common/PaymentsDropdown';
import WeeklyView from '../common/WeeklyView';
import { getSummary } from '../database/common/SummaryController';
import { ICurrency } from '../database/common/CurrencyController';
import ScrollViewWrapper from '../common/ScrollViewWrapper';
import { THEME } from '../utils/Constants';
import t from '../common/translations/Translation';
import { useRef } from 'react';
import {
  ITransaction,
  TransactionType,
} from '../database/transaction/TransactionTypes';
import {
  getTransactions,
  saveTransaction,
  updateTransaction,
} from '../database/transaction/TransactionController';
import TransactionCategotyList from '../database/transaction/TransactionCategotyList';

interface IAddEditIncome {
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

const AddEditIncome = ({ navigation, route }: IAddEditIncome) => {
  const scrollY = useRef(new Animated.Value(0)).current;
  const currency: ICurrency = useSelector((state: any) => {
    return state.common.configuration.currency.value;
  });
  const { income }: { income: ITransaction } = route.params;

  const [errMsg, setErrMsg] = useState<IErrorMessages>(defaultErrMsg);

  const [title, setTitle] = useState(() => {
    return income?.title ?? '';
  });
  const [amount, setAmount] = useState(() => {
    return income?.amount.toString() ?? '';
  });
  const [paymentId, setPaymentId] = useState(() => {
    return income?.paymentId ?? 1;
  });
  const [description, setDescription] = useState(() => {
    return income?.description ?? '';
  });
  const [transactionCategoryId, setTransactionCategoryId] = useState<
    number | null
  >(() => {
    return income?.transactionCategoryId ?? null;
  });
  const [editMode] = useState(() => {
    return income ? true : false;
  });
  const [dateAddedTlm, setDateAddedTlm] = useState(() => {
    return income?.dateAddedTlm ?? dateFormatter(new Date());
    // return new Date();
  });
  const dispatch = useDispatch();

  const validateInputs = (): boolean => {
    const msg: IErrorMessages = { ...defaultErrMsg };
    let isValid = true;
    if (!title.trim()) {
      msg.title = t('invalidIncomeTitle');
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

  const saveEditIncomeHandler = async () => {
    if (!validateInputs()) {
      return;
    }
    const modIncome: ITransaction = {
      transactionId: income?.transactionId ?? undefined,
      title,
      amount: Number(amount),
      paymentId: Number(paymentId),
      description,
      transactionType: TransactionType.INCOME,
      transactionCategoryId: Number(transactionCategoryId),
      currencyId: 47,
      dateAddedTlm,
    };
    let result = null;
    if (editMode) {
      result = await updateTransaction(modIncome);
      if (result) {
        dispatch({
          type: SHOW_TOAST,
          payload: [
            {
              title: t('incomeUpdated', { name: modIncome.title }),
            },
          ],
        });
        navigation.goBack();
      }
    } else {
      result = await saveTransaction([modIncome]);
      if (result) {
        dispatch({
          type: SHOW_TOAST,
          payload: [
            {
              title: t('incomeSaved', { name: modIncome.title }),
            },
          ],
        });
        clearInputs();
      }
    }
    const savedIncomes = await getTransactions(10, TransactionType.INCOME);
    dispatch({ type: UPDATE_TRANSACTION_LIST, payload: savedIncomes });
    const summary = await getSummary();
    dispatch({ type: UPDATE_SUMMARY, payload: summary });
  };
  useEffect(() => {
    setErrMsg(defaultErrMsg);
  }, [title, amount]);

  return (
    <SafeAreaView style={commonStyles.screen}>
      <View style={commonStyles.container}>
        <AppHeader
          title={`${editMode ? 'Edit' : 'Add'} Income`}
          navigation={navigation}
          homeScreen={false}
          backTo=""
          scrollY={scrollY}
        />
      </View>
      <ScrollViewWrapper scrollY={scrollY}>
        <View style={[commonStyles.container, styles.incomeWrapper]}>
          <WeeklyView defaultValue={dateAddedTlm} onChange={setDateAddedTlm} />
          <View>
            <View style={formStyles.inputWrapper}>
              <Text style={formStyles.inputLabel}>Income title</Text>
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
          <TransactionCategotyList
            navigation={navigation}
            type={TransactionType.INCOME}
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
                placeholderTextColor={colors.theme[THEME].textCardGray}
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
              saveEditIncomeHandler();
            }}>
            <Text style={formStyles.buttonLabel}>
              {editMode ? t('update') : t('add')}
            </Text>
          </Pressable>
        </View>
      </ScrollViewWrapper>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  incomeWrapper: {
    backgroundColor: colors.theme[THEME].brandLight,
    display: 'flex',
    flex: 1,
    marginTop: 30,
    marginVertical: 40,
  },
});

export default AddEditIncome;
