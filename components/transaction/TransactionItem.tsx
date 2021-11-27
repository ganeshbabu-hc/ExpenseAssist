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
import { THEME } from '../utils/Constants';
import { displayDateFormat } from '../utils/Formatter';
import { ICurrency } from '../database/common/CurrencyController';
import {
  removeTransaction,
  togglePinTransaction,
} from './TransactionController';
import { TransactionType, ITransaction } from './TransactionTypes';
import { GetTheme } from '../styles/GetThemeHook';
import { recentListStyles } from '../styles/recentList';

interface ITransactionItem {
  index: number;
  item: ITransaction;
  navigation?: any;
  onUpdate: Function;
}

const TransactionItem = ({
  item,
  navigation,
  index,
  onUpdate,
}: ITransactionItem) => {
  const { styles, colors } = GetTheme(recentListStyles);
  const dispatch = useDispatch();
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const removeAnimation = useRef(new Animated.Value(0)).current;

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

  const editTransaction = (transaction: ITransaction) => {
    navigation.navigate('AddTransaction', { transaction });
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
        style={styles.swiper}
        left={[
          {
            onPress: () => {
              pinTransaction(item);
            },
            component: (
              <View
                style={[
                  styles.swipeIcon,
                  index !== 0 ? styles.dividerMargin : {},
                ]}>
                <UniconPaperClip color={colors.textBrandMedium} />
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
              <View
                style={[
                  styles.swipeIcon,
                  index !== 0 ? styles.dividerMargin : {},
                ]}>
                <UniconTrashAlt color={colors.textBrandMedium} />
              </View>
            ),
          },
          {
            onPress: () => {
              editTransaction(item);
            },
            component: (
              <View
                style={[
                  styles.swipeIcon,
                  index !== 0 ? styles.dividerMargin : {},
                ]}>
                <UniconEdit color={colors.textBrandMedium} />
              </View>
            ),
          },
        ]}>
        <View>
          {index !== 0 && (
            <View style={styles.dividerWrapper}>
              <Text style={styles.divider} />
            </View>
          )}
          <Pressable
            onPress={() => {
              navigation.navigate('TransactionView', {
                transaction: item,
              });
              // dispatch({
              //   type: SHOW_MODAL,
              //   payload: {
              //     modalContent: () => (
              //       <ModalContent header={'Expense : ' + item.title}>
              //         <Text>Hai</Text>
              //       </ModalContent>
              //     ),
              //   },
              // });
            }}
            style={styles.listItem}>
            <View style={styles.listItemInfo}>
              <View
                style={[
                  styles.listItemIconWrapper,
                  {
                    backgroundColor:
                      index % 2 === 0 ? colors.brandMedium : colors.brandMedium,
                  },
                ]}>
                <IconMap
                  name={
                    item.transactionType === TransactionType.INCOME
                      ? item.transactionCategoryIcon ?? 'payment'
                      : item.transactionCategoryIcon ?? 'payment'
                  }
                  color={colors.textLight}
                />
              </View>
              <View style={styles.listItemInfoWrapper}>
                <View>
                  <View style={styles.listItemDescription}>
                    <Text style={styles.listItemPayment}>
                      {`${t(item.paymentTitle ?? '')} • `}
                    </Text>
                    <Text style={styles.listItemDate}>
                      {`${t(item.transactionType)} • `}
                    </Text>
                    <Text style={styles.listItemDate}>
                      {displayDateFormat(item.dateAddedTlm)}
                    </Text>
                  </View>
                  <Text style={styles.listItemTitle}>{item.title}</Text>
                  <Text style={styles.listItemAmount}>
                    {currency.symbol} {item.amount}
                  </Text>
                </View>
                <View style={styles.listItemInfoIcon}>
                  {item.pinned === 1 && (
                    <IconMap name={'paper-clip'} color={colors.textCardGray} />
                  )}
                </View>
              </View>
            </View>
          </Pressable>
        </View>
      </Swipeout>
    </Animated.View>
  );
};

export default TransactionItem;
