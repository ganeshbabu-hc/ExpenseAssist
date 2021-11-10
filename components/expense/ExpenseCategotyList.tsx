import React, {useEffect, useRef, useState} from 'react';
import {View, Text, StyleSheet, FlatList, Pressable} from 'react-native';
import {
  categoryList,
  colors,
  commonStyles,
  ripple,
  utils,
} from '../styles/theme';
import Icon from 'react-native-vector-icons/dist/MaterialIcons';
import {IExpense, IExpenseCategory} from '../database/expense/ExpenseTypes';
import {getExpenseCaetegories} from '../database/expense/ExpenseController';
import IconMap from '../common/IconMap';

const defaultCategory: IExpenseCategory = {
  expenseCategoryId: 0,
  title: '',
  description: '',
  categoryIcon: 'plus',
};

const ExpenseCategoryList = ({navigation, onChange, defaultValue}) => {
  const flatListref = useRef<FlatList>(null);
  const [expenseCategories, setExpenseCategories] = useState<
    IExpenseCategory[]
  >([]);
  const [activeCategory, setActiveCategory] = useState(defaultValue);
  const getCategoryList = async () => {
    const list: IExpenseCategory[] = await getExpenseCaetegories();
    list.unshift(defaultCategory);
    setExpenseCategories(list);
    // flatListref?.current?.scrollToIndex({
    //   animated: true,
    //   index: defaultValue - 1,
    // });
    // list.forEach((item: IExpenseCategory, index: number) => {
    //   if (item.expenseCategoryId === defaultValue) {
    //     setTimeout(() => {

    //     });
    //   }
    // });
  };

  useEffect(() => {
    getCategoryList();
    // flatListref?.current?.scrollToIndex({animated: true, index: 0});
  }, []);
  return (
    <View style={categoryList.expensitureWrapper}>
      <Text style={commonStyles.categoryTitle}>Category</Text>
      <FlatList
        keyboardDismissMode="interactive"
        keyboardShouldPersistTaps="always"
        ref={flatListref}
        initialScrollIndex={0}
        showsHorizontalScrollIndicator={false}
        horizontal
        data={expenseCategories}
        renderItem={({item, index}) => {
          if (item.expenseCategoryId === 0) {
            return (
              <View style={categoryList.categoryAddBtnWrapper}>
                <Pressable
                  style={categoryList.categoryAddBtn}
                  onPress={() => {
                    navigation.navigate('AddEditCategory', {type: 'Expense'});
                  }}>
                  <Icon name="add" size={38} color={colors.grayCardText} />
                </Pressable>
              </View>
            );
          }
          return (
            <Pressable
              style={[
                categoryList.categoryItem,
                activeCategory === item.expenseCategoryId
                  ? categoryList.activeCategory
                  : {},
                index % 2 === 0
                  ? categoryList.categoryItem.light
                  : categoryList.categoryItem.dark,
              ]}
              onPress={() => {
                setActiveCategory(item.expenseCategoryId);
                onChange(item.expenseCategoryId);
              }}>
              <IconMap iconName={item.categoryIcon} color={colors.white} />
              <Text style={categoryList.categoryTitle}>{item.title}</Text>
            </Pressable>
          );
        }}
        keyExtractor={(category: IExpenseCategory) =>
          category.expenseCategoryId.toString()
        }
      />
    </View>
  );
};

export default ExpenseCategoryList;
