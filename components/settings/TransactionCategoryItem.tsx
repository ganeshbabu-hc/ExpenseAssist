import React, { useRef, useEffect } from 'react';
import { Animated, Easing, Pressable, Text, View } from 'react-native';
import Swipeout from 'react-native-swipeout';
import { useDispatch, useSelector } from 'react-redux';
import { SHOW_TOAST, SHOW_MODAL } from '../../redux/constants/StoreConstants';
import IconMap from '../common/IconMap';
import ModalContent from '../common/modal/ModalContent';
import { ToastType } from '../common/ToastNotification';
import t from '../common/translations/Translation';
import UniconEdit from '../icons/unicons/UniconEdit';
import UniconPaperClip from '../icons/unicons/UniconPaperClip';
import UniconTrashAlt from '../icons/unicons/UniconTrashAlt';
import { recentList, colors, commonStyles } from '../styles/theme';
import { THEME } from '../utils/Constants';
import { displayDateFormat } from '../utils/Formatter';
import { ICurrency } from '../database/common/CurrencyController';
import {
  removeTransaction,
  togglePinTransaction,
} from '../transaction/TransactionController';
import {
  TransactionType,
  ITransaction,
  ITransactionCategory,
} from '../transaction/TransactionTypes';

interface ITransactionCategoryItem {
  index: number;
  category: ITransactionCategory;
  navigation?: any;
  onUpdate: Function;
}

const TransactionCategoryItem = ({
  category,
  navigation,
  index,
  onUpdate,
}: ITransactionCategoryItem) => {
  const dispatch = useDispatch();
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const removeAnimation = useRef(new Animated.Value(0)).current;
  console.log(category);

  const removeTranslate = removeAnimation?.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 0],
    extrapolate: 'clamp',
  });

  const currency: ICurrency = useSelector((state: any) => {
    return state.common.configuration.currency.value;
  });

  const removeTransactions = async (transaction: ITransaction) => {
    const result = await removeTransaction(transaction.transactionId);
    if (result) {
      dispatch({
        type: SHOW_TOAST,
        payload: [
          {
            title:
              transaction.transactionType === TransactionType.EXPENSE
                ? t('expenseRemoved', { name: transaction.title })
                : t('incomeRemoved', { name: transaction.title }),
            toastType: ToastType.WARNING,
          },
        ],
      });
      onUpdate();
    }
  };

  const editTransactionCategory = (txCategory: ITransactionCategory) => {
    navigation.navigate('AddEditCategory', { transactionCategory: txCategory });
  };

  const pinTransaction = async (txn: ITransaction) => {
    const result = await togglePinTransaction(txn);
    if (result) {
      onUpdate();
    }
  };
  useEffect(() => {
    Animated.timing(fadeAnim, {
      useNativeDriver: true,
      toValue: 1,
      duration: 350,
      delay: index * 50,
      easing: Easing.out(Easing.ease),
    }).start();
  }, [fadeAnim, index]);

  return (
    <Animated.View
      style={{
        opacity: fadeAnim,
        transform: [
          {
            translateY: fadeAnim.interpolate({
              inputRange: [0, 1],
              outputRange: [100, 0],
            }),
          },
          {
            scaleY: removeTranslate,
          },
        ],
      }}>
      <Swipeout
        autoClose={true}
        style={recentList.swiper}
        // left={[
        //   {
        //     onPress: () => {
        //       pinTransaction(category);
        //     },
        //     component: (
        //       <View
        //         style={[
        //           recentList.swipeIcon,
        //           index !== 0 ? recentList.dividerMargin : {},
        //         ]}>
        //         <UniconPaperClip color={colors.theme[THEME].textBrandMedium} />
        //       </View>
        //     ),
        //   },
        // ]}
        right={[
          //   {
          //     onPress: () => {
          //       removeTransactions(category);
          //     },
          //     component: (
          //       <View
          //         style={[
          //           recentList.swipeIcon,
          //           index !== 0 ? recentList.dividerMargin : {},
          //         ]}>
          //         <UniconTrashAlt color={colors.theme[THEME].textBrandMedium} />
          //       </View>
          //     ),
          //   },
          {
            onPress: () => {
              editTransactionCategory(category);
            },
            component: (
              <View
                style={[
                  recentList.swipeIcon,
                  index !== 0 ? recentList.dividerMargin : {},
                ]}>
                <IconMap
                  color={colors.theme[THEME].textBrandMedium}
                  name="trash"
                />
              </View>
            ),
          },
        ]}>
        <View>
          {index !== 0 && (
            <View style={recentList.dividerWrapper}>
              <Text style={recentList.divider} />
            </View>
          )}
          <Pressable
            onLongPress={() => {
              dispatch({
                type: SHOW_MODAL,
                payload: {
                  modalContent: () => (
                    <ModalContent header={'Expense : ' + category.title}>
                      <Text>Hai</Text>
                    </ModalContent>
                  ),
                },
              });
            }}
            style={recentList.listItem}>
            <View style={recentList.listItemInfo}>
              <View
                style={[
                  recentList.listItemIconWrapper,
                  commonStyles.mt0,
                  {
                    backgroundColor:
                      index % 2 === 0
                        ? colors.theme[THEME].brandMedium
                        : colors.theme[THEME].brandMedium,
                  },
                ]}>
                <IconMap
                  name={
                    category.transactionType === TransactionType.INCOME
                      ? category.categoryIcon ?? 'cash-plus'
                      : category.categoryIcon ?? 'cash-minus'
                  }
                  color={colors.theme[THEME].textLight}
                />
              </View>
              <View style={recentList.listItemInfoWrapper}>
                <View>
                  <Text style={recentList.listItemTitle}>{category.title}</Text>
                  {category.description && (
                    <Text style={recentList.listItemDate}>
                      {category.description}
                    </Text>
                  )}
                </View>
              </View>
              {category.editable === 1 && (
                <Pressable
                  onPress={() => {
                    editTransactionCategory(category);
                  }}
                  style={recentList.listItemInfoIcon}>
                  <IconMap
                    name={'edit'}
                    color={colors.theme[THEME].textBrandMedium}
                  />
                </Pressable>
              )}
            </View>
          </Pressable>
        </View>
      </Swipeout>
    </Animated.View>
  );
};

export default TransactionCategoryItem;
