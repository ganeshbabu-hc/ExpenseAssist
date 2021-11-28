import React from 'react';
import { FlatList, Pressable, Text, View } from 'react-native';
import IconMap from '../common/IconMap';
import t from '../common/translations/Translation';
import { TransactionType } from '../transaction/TransactionTypes';
import { GetTheme } from '../styles/GetThemeHook';
import { quickMenuStyles } from '../styles/commonStyles';

interface ITypeItem {
  id: number;
  title: string;
  icon: string;
  route: string;
  routeParams: any;
}

const summaryList: ITypeItem[] = [
  {
    id: 1,
    title: t('pinned'),
    icon: 'paper-clip',
    route: 'TransactionList',
    routeParams: {
      type: TransactionType.PINNED,
      header: true,
    },
  },

  {
    id: 2,
    title: t('savings'),
    icon: 'payments',
    route: 'AddIncome',
    routeParams: {},
  },
  {
    id: 3,
    title: t('reminders'),
    icon: 'alarm',
    route: 'AddExpense',
    routeParams: {},
  },
];

const QuickMenu = ({ navigation }) => {
  const { styles, commonStyles, colors } = GetTheme(quickMenuStyles);
  const _keyExtractor = (item: any) => item.id;

  const _renderItem = (item: ITypeItem, index: number) => {
    const cardType: any =
      index % 2 === 0
        ? commonStyles.card.brandMedium
        : commonStyles.card.brandWhite;
    const lastCard = index === summaryList.length - 1;
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
          <View
            style={[
              styles.iconWrapper,
              index % 2 === 0 ? styles.lightBg : styles.darKbg,
            ]}>
            <IconMap
              name={item.icon}
              color={
                index % 2 === 0
                  ? colors.textBrandMedium
                  : colors.textBrandMedium
              }
              size={commonStyles.icon.width}
            />
          </View>
          <Text style={[cardType.text, styles.typeCard.title]}>
            {item.title}
          </Text>
        </View>
      </Pressable>
    );
  };

  return (
    <View style={styles.quickMenuContainer}>
      <View style={styles.typeListContainer}>
        <Text style={[commonStyles.title, commonStyles.card.firstCard]}>
          {t('quickMenu')}
        </Text>
        <FlatList
          style={styles.list}
          showsHorizontalScrollIndicator={false}
          horizontal
          scrollEnabled
          data={summaryList}
          renderItem={({ item, index }) => _renderItem(item, index)}
          keyExtractor={_keyExtractor}
        />
      </View>
      {/* </View> */}
    </View>
  );
};

export default QuickMenu;

// const styles =
