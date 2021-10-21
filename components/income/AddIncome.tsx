import React, {useState} from 'react';
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
import {UPDATE_INCOME_LIST} from '../../redux/constants/StoreConstants';
import AppHeader from '../common/AppHeader';
import {getIncomes, saveIncome} from '../database/income/IncomeController';
import {IIncome} from '../database/income/IncomeTypes';
import {colors, commonStyles, formStyles} from '../styles/common';
import {dateFormatter} from '../utils/Formatter';
import IncomeCategoryList from './IncomeCategoryList';
import PaymentsDropdown from '../common//PaymentsDropdown';
import WeeklyView from '../common/WeeklyView';
import { ShowSnackBar } from '../common/Util';

const AddIncome = ({navigation}) => {
  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState('');
  const [paymentId, setPaymentId] = useState(1);
  const [description, setDescription] = useState('');
  const [incomeCategoryId, setIncomeCategoryId] = useState(1);
  const [dateAddedTlm, setDateAddedTlm] = useState(() => {
    return dateFormatter(new Date());
    // return new Date();
  });
  const dispatch = useDispatch();

  const saveIncomeHandler = async () => {
    const income: IIncome = {
      title,
      amount: Number(amount),
      paymentId: Number(paymentId),
      description,
      incomeCategoryId: Number(incomeCategoryId),
      currencyId: 47,
      dateAddedTlm,
    };
    const result = await saveIncome([income]);
    if (result) {
      ShowSnackBar(`${income.title} is saved`);
      const savedIncomes = await getIncomes();
      dispatch({type: UPDATE_INCOME_LIST, payload: savedIncomes});
    }
  };

  return (
    <SafeAreaView>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentInsetAdjustmentBehavior="automatic">
        <View style={[commonStyles.container, styles.incomeWrapper]}>
          <AppHeader
            title="Add Income"
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
          <IncomeCategoryList onChange={setIncomeCategoryId} />
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
              saveIncomeHandler();
            }}>
            <Text style={formStyles.buttonLabel}>Save</Text>
          </Pressable>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  incomeWrapper: {
    backgroundColor: colors.brandLight,
    display: 'flex',
    overflow: 'scroll',
  },
});

export default AddIncome;
