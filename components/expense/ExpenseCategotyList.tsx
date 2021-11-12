import React, {useEffect, useRef, useState} from 'react';
import {View, Text, FlatList, Pressable} from 'react-native';
import {categoryList, colors, commonStyles} from '../styles/theme';
import Icon from 'react-native-vector-icons/dist/MaterialIcons';
import {IExpenseCategory} from '../database/expense/ExpenseTypes';
import {getExpenseCaetegories} from '../database/expense/ExpenseController';
import IconMap from '../common/IconMap';
import {useSelector} from 'react-redux';
import { THEME } from '../utils/Constants';

const defaultCategory: IExpenseCategory = {
  expenseCategoryId: 0,
  title: '',
  description: '',
  categoryIcon: 'plus',
};

const ExpenseCategoryList = ({navigation, onChange, defaultValue}) => {
  const flatList = useRef<FlatList>(null);
  const [activeCategory, setActiveCategory] = useState(defaultValue);
  const expenseCategories = useSelector((state: any) => {
    const list = [...state.expense.expenseCategoryList];
    list.unshift(defaultCategory);
    return list;
  });

  const scrollToSeletedCategory = (list: IExpenseCategory[]) => {
    setTimeout(() => {
      let scrollIndex = 0;
      list.forEach((category: IExpenseCategory, index: number) => {
        console.log(category.expenseCategoryId, activeCategory);
        if (category.expenseCategoryId === activeCategory) {
          scrollIndex = index;
        }
      });
      if (scrollIndex !== 0) {
        flatList?.current?.scrollToIndex({
          index: scrollIndex,
          animated: true,
          viewOffset: 40,
        });
      }
    }, 500);
  };
  useEffect(() => {
    scrollToSeletedCategory(expenseCategories);
  }, []);
  return (
    <View style={categoryList.expensitureWrapper}>
      <Text style={commonStyles.categoryTitle}>Category</Text>
      <FlatList
        keyboardDismissMode="interactive"
        keyboardShouldPersistTaps="always"
        ref={flatList}
        initialScrollIndex={0}
        showsHorizontalScrollIndicator={false}
        horizontal
        data={expenseCategories}
        renderItem={({item, index}) => {
          if (item.expenseCategoryId === 0) {
            return (
              <View
                style={[
                  categoryList.categoryAddBtnWrapper,
                  index === 0 ? commonStyles.card.firstCard : {},
                ]}>
                <Pressable
                  style={categoryList.categoryAddBtn}
                  onPress={() => {
                    navigation.navigate('AddEditCategory', {type: 'expense'});
                  }}>
                  <Icon
                    name="add"
                    size={38}
                    color={colors.theme[THEME].textCardGray}
                  />
                </Pressable>
              </View>
            );
          }
          return (
            <Pressable
              style={[
                categoryList.categoryItem,
                index % 2 === 0
                  ? categoryList.categoryItem.light
                  : categoryList.categoryItem.dark,
              ]}
              onPress={() => {
                setActiveCategory(item.expenseCategoryId);
                onChange(item.expenseCategoryId);
              }}>
              {activeCategory === item.expenseCategoryId && (
                <IconMap
                  style={categoryList.activeCategory}
                  iconName={'check-circle'}
                  color={colors.theme[THEME].brandMediumDark}
                />
              )}
              <IconMap
                iconName={item.categoryIcon ?? 'cash-minus'}
                color={colors.theme[THEME].textLight}
              />
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
