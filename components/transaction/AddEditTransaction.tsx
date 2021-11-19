import React, { useEffect, useRef, useState } from 'react';
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
import { SHOW_TOAST } from '../../redux/constants/StoreConstants';
import AppHeader from '../common/AppHeader';
import {
  saveTransaction,
  updateTransaction,
} from '../transaction/TransactionController';
import { ITransaction, TransactionType } from '../transaction/TransactionTypes';
import { colors, commonStyles, formStyles } from '../styles/theme';
import { dateFormatter } from '../utils/Formatter';
import PaymentsDropdown from '../common/PaymentsDropdown';
import WeeklyView from '../common/WeeklyView';
import ScrollViewWrapper from '../common/ScrollViewWrapper';
import { THEME } from '../utils/Constants';
import t from '../common/translations/Translation';
import TransactionCategotyList from '../transaction/TransactionCategotyList';
import { ICurrency } from '../database/common/CurrencyController';

interface IAddEditTransaction {
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

const AddEditTransaction = ({ navigation, route }: IAddEditTransaction) => {
  const scrollY = useRef(new Animated.Value(0)).current;

  const currency: ICurrency = useSelector((state: any) => {
    return state.common.configuration.currency.value;
  });

  const { transaction }: { transaction: ITransaction } = route.params;

  const transactionType: TransactionType =
    transaction?.transactionType ?? route.params.type;

  const [errMsg, setErrMsg] = useState<IErrorMessages>(defaultErrMsg);
  const [title, setTitle] = useState(() => {
    return transaction?.title ?? '';
  });
  const [amount, setAmount] = useState(() => {
    return transaction?.amount.toString() ?? '';
  });
  const [paymentId, setPaymentId] = useState(() => {
    return transaction?.paymentId ?? 1;
  });
  const [description, setDescription] = useState(() => {
    return transaction?.description ?? '';
  });
  const [transactionCategoryId, setTransactionCategoryId] = useState<
    number | null
  >(() => {
    return transaction?.transactionCategoryId ?? null;
  });
  const [editMode] = useState(() => {
    return transaction ? true : false;
  });
  const [dateAddedTlm, setDateAddedTlm] = useState(() => {
    return transaction?.dateAddedTlm ?? dateFormatter(new Date());
    // return new Date();
  });
  const dispatch = useDispatch();

  const validateInputs = (): boolean => {
    const msg: IErrorMessages = { ...defaultErrMsg };
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

  const saveEditTransactioneHandler = async () => {
    if (!validateInputs()) {
      return;
    }

    const modTransaction: ITransaction = {
      transactionId: transaction?.transactionId ?? undefined,
      title,
      amount: Number(amount),
      paymentId: Number(paymentId),
      transactionType: transactionType,
      description,
      transactionCategoryId: Number(transactionCategoryId),
      currencyId: 47,
      dateAddedTlm,
    };
    let result = null;
    if (editMode) {
      result = await updateTransaction(modTransaction);
      const titleType =
        transactionType === TransactionType.INCOME
          ? 'incomeUpdated'
          : 'expenseUpdated';
      if (result) {
        dispatch({
          type: SHOW_TOAST,
          payload: [
            {
              title: t(titleType, { name: modTransaction.title }),
            },
          ],
        });
        navigation.goBack();
      }
    } else {
      result = await saveTransaction([modTransaction]);
      const titleType =
        transactionType === TransactionType.INCOME
          ? 'incomeSaved'
          : 'expenseSaved';
      if (result) {
        dispatch({
          type: SHOW_TOAST,
          payload: [
            {
              title: t(titleType, { name: modTransaction.title }),
            },
          ],
        });
        // clearInputs();
      }
    }
  };

  // const appTitle = transactionType ===

  const getAppTitle = (): string => {
    if (editMode) {
      return transactionType === TransactionType.INCOME
        ? t('EditIncome')
        : t('EditExpense');
    } else {
      return transactionType === TransactionType.INCOME
        ? t('AddIncome')
        : t('AddExpense');
    }
  };

  useEffect(() => {
    setErrMsg(defaultErrMsg);
  }, [title, amount]);

  return (
    <SafeAreaView style={commonStyles.screen}>
      <View style={commonStyles.container}>
        <AppHeader
          title={getAppTitle()}
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
                {currency.symbol} {t('amount')}
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
            defaultValue={transactionCategoryId}
            onChange={setTransactionCategoryId}
            type={TransactionType.EXPENSE}
          />
          {errMsg.transactionCategoryId !== '' && (
            <Text style={formStyles.inputError}>
              {errMsg.transactionCategoryId}
            </Text>
          )}
          <View>
            <View style={formStyles.inputWrapper}>
              <Text style={formStyles.inputLabel}>{t('note')}</Text>
              <TextInput
                multiline
                numberOfLines={4}
                placeholder={t('description')}
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
              saveEditTransactioneHandler();
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
  expenseWrapper: {
    backgroundColor: colors.theme[THEME].brandLight,
    display: 'flex',
    flex: 1,
    marginTop: 30,
    marginVertical: 40,
  },
});

export default AddEditTransaction;
