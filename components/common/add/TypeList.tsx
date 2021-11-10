import React from 'react';
import {FlatList, Pressable, StyleSheet, Text, View} from 'react-native';
import {commonStyles, colors, utils, ripple} from '../../styles/theme';
import Icon from 'react-native-vector-icons/dist/MaterialIcons';

interface ITypeItem {
  id: number;
  title: string;
  icon: string;
  route: string;
}

const typeList: ITypeItem[] = [
  // {id: 0, title: '', icon: 'add', route: ''},
  {id: 1, title: 'Add \nExpense', icon: 'payments', route: 'AddExpense'},
  {
    id: 2,
    title: 'Add \nIncome',
    icon: 'account-balance-wallet',
    route: 'AddIncome',
  },
  {
    id: 3,
    title: 'Add \nReminder',
    icon: 'alarm',
    route: 'AddReminder',
  },
];

const TypeList = ({navigation}: any) => {
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
            <Icon name="add" size={48} color={colors.grayCardText} />
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
          navigation.navigate(item.route, {});
        }}>
        <View style={styles.typeCard}>
          <Icon
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
    <View style={styles.typeListWrapper}>
      <View style={styles.typeListContainer}>
        <FlatList
          style={styles.list}
          showsHorizontalScrollIndicator={false}
          horizontal
          scrollEnabled
          data={typeList}
          renderItem={({item, index}) => _renderItem(item, index)}
          keyExtractor={_keyExtractor}
        />
      </View>
    </View>
  );
};

export default TypeList;

const styles = StyleSheet.create({
  typeListWrapper: {
    backgroundColor: colors.white,
  },
  typeListContainer: {
    backgroundColor: colors.brand.brandLight,
    overflow: 'hidden',
    paddingBottom: 20,
    borderBottomRightRadius: 40,
  },
  typeCard: {
    display: 'flex',
    icon: {
      marginTop: 12,
    },
    title: {
      marginTop: 10,
      fontSize: utils.fontSize.xsmall,
      fontFamily: utils.fontFamily.Bold,
    },
  },
  list: {
    marginTop: 20,
  },
  title: {
    marginTop: 20,
  },
  addBtnWrapper: {
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'center',
    marginLeft: commonStyles.container.paddingHorizontal,
  },
  addBtn: {
    borderRadius: utils.inputRadius,
    borderWidth: 2,
    borderColor: colors.grayCardText,
    borderStyle: 'dotted',
  },
});
