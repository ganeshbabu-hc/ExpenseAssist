import React from 'react';
import {View, Text, StyleSheet, FlatList, Pressable} from 'react-native';
import {colors, utils} from '../styles/common';
import Icon from 'react-native-vector-icons/dist/MaterialIcons';

interface IExpenseCategory {
  id: number;
  name: string;
  description: string;
}

const categries: IExpenseCategory[] = [
  {
    id: 0,
    name: 'Add',
    description: '',
  },
  {
    id: 1,
    name: 'Food',
    description: '',
  },
  {
    id: 2,
    name: 'Social',
    description: '',
  },
  {
    id: 3,
    name: 'Transport',
    description: '',
  },
  {
    id: 4,
    name: 'Investment',
    description: '',
  },
];

const ExpenseCategoryList = ({onChange}) => {
  return (
    <View style={styles.expenseWrapper}>
      <Text style={styles.title}>Category</Text>
      <FlatList
        showsHorizontalScrollIndicator={false}
        horizontal
        data={categries}
        renderItem={({item, index}) => {
          if (item.id === 0) {
            return (
              <View style={styles.categoryAddBtnWrapper}>
                <Pressable
                  style={styles.categoryAddBtn}
                  onPress={() => {
                    onChange(item.id);
                  }}>
                  <Icon name="add" size={48} />
                </Pressable>
              </View>
            );
          }
          return (
            <Pressable
              style={[
                styles.categoryItem,
                index % 2 === 0
                  ? styles.categoryItem.light
                  : styles.categoryItem.dark,
              ]}
              onPress={() => {
                onChange(item.id);
              }}>
              <Text style={styles.categoryTitle}>{item.name}</Text>
            </Pressable>
          );
        }}
        keyExtractor={(item: any) => item.id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  expenseWrapper: {
    backgroundColor: colors.brandLight,
    display: 'flex',
    overflow: 'scroll',
  },
  categoryAddBtnWrapper: {
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'center',
    marginRight: 15,
  },
  categoryAddBtn: {
    borderRadius: utils.inputRadius,
    borderWidth: 2,
    borderColor: colors.grayCardText,
    borderStyle: 'dotted',
  },
  categoryItem: {
    marginVertical: 20,
    padding: 20,
    backgroundColor: colors.brandMedium,
    marginHorizontal: 10,
    borderRadius: utils.inputRadius,
    dark: {
      backgroundColor: colors.brandMedium,
    },
    light: {
      backgroundColor: colors.brandDark,
    },
  },
  categoryTitle: {
    color: colors.white,
    fontSize: 18,
    fontWeight: '600',
  },
  title: {
    marginTop: 20,
    fontSize: 24,
    fontWeight: '600',
  },
});

export default ExpenseCategoryList;
