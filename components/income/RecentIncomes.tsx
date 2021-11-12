import React from 'react';
import {Button, Pressable, StyleSheet, Text, View} from 'react-native';
import {IIncome} from '../database/income/IncomeTypes';
import {colors, commonStyles, recentList, ripple, utils} from '../styles/theme';
import Icon from 'react-native-vector-icons/dist/MaterialIcons';
import IconMap from '../common/IconMap';
import {useDispatch, useSelector} from 'react-redux';
import Swipeout from 'react-native-swipeout';
import {getIncomes, removeIncomes} from '../database/income/IncomeController';
import {
  SHOW_MODAL,
  UPDATE_INCOME_LIST,
  UPDATE_SUMMARY,
} from '../../redux/constants/StoreConstants';
import {displayDateFormat} from '../utils/Formatter';
import {ShowSnackBar} from '../common/Util';
import {getSummary} from '../database/common/SummaryController';
import ModalContent from '../common/modal/ModalContent';
import { THEME } from '../utils/Constants';
// Buttons

interface IRecentIncomes {
  navigation: any;
  limit?: number;
}
const RecentIncomes = ({limit = 5, navigation}: IRecentIncomes) => {
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
      const summary = await getSummary();
      dispatch({type: UPDATE_SUMMARY, payload: summary});
    }
  };

  const editIncome = (income: IIncome) => {
    navigation.navigate('AddIncome', {income});
  };

  return (
    <View style={recentList.listWrapper}>
      <View style={recentList.listHeader}>
        <Text style={recentList.listTitle}>Recent incomes</Text>
        <Icon
          style={recentList.listHeaderIcon}
          name="more-horiz"
          size={commonStyles.icon.width}
          color={colors.theme[THEME].brandMedium}
        />
      </View>
      {incomeList.map((income: IIncome, index: number) => {
        return (
          <Swipeout
            autoClose={true}
            style={recentList.swiper}
            key={`income-${income.incomeId}`}
            right={[
              {
                onPress: () => {
                  editIncome(income);
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
                  removeIncome(income);
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
                      <ModalContent header={'Income : ' + income.title}>
                        <Text style={recentList.modalPayment}>
                          Payment Type: {income.paymentTitle}
                        </Text>
                        <Text style={recentList.modalDateAdded}>
                          On: {income.dateAddedTlm}
                        </Text>
                        {income.description !== null && (
                          <Text style={recentList.modalDesc}>
                            {income.description}
                          </Text>
                        )}
                      </ModalContent>
                    ),
                  },
                });
              }}
              style={recentList.listItem}>
              <View style={recentList.listItemInfo}>
                <View style={recentList.listItemIconWrapper}>
                  <IconMap
                    iconName={income.incomeCategoryIcon ?? 'payment'}
                    color={colors.theme[THEME].brandMedium}
                  />
                </View>
                <View style={recentList.listItemDescription}>
                  <Text style={recentList.listItemTitle}>{income.title}</Text>
                  <Text style={recentList.listItemDate}>
                    {displayDateFormat(income.dateAddedTlm)}
                  </Text>
                </View>
              </View>
              <View style={recentList.listItemAmountWrapper}>
                <Text style={recentList.listItemAmount}>{income.amount}</Text>
                <Text style={recentList.listItemPayment}>
                  {income.paymentTitle}
                </Text>
              </View>
            </Pressable>
            {index !== incomeList.length - 1 && (
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
export default RecentIncomes;
