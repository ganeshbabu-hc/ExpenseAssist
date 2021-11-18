import React, {useEffect, useRef, useState} from 'react';
import {View, Text, FlatList, Pressable} from 'react-native';
import {categoryList, colors, commonStyles} from '../styles/theme';
import Icon from 'react-native-vector-icons/dist/MaterialIcons';
import IconMap from '../common/IconMap';
import CustomPressable from '../common/CustomPressable';
import {useSelector} from 'react-redux';
import {THEME} from '../utils/Constants';
import {
  ITransactionCategory,
  TransactionType,
} from '../database/transaction/TransactionTypes';

const defaultCategory: ITransactionCategory = {
  transactionCategoryId: 0,
  title: '',
  transactionType: TransactionType.EXPENSE,
  description: '',
  categoryIcon: 'plus',
};

const IncomeCategoryList = ({navigation, onChange, defaultValue}) => {
  const flatList = useRef<FlatList>(null);
  const [activeCategory, setActiveCategory] = useState(defaultValue);

  const incomeCategories = useSelector((state: any) => {
    const list = [...state.income.incomeCategoryList];
    list.unshift(defaultCategory);
    return list;
  });

  const scrollToSeletedCategory = (list: ITransactionCategory[]) => {
    setTimeout(() => {
      let scrollIndex = 0;
      list.forEach((category: ITransactionCategory, index: number) => {
        // console.log(category.transactionCategoryId, activeCategory);
        if (category.transactionCategoryId === activeCategory) {
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
    scrollToSeletedCategory(incomeCategories);
  }, []);
  return (
    <View style={categoryList.expensitureWrapper}>
      <Text style={commonStyles.categoryTitle}>Category</Text>
      <FlatList
        ref={flatList}
        keyboardDismissMode="interactive"
        keyboardShouldPersistTaps="always"
        showsHorizontalScrollIndicator={false}
        horizontal
        data={incomeCategories}
        renderItem={({item, index}) => {
          console.log(item.categoryIcon);
          if (item.transactionCategoryId === 0) {
            return (
              <View
                style={[
                  categoryList.categoryAddBtnWrapper,
                  index === 0 ? commonStyles.card.firstCard : {},
                ]}>
                <Pressable
                  style={categoryList.categoryAddBtn}
                  onPress={() => {
                    navigation.navigate('AddEditCategory', {
                      type: TransactionType.INCOME,
                    });
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
                setActiveCategory(item.transactionCategoryId);
                onChange(item.transactionCategoryId);
              }}>
              {activeCategory === item.transactionCategoryId && (
                <IconMap
                  style={categoryList.activeCategory}
                  iconName={'check-circle'}
                  color={colors.theme[THEME].textLight}
                />
              )}
              <IconMap
                iconName={item.categoryIcon}
                color={colors.theme[THEME].textLight}
              />
              <Text style={categoryList.categoryTitle}>{item.title}</Text>
            </Pressable>
          );
        }}
        keyExtractor={(category: ITransactionCategory) =>
          category.transactionCategoryId.toString()
        }
      />
      <CustomPressable />
    </View>
  );
};

export default IncomeCategoryList;
