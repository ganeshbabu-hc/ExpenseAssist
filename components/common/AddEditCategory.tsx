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
  SHOW_TOAST,
  UPDATE_EXPENSE_CATEGORIES_LIST,
} from '../../redux/constants/StoreConstants';
import AppHeader from './AppHeader';
import {getTransactionCategories} from '../database/transaction/TransactionController';
import {colors, commonStyles, formStyles} from '../styles/theme';
// import {ShowSnackBar} from './Util';
import {
  saveExpenseCategory,
  saveTransactionCategory,
} from '../database/common/CommonController';
import {THEME} from '../utils/Constants';
import t from './translations/Translation';
import {
  ITransactionCategory,
  TransactionType,
} from '../database/transaction/TransactionTypes';

interface IAddEditCategory {
  navigation: any;
  route?: any;
  type?: TransactionType;
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
  const {transactionCategory}: {transactionCategory: ITransactionCategory} =
    route.params.transactionCategory ?? {undefined};
  // const {expense}: {expense: IExpense} = route.params;

  const categoryType: TransactionType = route?.params?.type || type;

  const [errMsg, setErrMsg] = useState<IErrorMessages>(defaultErrMsg);

  const [title, setTitle] = useState(() => {
    return transactionCategory?.title ?? '';
  });
  // const [categoryId, setCategoryId] = useState(() => {
  //   return expense?.paymentId ?? 1;
  // });
  const [description, setDescription] = useState(() => {
    return transactionCategory?.description ?? '';
  });
  const [editMode] = useState(() => {
    return transactionCategory ? true : false;
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
  const saveTransactionCategoryHandler = async () => {
    // console.log('save--validateInputs');
    if (!validateInputs()) {
      return;
    }
    // console.log('save--category');

    let modCategory: ITransactionCategory = {
      transactionCategoryId:
        transactionCategory?.transactionCategoryId ?? undefined,
      title,
      transactionType: categoryType,
      description,
    };
    let result = null;
    if (editMode) {
      // result = await updateTransaction(modExpense);
      // if (result) {
      //   ShowSnackBar(`${modExpense.title} is updated`);
      //   navigation.goBack();
      // }
    } else {
      result = await saveTransactionCategory(modCategory);
      if (result) {
        dispatch({
          type: SHOW_TOAST,
          payload: [
            {
              title: t('categoryAdded', {name: modCategory.title}),
            },
          ],
        });
        navigation.goBack();
      }
    }
    const expenseCategories = await getTransactionCategories(
      TransactionType.EXPENSE,
    );
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
              saveTransactionCategoryHandler();
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
