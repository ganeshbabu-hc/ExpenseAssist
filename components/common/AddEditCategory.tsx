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
import {
  UPDATE_EXPENSE_LIST,
  UPDATE_SUMMARY,
} from '../../redux/constants/StoreConstants';
import AppHeader from './AppHeader';
import {
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
  const {expense}: {expense: IExpense} = route.params;

  const [errMsg, setErrMsg] = useState<IErrorMessages>(defaultErrMsg);

  const [title, setTitle] = useState(() => {
    return expense?.title ?? '';
  });
  const [categoryId, setCategoryId] = useState(() => {
    return expense?.paymentId ?? 1;
  });
  const [description, setDescription] = useState(() => {
    return expense?.description ?? '';
  });
  const [editMode] = useState(() => {
    return expense ? true : false;
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
    setCategoryId(1);
    setDescription('');
  };

  const saveEditCategoryHandler = async () => {
    if (!validateInputs()) {
      return;
    }

    let modCategory: IExpenseCategory = {
      expenseCategoryId: expense?.expenseId ?? undefined,
      title,
      description,
    };
    if (type === 'income') {
      // modCategory: IIncomeCategory = {
      //   incomeCategoryId: expense?.expenseId ?? undefined,
      //   title,
      //   description,
      // };
    }
    let result = null;
    if (editMode) {
      // result = await updateExpense(modExpense);
      // if (result) {
      //   ShowSnackBar(`${modExpense.title} is updated`);
      //   navigation.goBack();
      // }
    } else {
      if (type === 'income') {
        result = await saveIncomeCategory(modCategory);
      } else if (type === 'expense') {
        result = await saveExpenseCategory(modCategory);
      }

      if (result) {
        ShowSnackBar(`${modCategory.title} is added`);
        navigation.goBack();
      }
    }
    // const savedExpenses = await getExpenses();
    // dispatch({type: UPDATE_EXPENSE_LIST, payload: savedExpenses});
    // const summary = await getSummary();
    // dispatch({type: UPDATE_SUMMARY, payload: summary});
  };

  useEffect(() => {
    setErrMsg(defaultErrMsg);
  }, [title]);

  return (
    <SafeAreaView>
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
          <View>
            <View style={formStyles.inputWrapper}>
              <Text style={formStyles.inputLabel}>Description</Text>
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
              saveEditCategoryHandler();
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
    backgroundColor: colors.brand.brandLight,
    display: 'flex',
    overflow: 'scroll',
  },
});

export default AddEditCategory;
