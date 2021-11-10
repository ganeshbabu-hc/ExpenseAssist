import React from 'react';
import {FlatList, StyleSheet, Text, View} from 'react-native';
import {colors, commonStyles, utils} from '../styles/theme';
import Icon from 'react-native-vector-icons/dist/MaterialIcons';
import FontAwesome from 'react-native-vector-icons/dist/FontAwesome';
import {useSelector} from 'react-redux';
import {ISummary} from '../database/common/SummaryController';
import CText from '../common/CText';
import {numberFormatter} from '../utils/Formatter';

interface ISummaryItem {
  id: number;
  title: string;
  icon: string;
  total: number | undefined;
}

const SummaryList = ({navigation}: any) => {
  const summary: ISummary = useSelector(
    (state: any) => state.summary.summaryList,
  );

  const summaryCardList: ISummaryItem[] = [
    {
      id: 3,
      title: 'Monthly \nincome',
      icon: 'account-balance-wallet',
      total: summary.monthlyIncome,
    },
    {
      id: 4,
      title: 'Monthly \nexpense',
      icon: 'account-balance-wallet',
      total: summary.monthlyExpense,
    },
    {
      id: 1,
      title: 'Total \nincome',
      icon: 'account-balance-wallet',
      total: summary.totalIncome,
    },
    {
      id: 2,
      title: 'Total \nexpense',
      icon: 'account-balance-wallet',
      total: summary.totalExpense,
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
      <View
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
          <FontAwesome
            android="rupee"
            name="rupee"
            style={styles.summaryCard.currencyIcon}
            color={cardType.totalText.color}
            size={18}
          />
          <Text style={[cardType.totalText, styles.summaryCard.total]}>
            {numberFormatter(item.total)}
          </Text>
        </View>
      </View>
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
    backgroundColor: colors.white,
    overflow: 'hidden',
  },
  summaryListContainer: {
    // marginBottom: 10,
    backgroundColor: colors.brand.brandLight,
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
      fontSize: utils.fontSize.xsmall,
    },
    total: {
      marginTop: 4,
      fontSize: utils.fontSize.small,
      fontFamily: utils.fontFamily.Bold,
    },
    currencyIcon: {
      marginTop: 20,
    },
  },
  list: {},
  title: {
    marginLeft: commonStyles.container.paddingHorizontal,
    // fontSize: utils.fontSize.xsmall,
  },
});
