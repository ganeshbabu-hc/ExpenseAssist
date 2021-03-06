import React from 'react';
import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native';
import { THEME } from '../../utils/Constants';
import IconMap from '../IconMap';
import t from '../translations/Translation';
import { TransactionType } from '../../transaction/TransactionTypes';
import { GetTheme } from '../../styles/GetThemeHook';
import { typeListStyles } from '../../styles/commonStyles';

interface ITypeItem {
  id: number;
  title: string;
  icon: string;
  route: string;
  routeParams?: any;
}

const typeList: ITypeItem[] = [
  {
    id: 1,
    title: t('addExpense'),
    icon: 'payments',
    route: 'AddTransaction',
    routeParams: { type: TransactionType.EXPENSE },
  },
  {
    id: 2,
    title: t('addIncome'),
    icon: 'account-balance-wallet',
    route: 'AddTransaction',
    routeParams: { type: TransactionType.INCOME },
  },
  {
    id: 3,
    title: t('addReminder'),
    icon: 'alarm',
    route: 'AddReminder',
    routeParams: {},
  },
];

const TypeList = ({ navigation }: any) => {
  const { commonStyles, colors, styles } = GetTheme(typeListStyles);
  const _keyExtractor = (item: any) => item.id;

  const _renderItem = (item: ITypeItem, index: number) => {
    const cardType: any =
      index % 2 !== 0
        ? commonStyles.card.brandWhite
        : commonStyles.card.brandMedium;
    const lastCard = index === typeList.length - 1;
    if (item.id === 0) {
      return (
        <View style={styles.addBtnWrapper}>
          <Pressable
            style={styles.addBtn}
            onPress={() => {
              navigation.navigate(item.route);
            }}>
            <IconMap name="plus" size={48} color={colors.textCardGray} />
          </Pressable>
        </View>
      );
    }
    return (
      <Pressable
        style={[
          commonStyles.card,
          commonStyles.card.medium,
          commonStyles.shadowGray,
          cardType,
          lastCard ? commonStyles.mr20 : {},
          index === 0 ? commonStyles.card.firstCard : {},
        ]}
        onPress={() => {
          navigation.navigate(item.route, item.routeParams);
        }}>
        <View style={styles.typeCard}>
          <IconMap
            style={styles.typeCard.icon}
            name={item.icon}
            color={cardType.text.color}
            size={commonStyles.icon.width}
          />
          <Text style={[cardType.text, styles.typeCard.title]}>
            {item.title}
          </Text>
        </View>
      </Pressable>
    );
  };

  return (
    <View style={styles.typeListContainer}>
      <FlatList
        style={styles.list}
        showsHorizontalScrollIndicator={false}
        horizontal
        scrollEnabled
        data={typeList}
        renderItem={({ item, index }) => _renderItem(item, index)}
        keyExtractor={_keyExtractor}
      />
    </View>
  );
};

export default TypeList;

// const styles =
