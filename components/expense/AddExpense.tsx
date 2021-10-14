import {Picker} from '@react-native-community/picker';
import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  Button,
  TextInput,
  StyleSheet,
  Pressable,
  ScrollView,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import AppHeader from '../common/AppHeader';
import {colors, commonStyles, formStyles} from '../styles/common';
import ExpenseCategoryList from './ExpenseCategotyList';

const AddExpense = ({navigation}) => {
  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState('');
  const [payType, setPayType] = useState(1);
  const [description, setDescription] = useState('');
  const [expenseCategory, setExpenseCategory] = useState();

  const saveExpense = () => {
    console.log('saveExpense');
    console.log(
      'title:',
      title,
      'amount:',
      amount,
      'payType:',
      payType,
      'description:',
      description,
      'expenseCategory:',
      expenseCategory,
    );
  };

  useEffect(() => {
    console.log(expenseCategory);
  }, [expenseCategory]);

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
            <View style={[formStyles.inputWrapper, formStyles.halfWidth]}>
              <Text style={formStyles.inputLabel}>Pay type</Text>
              <View style={formStyles.select}>
                <Picker
                  selectedValue={payType}
                  style={formStyles.pickerItemStyle}
                  itemStyle={formStyles.pickerItemStyle}
                  onValueChange={itemValue => setPayType(itemValue)}>
                  <Picker.Item label="UPI" value="1" />
                  <Picker.Item label="Cash" value="2" />
                  <Picker.Item label="Accounts" value="3" />
                </Picker>
              </View>
            </View>
          </View>
          <ExpenseCategoryList onChange={setExpenseCategory} />
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
              saveExpense();
            }}>
            <Text style={formStyles.button.label}>Save</Text>
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
