import React from 'react';
import {FlatList, Pressable, StyleSheet, Text, View} from 'react-native';
import {colors, commonStyles, utils} from '../styles/theme';
import Icon from 'react-native-vector-icons/dist/MaterialIcons';
import {useSelector} from 'react-redux';
import {ISummary} from '../database/common/SummaryController';
import {numberFormatter} from '../utils/Formatter';
import {ICurrency} from '../database/common/CurrencyController';
import { THEME } from '../utils/Constants';

interface ISummaryItem {
  id: number;
  title: string;
  icon: string;
  total: number | undefined;
  onPress?: Function;
}

const SummaryList = ({navigation}: any) => {
  const summary: ISummary = useSelector(
    (state: any) => state.summary.summaryList,
  );
  const currency: ICurrency = useSelector((state: any) => {
    return state.common.configuration.currency.value;
  });

  // console.log(summary.monthlyIncome - summary.monthlyExpense);
  // console.log(summary.monthlyExpense);

  const getBalance = (monthlyIncome?: number, monthlyExpense?: number) => {
    const income = monthlyIncome || 0;
    const expense = monthlyExpense || 0;
    return income - expense;
  };

  const summaryCardList: ISummaryItem[] = [
    {
      id: 1,
      title: 'Monthly \nbalance',
      icon: 'account-balance-wallet',
      total: getBalance(summary.monthlyIncome, summary.monthlyExpense),
    },
    {
      id: 2,
      title: 'Monthly \nexpense',
      icon: 'account-balance-wallet',
      total: summary.monthlyExpense,
      onPress: () => {
        navigation.navigate('RecentList', {type: 'expense', header: true});
      },
    },
    {
      id: 3,
      title: 'Monthly \nincome',
      icon: 'account-balance-wallet',
      total: summary.monthlyIncome,
      onPress: () => {
        navigation.navigate('RecentList', {type: 'income', header: true});
      },
    },
    {
      id: 4,
      title: 'Total \nbalance',
      icon: 'account-balance-wallet',
      total: getBalance(summary.totalIncome, summary.totalExpense),
    },
    {
      id: 5,
      title: 'Total \nexpense',
      icon: 'account-balance-wallet',
      total: summary.totalExpense,
      onPress: () => {
        navigation.navigate('RecentList', {type: 'expense', header: true});
      },
    },
    {
      id: 6,
      title: 'Total \nincome',
      icon: 'account-balance-wallet',
      total: summary.totalIncome,
      onPress: () => {
        navigation.navigate('RecentList', {type: 'income', header: true});
      },
    },
  ];

  const _keyExtractor = (item: any, index: any) => item.id;

  const _renderItem = (item: ISummaryItem, index: number) => {
    const cardType: any =
      index % 2 === 0
        ? commonStyles.card.brandWhite
        : commonStyles.card.brandMedium;
    const lastCard = index === summaryCardList.length - 1;
    return (
      <Pressable
        onPress={() => {
          if (item.onPress) {
            item.onPress();
          }
        }}
        style={[
          commonStyles.card,
          commonStyles.card.large,
          cardType,
          lastCard ? commonStyles.mr20 : {},
          index === 0 ? commonStyles.card.firstCard : {},
        ]}>
        <View style={styles.summaryCard}>
          <Icon
            style={styles.summaryCard.icon}
            name={item.icon}
            color={cardType.text.color}
            size={commonStyles.icon.width}
          />
          <Text style={[cardType.text, styles.summaryCard.title]}>
            {item.title}
          </Text>
          <Text style={[styles.currencyIcon, {color: cardType.text.color}]}>
            {currency.symbol}
          </Text>
          <Text style={[cardType.totalText, styles.summaryCard.total]}>
            {numberFormatter(item.total)}
          </Text>
        </View>
      </Pressable>
    );
  };

  return (
    <View style={styles.summaryListWrapper}>
      <View style={styles.summaryListContainer}>
        <Text
          style={[
            styles.title,
            commonStyles.title,
            commonStyles.card.firstCard,
          ]}>
          Overview
        </Text>
        <FlatList
          style={styles.list}
          showsHorizontalScrollIndicator={false}
          horizontal
          data={summaryCardList}
          renderItem={({item, index}) => _renderItem(item, index)}
          keyExtractor={_keyExtractor}
        />
      </View>
    </View>
  );
};

export default SummaryList;

const styles = StyleSheet.create({
  summaryListWrapper: {
    backgroundColor: colors.theme[THEME].textLight,
    overflow: 'hidden',
  },
  summaryListContainer: {
    // marginBottom: 10,
    backgroundColor: colors.theme[THEME].brandLight,
    // borderBottomRightRadius: 40,
    overflow: 'hidden',
    paddingBottom: 20,
  },
  summaryCard: {
    display: 'flex',
    icon: {
      marginTop: 6,
    },
    title: {
      marginTop: 6,
      fontFamily: utils.fontFamily.Bold,
      fontSize: utils.fontSize.small,
    },
    total: {
      marginTop: 4,
      fontSize: utils.fontSize.small,
      fontFamily: utils.fontFamily.Bold,
    },
  },
  currencyIcon: {
    fontSize: utils.fontSize.small,
    fontWeight: '700',
    marginTop: 16,
  },
  list: {},
  title: {
    marginLeft: commonStyles.container.paddingHorizontal,
    // fontSize: utils.fontSize.xsmall,
  },
});
