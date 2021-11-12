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
import {UPDATE_EXPENSE_CATEGORIES_LIST} from '../../redux/constants/StoreConstants';
import AppHeader from './AppHeader';
import {
  getExpenseCaetegories,
  getExpenses,
  saveExpense,
  updateExpense,
} from '../database/expense/ExpenseController';
import {IExpense, IExpenseCategory} from '../database/expense/ExpenseTypes';
import {colors, commonStyles, formStyles} from '../styles/theme';
import {dateFormatter} from '../utils/Formatter';
import PaymentsDropdown from './PaymentsDropdown';
import WeeklyView from './WeeklyView';
import {ShowSnackBar} from './Util';
import {getSummary} from '../database/common/SummaryController';
import {
  saveExpenseCategory,
  saveIncomeCategory,
} from '../database/common/CommonController';
import {IIncomeCategory} from '../database/income/IncomeTypes';
import { THEME } from '../utils/Constants';

interface IAddEditCategory {
  navigation: any;
  route?: any;
  type?: 'income' | 'expense';
}

interface IErrorMessages {
  title?: string;
  amount?: string;
}

const defaultErrMsg: IErrorMessages = {
  title: '',
  amount: '',
};

const AddEditCategory = ({navigation, route, type}: IAddEditCategory) => {
  const {expenseCategory}: {expenseCategory: IExpenseCategory} = route.params
    .expenseCategory ?? {undefined};
  // const {expense}: {expense: IExpense} = route.params;

  const categoryType = type || route?.params?.type;

  const [errMsg, setErrMsg] = useState<IErrorMessages>(defaultErrMsg);

  const [title, setTitle] = useState(() => {
    return expenseCategory?.title ?? '';
  });
  // const [categoryId, setCategoryId] = useState(() => {
  //   return expense?.paymentId ?? 1;
  // });
  const [description, setDescription] = useState(() => {
    return expenseCategory?.description ?? '';
  });
  const [editMode] = useState(() => {
    return expenseCategory ? true : false;
  });
  const dispatch = useDispatch();

  const validateInputs = (): boolean => {
    const msg: IErrorMessages = {...defaultErrMsg};
    let isValid = true;
    if (!title.trim()) {
      msg.title = 'Category title is needed';
      isValid = false;
    }
    setErrMsg(msg);
    return isValid;
  };

  const clearInputs = () => {
    setTitle('');
    // setCategoryId(1);
    setDescription('');
  };
  const saveExpenseCategoryHandler = async () => {
    console.log('save--validateInputs');
    if (!validateInputs()) {
      return;
    }
    console.log('save--category');

    let modCategory: IExpenseCategory = {
      expenseCategoryId: expenseCategory?.expenseCategoryId ?? undefined,
      title,
      description,
    };
    let result = null;
    if (editMode) {
      // result = await updateExpense(modExpense);
      // if (result) {
      //   ShowSnackBar(`${modExpense.title} is updated`);
      //   navigation.goBack();
      // }
    } else {
      result = await saveExpenseCategory(modCategory);
      if (result) {
        ShowSnackBar(`Category: ${modCategory.title} is added`);
        navigation.goBack();
      }
    }
    const expenseCategories = await getExpenseCaetegories();
    dispatch({
      type: UPDATE_EXPENSE_CATEGORIES_LIST,
      payload: expenseCategories,
    });
  };

  useEffect(() => {
    setErrMsg(defaultErrMsg);
  }, [title]);

  return (
    <SafeAreaView style={commonStyles.screen}>
      <ScrollView
        keyboardDismissMode="interactive"
        keyboardShouldPersistTaps="always"
        showsVerticalScrollIndicator={false}
        contentInsetAdjustmentBehavior="automatic">
        <View style={[commonStyles.container, styles.categoryWrapper]}>
          <AppHeader
            title={`${editMode ? 'Edit' : 'Add'} Category`}
            navigation={navigation}
            homeScreen={false}
            backTo=""
          />
          <View>
            <View style={formStyles.inputWrapper}>
              <Text style={formStyles.inputLabel}>Category name</Text>
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
          <View>
            <View style={formStyles.inputWrapper}>
              <Text style={formStyles.inputLabel}>Description</Text>
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
              console.log('save--validateInputs', categoryType);
              if (categoryType === 'expense') {
                saveExpenseCategoryHandler();
              } else {
                // saveIncomeCategoryHandler();
              }
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
  categoryWrapper: {
    backgroundColor: colors.theme[THEME].brandLight,
    display: 'flex',
    overflow: 'scroll',
  },
});

export default AddEditCategory;
