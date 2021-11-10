import React, {FC, ReactElement, useCallback, useEffect, useRef} from 'react';
import {
  Animated,
  Easing,
  FlatList,
  ListRenderItemInfo,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {IExpense} from '../database/expense/ExpenseTypes';
import {colors, commonStyles, recentList, utils} from '../styles/theme';
import Icon from 'react-native-vector-icons/dist/MaterialIcons';
import IconMap from './IconMap';
import {useDispatch, useSelector} from 'react-redux';
import Swipeout from 'react-native-swipeout';
import {
  getExpenses,
  removeExpenses,
} from '../database/expense/ExpenseController';
import {
  SHOW_MODAL,
  UPDATE_EXPENSE_LIST,
  UPDATE_INCOME_LIST,
  UPDATE_SUMMARY,
} from '../../redux/constants/StoreConstants';
import {displayDateFormat} from '../utils/Formatter';
import {ShowSnackBar} from './Util';
import {getSummary} from '../database/common/SummaryController';
import ModalContent from './modal/ModalContent';
import {IIncome} from '../database/income/IncomeTypes';
import {removeIncomes, getIncomes} from '../database/income/IncomeController';
import {FadeInFlatList} from '@ja-ka/react-native-fade-in-flatlist';
import AppHeader from './AppHeader';

interface IRecentList {
  limit?: number;
  navigation?: any;
  type?: 'income' | 'expense';
  header?: boolean;
  route?: any;
}
interface IRecentListItem {
  index: number;
  item: any;
  navigation?: any;
  type?: 'income' | 'expense';
}

const RecentListItem = ({item, navigation, type, index}: IRecentListItem) => {
  const dispatch = useDispatch();
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const removeExpense = async (removableExpense: IExpense) => {
    const result = await removeExpenses(removableExpense.expenseId);
    if (result) {
      ShowSnackBar(`${removableExpense.title} has been removed`);
      const savedExpenses = await getExpenses();
      dispatch({type: UPDATE_EXPENSE_LIST, payload: savedExpenses});
      const summary = await getSummary();
      dispatch({type: UPDATE_SUMMARY, payload: summary});
    }
  };

  const editExpense = (expense: IExpense) => {
    navigation.navigate('AddExpense', {expense: expense});
  };

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

  useEffect(() => {
    Animated.timing(fadeAnim, {
      useNativeDriver: true,
      toValue: 1,
      duration: 350,
      delay: 150 + index * 50,
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
              outputRange: [100, 0], // 0 : 150, 0.5 : 75, 1 : 0
            }),
          },
        ],
      }}>
      <Swipeout
        autoClose={true}
        style={recentList.swiper}
        right={[
          {
            onPress: () => {
              if (type === 'income') {
                removeIncome(item);
              } else {
                removeExpense(item);
              }
            },
            component: (
              <View style={[recentList.swipeIcon, recentList.swipeIconDelete]}>
                <Icon
                  name="delete"
                  size={commonStyles.icon.width}
                  color={colors.white}
                />
              </View>
            ),
          },
          {
            onPress: () => {
              if (type === 'income') {
                editIncome(item);
              } else {
                editExpense(item);
              }
            },
            component: (
              <View style={[recentList.swipeIcon, recentList.swipeIconEdit]}>
                <Icon
                  name="edit"
                  size={commonStyles.icon.width}
                  color={colors.white}
                />
              </View>
            ),
          },
        ]}>
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
                  <ModalContent header={'Expense : ' + item.title}>
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
                iconName={
                  type === 'income'
                    ? item.incomeCategoryIcon ?? 'payment'
                    : item.expenseCategoryIcon ?? 'payment'
                }
                color={colors.brand.brandMedium}
              />
            </View>
            <View style={recentList.listItemDescription}>
              <Text style={recentList.listItemTitle}>{item.title}</Text>
              <Text style={recentList.listItemDate}>
                {displayDateFormat(item.dateAddedTlm)}
              </Text>
            </View>
          </View>
          <View style={recentList.listItemAmountWrapper}>
            <Text style={recentList.listItemAmount}>{item.amount}</Text>
            <Text style={recentList.listItemPayment}>{item.paymentTitle}</Text>
          </View>
        </Pressable>
      </Swipeout>
    </Animated.View>
  );
};

const RecentList = ({
  limit = 5,
  navigation,
  type = 'expense',
  route,
  header,
}: IRecentList) => {
  header = route?.params?.header || header || false;
  type = route?.params?.type || type;
  // const {header = false, routeLimit = 5, routeType} = route.params;
  const renderItem = ({item, index}: any) => {
    return <RecentListItem item={item} index={index} navigation={navigation} />;
  };

  const recentsList = useSelector((state: any) => {
    if (type === 'income') {
      return state.income.incomeList;
    }
    return state.expense.expenseList;
  });
  return (
    <ScrollView>
      <View style={[commonStyles.container, recentList.listWrapper]}>
        {header && <AppHeader navigation={navigation} homeScreen={false} />}
        <View style={recentList.listHeader}>
          <Text style={recentList.listTitle}>
            Recent {header ? (type === 'income' ? 'incomes' : 'expenses') : ''}
          </Text>
          {!header && (
            <Pressable
              onPress={() => {
                navigation.navigate('RecentList', {
                  type,
                  limit: 10,
                  header: true,
                });
              }}
              style={recentList.listHeaderIconWrapper}>
              <Icon
                style={recentList.listHeaderIcon}
                name="more-horiz"
                size={commonStyles.icon.width}
                color={colors.brand.brandMedium}
              />
            </Pressable>
          )}
          {header && (
            <Pressable
              onPress={() => {
                if (type === 'expense') {
                  navigation.navigate('AddExpense');
                } else {
                  navigation.navigate('AddIncome');
                }
              }}
              style={recentList.listHeaderIconWrapper}>
              <Icon
                style={recentList.listHeaderIcon}
                name="add"
                size={commonStyles.icon.width}
                color={colors.brand.brandMedium}
              />
            </Pressable>
          )}
        </View>
        {recentsList.length < 1 && (
          <Text style={recentList.empty}>Not available</Text>
        )}
        <FlatList data={recentsList} renderItem={renderItem} />
      </View>
    </ScrollView>
  );
};

// {
//   /* <FadeInFlatList
// durationPerItem={50}
// data={recentsList}
// itemsToFadeIn={10}
// key={keyExtractor}
// initialDelay={200}
// renderItem={renderItem}
// /> */
// }

export default RecentList;
