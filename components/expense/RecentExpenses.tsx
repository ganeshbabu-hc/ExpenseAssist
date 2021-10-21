import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {IExpense} from '../database/expense/ExpenseTypes';
import {colors, commonStyles, utils} from '../styles/common';
import Icon from 'react-native-vector-icons/dist/MaterialIcons';
import IconMap from '../common/IconMap';
import {useDispatch, useSelector} from 'react-redux';
import Swipeout from 'react-native-swipeout';
import {
  getExpenses,
  removeExpenses,
} from '../database/expense/ExpenseController';
import {UPDATE_EXPENSE_LIST} from '../../redux/constants/StoreConstants';
import {displayDateFormat} from '../utils/Formatter';
import { ShowSnackBar } from '../common/Util';

// Buttons

interface IRecentExpenses {
  limit?: number;
}
const RecentExpenses = ({limit = 5}: IRecentExpenses) => {
  const dispatch = useDispatch();

  const expenseList = useSelector((state: any) => {
    return state.expense.expenseList;
  });

  const removeExpense = async (removableExpense: IExpense) => {
    const result = await removeExpenses(removableExpense.expenseId);
    if (result) {
      ShowSnackBar(`${removableExpense.title} has been removed`);
      const savedExpenses = await getExpenses();
      dispatch({type: UPDATE_EXPENSE_LIST, payload: savedExpenses});
    }
  };

  const editExpense = (editExpense: IExpense) => {};

  return (
    <View style={styles.listWrapper}>
      <View style={styles.listHeader}>
        <Text style={styles.listTitle}>Recent</Text>
        <Icon
          style={styles.listHeaderIcon}
          name="more-horiz"
          size={commonStyles.icon.width}
          color={colors.brandMedium}
        />
      </View>

      {expenseList.map((expense: IExpense) => {
        return (
          <Swipeout
            autoClose={true}
            style={styles.swiper}
            key={`expense-${expense.expenseId}`}
            right={[
              {
                onPress: () => {
                  editExpense(expense);
                },
                component: (
                  <View style={[styles.swipeIcon, styles.swipeIconEdit]}>
                    <Icon
                      name="edit"
                      size={commonStyles.icon.width}
                      color={colors.white}
                    />
                  </View>
                ),
              },
              {
                onPress: () => {
                  removeExpense(expense);
                },
                component: (
                  <View style={[styles.swipeIcon, styles.swipeIconDelete]}>
                    <Icon
                      name="delete"
                      size={commonStyles.icon.width}
                      color={colors.white}
                    />
                  </View>
                ),
              },
            ]}>
            <View style={styles.listItem}>
              <View style={styles.listItemInfo}>
                <View style={styles.listItemIconWrapper}>
                  <IconMap
                    iconName={expense.expenseCategoryIcon ?? 'payment'}
                    color={colors.brandMedium}
                  />
                </View>
                <View style={styles.listItemDescription}>
                  <Text style={styles.listItemTitle}>{expense.title}</Text>
                  <Text style={styles.listItemDate}>
                    {displayDateFormat(expense.dateAddedTlm)}
                  </Text>
                </View>
              </View>
              <View style={styles.listItemAmountWrapper}>
                <Text style={styles.listItemAmount}>{expense.amount}</Text>
                <Text style={styles.listItemPayment}>
                  {expense.paymentTitle}
                </Text>
              </View>
            </View>
          </Swipeout>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  swiper: {
    backgroundColor: colors.white,
    display: 'flex',
  },
  swipeIcon: {
    backgroundColor: colors.brandLight,
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  swipeIconEdit: {
    backgroundColor: colors.brandMedium,
    height: '100%',
  },
  swipeIconDelete: {
    backgroundColor: colors.brandDanger,
    height: '100%',
  },
  listHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
  },
  listHeaderIcon: {
    padding: 14,
  },
  listTitle: {
    fontSize: 28,
    color: colors.black,
    fontWeight: '600',
    padding: 16,
  },
  listWrapper: {
    backgroundColor: colors.white,
    paddingHorizontal: 10,
  },
  listItem: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    marginVertical: 8,
  },
  listItemInfo: {
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
    flexDirection: 'row',
  },
  listItemIconWrapper: {
    backgroundColor: colors.brandLight,
    margin: 10,
    borderRadius: utils.inputRadius,
    padding: 10,
  },
  listItemDescription: {},
  listItemTitle: {
    color: colors.black,
    fontSize: 18,
    fontWeight: '600',
  },
  listItemAmountWrapper: {
    marginRight: 10,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  listItemDate: {
    marginTop: 4,
    color: colors.grayText,
  },
  listItemAmount: {
    color: colors.black,
    fontSize: 18,
    fontWeight: '600',
  },
  listItemPayment: {
    color: colors.grayText,
    fontSize: 16,
    marginTop: 4,
  },
});
export default RecentExpenses;
