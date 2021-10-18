import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, FlatList, Pressable} from 'react-native';
import {colors, utils} from '../styles/common';
import Icon from 'react-native-vector-icons/dist/MaterialIcons';
import {getExpenseCaetegories} from '../database/expense/ExpenseController';

interface IExpenseCategory {
  expensecategoryId: number;
  title: string;
  description: string;
  dateAddedTlm?: string;
  dateUpdatedTlm?: string;
  categoryIcon: string;
}

const ExpenseCategoryList = ({onChange}) => {
  const [expenseCategories, setExpenseCategories] = useState<
    IExpenseCategory[]
  >([
    {
      expensecategoryId: 0,
      title: '',
      description: '',
      categoryIcon: 'plus',
    },
  ]);

  const getCategoryList = async () => {
    const list = await getExpenseCaetegories();
    console.log(list);
  };

  useEffect(() => {
    getCategoryList();
  }, []);
  return (
    <View style={styles.expenseWrapper}>
      <Text style={styles.title}>Category</Text>
      <FlatList
        showsHorizontalScrollIndicator={false}
        horizontal
        data={expenseCategories}
        renderItem={({item, index}) => {
          if (item.expensecategoryId === 0) {
            return (
              <View style={styles.categoryAddBtnWrapper}>
                <Pressable
                  style={styles.categoryAddBtn}
                  onPress={() => {
                    onChange(item.expensecategoryId);
                  }}>
                  <Icon name="add" size={48} color={colors.grayCardText} />
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
                onChange(item.expensecategoryId);
              }}>
              <Text style={styles.categoryTitle}>{item.title}</Text>
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
    width: 80,
    paddingVertical: 6,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
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
