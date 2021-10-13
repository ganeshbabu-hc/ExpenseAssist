import React from 'react';
import {FlatList, StyleSheet, Text, View} from 'react-native';
import {commonStyles, colors} from '../styles/common';
import Icon from 'react-native-vector-icons/dist/MaterialIcons';
import FontAwesome from 'react-native-vector-icons/dist/FontAwesome';

interface ISummaryItem {
  id: number;
  title: string;
  icon: string;
  total: number;
}

const summaryList: ISummaryItem[] = [
  {id: 1, title: 'Total Income', icon: 'account-balance-wallet', total: 10000},
  {id: 2, title: 'Total Expense', icon: 'payments', total: 10000},
  {id: 3, title: "Month's Income", icon: 'credit-card', total: 10000},
  {
    id: 4,
    title: "Month's Expense",
    icon: 'account-balance-wallet',
    total: 10000,
  },
];

const SummaryList = ({navigation}: any) => {
  const _keyExtractor = (item: any, index: any) => item.id;

  const _renderItem = (item: ISummaryItem, index: number) => {
    const cardType: any =
      index % 2 === 0
        ? commonStyles.card.brandWhite
        : commonStyles.card.brandMedium;
    return (
      <View
        style={[
          commonStyles.card,
          commonStyles.card.large,
          commonStyles.shadowGray,
          cardType,
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
            size={20}
          />
          <Text style={[cardType.totalText, styles.summaryCard.total]}>
            {item.total}
          </Text>
        </View>

        {/* //   </View> */}
      </View>
    );
  };

  return (
    <View style={styles.summaryListContainer}>
      <Text style={(styles.title, commonStyles.title)}>Summary</Text>
      <FlatList
        style={styles.list}
        showsHorizontalScrollIndicator={false}
        horizontal
        data={summaryList}
        renderItem={({item, index}) => _renderItem(item, index)}
        keyExtractor={_keyExtractor}
      />
    </View>
  );
};

export default SummaryList;

const styles = StyleSheet.create({
  summaryListContainer: {
    marginTop: 10,
  },
  summaryCard: {
    display: 'flex',
    icon: {
      marginTop: 10,
    },
    title: {
      marginTop: 10,
    },
    total: {
      marginTop: 10,
      fontSize: 20,
      fontWeight: '700',
    },
    currencyIcon: {
      marginTop: 30,
    },
  },
  list: {
    marginTop: 20,
  },
  title: {
    marginTop: 20,
  },
});
