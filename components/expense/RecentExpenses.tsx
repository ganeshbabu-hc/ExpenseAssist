import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {getExpenses} from '../database/expense/ExpenseController';
import {IExpense} from '../database/expense/ExpenseTypes';
import {colors, commonStyles, utils} from '../styles/common';
import Icon from 'react-native-vector-icons/dist/MaterialIcons';
import IconMap from './IconMap';
import { useSelector } from 'react-redux';
import { IExpenseState } from '../../redux/Types';

interface IRecentExpenses {
  limit?: number;
}
const RecentExpenses = ({limit = 5}: IRecentExpenses) => {
  const expenseList = useSelector((state: any) => {
    return state.expense.expenseList;
  });

  const getFormattedDate = (dateStr?: string) => {
    if (dateStr) {
      return new Date(dateStr).toLocaleDateString();
    }
    return null;
  };
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
          <View key={`expense-${expense.expenseId}`} style={styles.listItem}>
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
                  {getFormattedDate(expense.dateAddedTlm)}
                </Text>
              </View>
            </View>
            <View style={styles.listItemAmountWrapper}>
              <Text style={styles.listItemAmount}>
                {expense.currencySumbol} {expense.amount}
              </Text>
              <Text style={styles.listItemPayment}>{expense.paymentTitle}</Text>
            </View>
          </View>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
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
