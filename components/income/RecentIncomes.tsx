import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {IIncome} from '../database/income/IncomeTypes';
import {colors, commonStyles, utils} from '../styles/common';
import Icon from 'react-native-vector-icons/dist/MaterialIcons';
import IconMap from '../common/IconMap';
import {useDispatch, useSelector} from 'react-redux';
import Swipeout from 'react-native-swipeout';
import {getIncomes, removeIncomes} from '../database/income/IncomeController';
import {UPDATE_INCOME_LIST} from '../../redux/constants/StoreConstants';
import {displayDateFormat} from '../utils/Formatter';
import Snackbar from 'react-native-snackbar';
import { ShowSnackBar } from '../common/Util';
// Buttons

interface IRecentIncomes {
  limit?: number;
}
const RecentIncomes = ({limit = 5}: IRecentIncomes) => {
  const dispatch = useDispatch();

  const incomeList = useSelector((state: any) => {
    return state.income.incomeList;
  });

  const removeIncome = async (removableIncomes: IIncome) => {
    const result = await removeIncomes(removableIncomes.incomeId);
    if (result) {
      ShowSnackBar(`${removableIncomes.title} has been removed`);
      const savedIncomes = await getIncomes();
      dispatch({type: UPDATE_INCOME_LIST, payload: savedIncomes});
    }
  };

  const editIncome = (editIncome: IIncome) => {};
  return (
    <View style={styles.listWrapper}>
      <View style={styles.listHeader}>
        <Text style={styles.listTitle}>Recent incomes</Text>
        <Icon
          style={styles.listHeaderIcon}
          name="more-horiz"
          size={commonStyles.icon.width}
          color={colors.brandMedium}
        />
      </View>

      {incomeList.map((income: IIncome) => {
        return (
          <Swipeout
            autoClose={true}
            style={styles.swiper}
            key={`income-${income.incomeId}`}
            right={[
              {
                onPress: () => {
                  editIncome(income);
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
                  removeIncome(income);
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
                    iconName={income.incomeCategoryIcon ?? 'payment'}
                    color={colors.brandMedium}
                  />
                </View>
                <View style={styles.listItemDescription}>
                  <Text style={styles.listItemTitle}>{income.title}</Text>
                  <Text style={styles.listItemDate}>
                    {displayDateFormat(income.dateAddedTlm)}
                  </Text>
                </View>
              </View>
              <View style={styles.listItemAmountWrapper}>
                <Text style={styles.listItemAmount}>{income.amount}</Text>
                <Text style={styles.listItemPayment}>
                  {income.paymentTitle}
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
export default RecentIncomes;
