import React, { useRef, useEffect } from 'react';
import { Animated, Easing, Pressable, Text, View } from 'react-native';
import Swipeout from 'react-native-swipeout';
import { useDispatch, useSelector } from 'react-redux';
import {
  SHOW_TOAST,
  UPDATE_SUMMARY,
  SHOW_MODAL,
} from '../../../redux/constants/StoreConstants';
import IconMap from '../../common/IconMap';
import ModalContent from '../../common/modal/ModalContent';
import { ToastType } from '../../common/ToastNotification';
import t from '../../common/translations/Translation';
import UniconEdit from '../../icons/unicons/UniconEdit';
import UniconPaperClip from '../../icons/unicons/UniconPaperClip';
import UniconTrashAlt from '../../icons/unicons/UniconTrashAlt';
import { recentList, colors } from '../../styles/theme';
import { THEME } from '../../utils/Constants';
import { displayDateFormat } from '../../utils/Formatter';
import { ICurrency } from '../common/CurrencyController';
import { getSummary } from '../common/SummaryController';
import {
  removeTransaction,
  togglePinTransaction,
} from './TransactionController';
import { TransactionType, ITransaction } from './TransactionTypes';

interface ITransactionItem {
  index: number;
  item: any;
  navigation?: any;
  type?: TransactionType;
  onUpdate: Function;
}

const TransactionItem = ({
  item,
  navigation,
  type,
  index,
  onUpdate,
}: ITransactionItem) => {
  // console.log('--item--', item);
  const dispatch = useDispatch();
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scrollY = useRef(new Animated.Value(0)).current;

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
      // const savedExpenses = await getTransactions(10, type);
      // dispatch({type: UPDATE_TRANSACTION_LIST, payload: savedExpenses});
      onUpdate();
      const summary = await getSummary();
      dispatch({ type: UPDATE_SUMMARY, payload: summary });
    }
  };

  const editTransaction = (transaction: ITransaction) => {
    if (transaction.transactionType === TransactionType.EXPENSE) {
      navigation.navigate('AddExpense', { expense: transaction });
    } else if (transaction.transactionType === TransactionType.INCOME) {
      navigation.navigate('AddIncome', { income: transaction });
    }
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
        ],
      }}>
      <Swipeout
        autoClose={true}
        style={recentList.swiper}
        left={[
          {
            onPress: () => {
              pinTransaction(item);
            },
            component: (
              <View style={recentList.swipeIcon}>
                <UniconPaperClip color={colors.theme[THEME].textBrandMedium} />
              </View>
            ),
          },
        ]}
        right={[
          {
            onPress: () => {
              removeTransactions(item);
            },
            component: (
              <View style={recentList.swipeIcon}>
                <UniconTrashAlt color={colors.theme[THEME].textBrandMedium} />
              </View>
            ),
          },
          {
            onPress: () => {
              editTransaction(item);
            },
            component: (
              <View style={recentList.swipeIcon}>
                <UniconEdit color={colors.theme[THEME].textBrandMedium} />
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
        </View>
        <Pressable
          onLongPress={() => {
            dispatch({
              type: SHOW_MODAL,
              payload: {
                modalContent: () => (
                  <ModalContent header={'Expense : ' + item.title}>
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
                {
                  backgroundColor:
                    index % 2 === 0
                      ? colors.theme[THEME].brandMedium
                      : colors.theme[THEME].brandMediumDark,
                },
              ]}>
              <IconMap
                name={
                  type === TransactionType.INCOME
                    ? item.transactionCategoryIcon ?? 'payment'
                    : item.transactionCategoryIcon ?? 'payment'
                }
                color={colors.theme[THEME].textLight}
              />
            </View>
            <View style={recentList.listItemInfoWrapper}>
              <View>
                <View style={recentList.listItemDescription}>
                  <Text style={recentList.listItemPayment}>
                    {`${item.paymentTitle} • `}
                  </Text>
                  <Text style={recentList.listItemDate}>
                    {`${item.transactionType} • `}
                  </Text>
                  <Text style={recentList.listItemDate}>
                    {displayDateFormat(item.dateAddedTlm)}
                  </Text>
                </View>
                <Text style={recentList.listItemTitle}>{item.title}</Text>
                <Text style={recentList.listItemAmount}>
                  {currency.symbol} {item.amount}
                </Text>
              </View>
              <View style={recentList.listItemInfoIcon}>
                {item.pinned == true && (
                  <IconMap
                    name={'paper-clip'}
                    color={colors.theme[THEME].textBrandMedium}
                  />
                )}
              </View>
            </View>
          </View>
        </Pressable>
      </Swipeout>
    </Animated.View>
  );
};

export default TransactionItem;
