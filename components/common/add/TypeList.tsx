import React from 'react';
import {FlatList, Pressable, StyleSheet, Text, View} from 'react-native';
import {commonStyles, colors, utils} from '../../styles/common';
import Icon from 'react-native-vector-icons/dist/MaterialIcons';

interface ITypeItem {
  id: number;
  title: string;
  icon: string;
  route: string;
}

const summaryList: ITypeItem[] = [
  {id: 0, title: '', icon: 'add', route: ''},
  {id: 1, title: 'Add Expense', icon: 'payments', route: 'AddExpense'},
  {
    id: 2,
    title: 'Add Income',
    icon: 'account-balance-wallet',
    route: 'AddIncome',
  },
];

const TypeList = ({navigation}: any) => {
  const _keyExtractor = (item: any) => item.id;

  const _renderItem = (item: ITypeItem, index: number) => {
    const cardType: any =
      index % 2 === 0
        ? commonStyles.card.brandWhite
        : commonStyles.card.brandMedium;

    //for add btn
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
        ]}
        onPress={() => {
          navigation.navigate(item.route);
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
    <View style={styles.typeListContainer}>
      <FlatList
        style={styles.list}
        showsHorizontalScrollIndicator={false}
        horizontal
        scrollEnabled={false}
        data={summaryList}
        renderItem={({item, index}) => _renderItem(item, index)}
        keyExtractor={_keyExtractor}
      />
    </View>
  );
};

export default TypeList;

const styles = StyleSheet.create({
  typeListContainer: {
    marginTop: 10,
  },
  typeCard: {
    display: 'flex',
    icon: {
      marginTop: 15,
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
  addBtnWrapper: {
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'center',
    width: 80,
  },
  addBtn: {
    borderRadius: utils.inputRadius,
    borderWidth: 2,
    borderColor: colors.grayCardText,
    borderStyle: 'dotted',
  },
});
