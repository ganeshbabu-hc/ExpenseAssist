import React from 'react';
import {Pressable, Text, View} from 'react-native';
import {IExpense, TransactionType} from '../database/transaction/TransactionTypes';
import {colors, commonStyles, recentList} from '../styles/theme';
import Icon from 'react-native-vector-icons/dist/MaterialIcons';
import IconMap from '../common/IconMap';
import {useDispatch, useSelector} from 'react-redux';
import Swipeout from 'react-native-swipeout';
import {
  getTransactions,
  removeTransaction,
} from '../database/transaction/TransactionController';
import {
  SHOW_MODAL,
  UPDATE_TRANSACTION_LIST,
  UPDATE_SUMMARY,
} from '../../redux/constants/StoreConstants';
import {displayDateFormat} from '../utils/Formatter';
// import {ShowSnackBar} from '../common/Util';
import {getSummary} from '../database/common/SummaryController';
import ModalContent from '../common/modal/ModalContent';
import { THEME } from '../utils/Constants';

// Buttons

interface IRecentExpenses {
  limit?: number;
  navigation?: any;
}
const RecentExpenses = ({limit = 5, navigation}: IRecentExpenses) => {
  const dispatch = useDispatch();

  const expenseList = useSelector((state: any) => {
    return state.expense.expenseList;
  });

  const removeExpense = async (removableExpense: IExpense) => {
    const result = await removeTransaction(removableExpense.expenseId);
    if (result) {
      // ShowSnackBar(`${removableExpense.title} has been removed`);
      const savedExpenses = await getTransactions(10, TransactionType.INCOME);
      dispatch({type: UPDATE_TRANSACTION_LIST, payload: savedExpenses});
      const summary = await getSummary();
      dispatch({type: UPDATE_SUMMARY, payload: summary});
    }
  };

  const editExpense = (expense: IExpense) => {
    navigation.navigate('AddExpense', {expense: expense});
  };

  return (
    <View style={recentList.listWrapper}>
      <View style={recentList.listHeader}>
        <Text style={recentList.listTitle}>Recent</Text>
        <Icon
          style={recentList.listHeaderIcon}
          name="more-horiz"
          size={commonStyles.icon.width}
          color={colors.theme[THEME].textBrandMedium}
        />
      </View>
      {expenseList.map((expense: IExpense, index: number) => {
        return (
          <Swipeout
            autoClose={true}
            style={recentList.swiper}
            right={[
              {
                onPress: () => {
                  editExpense(expense);
                },
                component: (
                  <View
                    style={[recentList.swipeIcon, recentList.swipeIconEdit]}>
                    <Icon
                      name="edit"
                      size={commonStyles.icon.width}
                      color={colors.theme[THEME].textLight}
                    />
                  </View>
                ),
              },
              {
                onPress: () => {
                  removeExpense(expense);
                },
                component: (
                  <View
                    style={[recentList.swipeIcon, recentList.swipeIconDelete]}>
                    <Icon
                      name="delete"
                      size={commonStyles.icon.width}
                      color={colors.theme[THEME].textLight}
                    />
                  </View>
                ),
              },
            ]}>
            <Pressable
              onLongPress={() => {
                dispatch({
                  type: SHOW_MODAL,
                  payload: {
                    modalContent: () => (
                      <ModalContent header={'Expense : ' + expense.title}>
                        <Text>Hai</Text>
                      </ModalContent>
                    ),
                  },
                });
              }}
              style={recentList.listItem}>
              <View style={recentList.listItemInfo}>
                <View style={recentList.listItemIconWrapper}>
                  <IconMap
                    iconName={expense.transactionCategoryIcon ?? 'payment'}
                    color={colors.theme[THEME].textBrandMedium}
                  />
                </View>
                <View style={recentList.listItemDescription}>
                  <Text style={recentList.listItemTitle}>{expense.title}</Text>
                  <Text style={recentList.listItemDate}>
                    {displayDateFormat(expense.dateAddedTlm)}
                  </Text>
                </View>
              </View>
              <View style={recentList.listItemAmountWrapper}>
                <Text style={recentList.listItemAmount}>{expense.amount}</Text>
                <Text style={recentList.listItemPayment}>
                  {expense.paymentTitle}
                </Text>
              </View>
            </Pressable>
            {index !== expenseList.length - 1 && (
              <View style={recentList.dividerWrapper}>
                <Text style={recentList.divider} />
              </View>
            )}
          </Swipeout>
        );
      })}
    </View>
  );
};

export default RecentExpenses;
