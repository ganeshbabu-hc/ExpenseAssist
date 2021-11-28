import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Pressable, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useDispatch } from 'react-redux';
import {
  SHOW_TOAST,
  UPDATE_EXPENSE_CATEGORIES_LIST,
} from '../../redux/constants/StoreConstants';
import AppHeader from './AppHeader';
import {
  getTransactionCategories,
  updateTransactionCategory,
} from '../transaction/TransactionController';
// import {ShowSnackBar} from './Util';
import { saveTransactionCategory } from '../database/common/CommonController';
import t from './translations/Translation';
import {
  ITransactionCategory,
  TransactionType,
} from '../transaction/TransactionTypes';
import { GetTheme } from '../styles/GetThemeHook';

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

const AddEditCategory = ({ navigation, route, type }: IAddEditCategory) => {
  const { commonStyles, formStyles, colors } = GetTheme();

  const transactionCategory: ITransactionCategory =
    route?.params?.transactionCategory ?? null;
  const categoryType: TransactionType =
    route?.params?.transactionType || route?.params?.type;

  const [errMsg, setErrMsg] = useState<IErrorMessages>(defaultErrMsg);

  const [title, setTitle] = useState(() => {
    return transactionCategory?.title ?? '';
  });
  const [description, setDescription] = useState(() => {
    return transactionCategory?.description ?? '';
  });
  const [editMode] = useState(() => {
    return transactionCategory ? true : false;
  });
  const dispatch = useDispatch();

  const validateInputs = (): boolean => {
    const msg: IErrorMessages = { ...defaultErrMsg };
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
    if (!validateInputs()) {
      return;
    }

    let modCategory: ITransactionCategory = {
      transactionCategoryId:
        transactionCategory?.transactionCategoryId ?? undefined,
      title,
      editable: 1,
      transactionType: categoryType,
      description,
    };
    let result = null;
    if (editMode) {
      result = await updateTransactionCategory(modCategory);
      if (result) {
        dispatch({
          type: SHOW_TOAST,
          payload: [
            {
              title: t('categoryUpdated', { name: modCategory.title }),
            },
          ],
        });
        navigation.goBack({ type: type });
      }
    } else {
      result = await saveTransactionCategory(modCategory);
      if (result) {
        dispatch({
          type: SHOW_TOAST,
          payload: [
            {
              title: t('categoryAdded', { name: modCategory.title }),
            },
          ],
        });
        navigation.goBack({ type: type });
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
        <View style={[commonStyles.container]}>
          <AppHeader
            title={`${editMode ? t('editCategory') : t('addCategory')}`}
            navigation={navigation}
            homeScreen={false}
            backTo=""
          />
          <View>
            <View style={formStyles.inputWrapper}>
              <Text style={formStyles.inputLabel}>{t('categoryName')}</Text>
              <TextInput
                placeholderTextColor={colors.textCardGray}
                placeholder={
                  categoryType === TransactionType.INCOME
                    ? t('egSalary')
                    : t('egGrocery')
                }
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
              <Text style={formStyles.inputLabel}>{t('description')}</Text>
              <TextInput
                multiline
                numberOfLines={4}
                placeholderTextColor={colors.textCardGray}
                style={formStyles.input}
                onChangeText={setDescription}
                value={description}
              />
            </View>
          </View>
          <Pressable
            style={[
              formStyles.button,
              formStyles.fullWidth,
              formStyles.saveButton,
            ]}
            onPress={() => {
              saveTransactionCategoryHandler();
            }}>
            <Text style={formStyles.buttonLabel}>
              {editMode ? t('update') : t('add')}
            </Text>
          </Pressable>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default AddEditCategory;
