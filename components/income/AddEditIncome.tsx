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
import {
  UPDATE_INCOME_LIST,
  UPDATE_SUMMARY,
} from '../../redux/constants/StoreConstants';
import AppHeader from '../common/AppHeader';
import {
  getIncomes,
  saveIncome,
  updateIncome,
} from '../database/income/IncomeController';
import {IIncome} from '../database/income/IncomeTypes';
import {colors, commonStyles, formStyles} from '../styles/theme';
import {dateFormatter} from '../utils/Formatter';
import IncomeCategoryList from './IncomeCategoryList';
import PaymentsDropdown from '../common/PaymentsDropdown';
import WeeklyView from '../common/WeeklyView';
import {ShowSnackBar} from '../common/Util';
import {getSummary} from '../database/common/SummaryController';

interface IAddEditIncome {
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

const AddEditIncome = ({navigation, route}: IAddEditIncome) => {
  const {income}: {income: IIncome} = route.params;

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
  const [incomeCategoryId, setIncomeCategoryId] = useState(() => {
    return income?.incomeCategoryId ?? 1;
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
    setIncomeCategoryId(1);
    setDateAddedTlm(dateFormatter(new Date()));
  };

  const saveEditIncomeHandler = async () => {
    if (!validateInputs()) {
      return;
    }
    const modIncome: IIncome = {
      incomeId: income?.incomeId ?? undefined,
      title,
      amount: Number(amount),
      paymentId: Number(paymentId),
      description,
      incomeCategoryId: Number(incomeCategoryId),
      currencyId: 47,
      dateAddedTlm,
    };
    let result = null;
    if (editMode) {
      result = await updateIncome(modIncome);
      if (result) {
        ShowSnackBar(`${modIncome.title} is updated`);
        navigation.goBack();
      }
    } else {
      result = await saveIncome([modIncome]);
      if (result) {
        ShowSnackBar(`${modIncome.title} is saved`);
        clearInputs();
      }
    }
    const savedIncomes = await getIncomes();
    dispatch({type: UPDATE_INCOME_LIST, payload: savedIncomes});
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
        <View style={[commonStyles.container, styles.incomeWrapper]}>
          <AppHeader
            title={`${editMode ? 'Edit' : 'Add'} Income`}
            navigation={navigation}
            homeScreen={false}
            backTo=""
          />
          <WeeklyView defaultValue={dateAddedTlm} onChange={setDateAddedTlm} />
          <View>
            <View style={formStyles.inputWrapper}>
              <Text style={formStyles.inputLabel}>Income title</Text>
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
              <Text style={formStyles.inputLabel}>Amount</Text>
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
          <IncomeCategoryList
            navigation={navigation}
            defaultValue={incomeCategoryId}
            onChange={setIncomeCategoryId}
          />
          <View>
            <View style={formStyles.inputWrapper}>
              <Text style={formStyles.inputLabel}>Note</Text>
              <TextInput
                multiline
                placeholderTextColor={colors.grayCardText}
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
              {editMode ? 'Save' : 'Add'}
            </Text>
          </Pressable>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  incomeWrapper: {
    backgroundColor: colors.brand.brandLight,
    display: 'flex',
    overflow: 'scroll',
  },
});

export default AddEditIncome;
