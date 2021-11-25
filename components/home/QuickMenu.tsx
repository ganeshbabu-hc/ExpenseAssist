import React from 'react';
import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native';
import { colors, commonStyles, utils } from '../styles/theme';
import { THEME } from '../utils/Constants';
import IconMap from '../common/IconMap';
import t from '../common/translations/Translation';
import { TransactionType } from '../transaction/TransactionTypes';

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
                  ? colors.theme[THEME].textBrandMedium
                  : colors.theme[THEME].textBrandMedium
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
      {/* <View style={styles.imgContainer}>
        <Image
          resizeMode="contain"
          style={styles.img}
          source={require('../../assets/img/wave.png')}
        />
      </View> */}

      {/* <View style={[utils.bgWhite]}> */}
      <View style={styles.typeListContainer}>
        <Text style={[commonStyles.title, commonStyles.card.firstCard]}>
          Quick Menu
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

const styles = StyleSheet.create({
  quickMenuContainer: {
    backgroundColor: colors.theme[THEME].brandBg,
    // borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    overflow: 'hidden',
  },
  quickMenuTitle: {
    // color:
  },
  imgContainer: {
    marginTop: 30,
  },
  img: {
    backgroundColor: colors.theme[THEME].brandBg,
    width: '100%',
    height: 29,
  },
  iconWrapper: {
    borderRadius: utils.inputRadius,
    overflow: 'hidden',
    width: 40,
    height: 40,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 12,
  },
  typeListContainer: {
    marginTop: 10,
  },
  lightBg: {
    backgroundColor: colors.theme[THEME].brandLight,
  },
  darKbg: {
    backgroundColor: colors.theme[THEME].brandBg,
  },
  typeCard: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    title: {
      marginTop: 10,
      fontSize: utils.fontSize.xsmall,
      fontFamily: utils.fontFamily.Bold,
    },
  },
  list: {
    // marginTop: 20,
  },
  title: {
    marginTop: 20,
  },
  addBtnWrapper: {
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'center',
    width: 80,
  },
  addBtn: {
    borderRadius: utils.inputRadius,
    borderWidth: 2,
    borderColor: colors.theme[THEME].textCardGray,
    borderStyle: 'dotted',
  },
});
