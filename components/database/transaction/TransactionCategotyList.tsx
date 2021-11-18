import React, { useEffect, useRef, useState } from 'react';
import { View, Text, FlatList, Pressable } from 'react-native';
import { categoryList, colors, commonStyles } from '../../styles/theme';
import Icon from 'react-native-vector-icons/dist/MaterialIcons';
import IconMap from '../../common/IconMap';
import { useSelector } from 'react-redux';
import { THEME } from '../../utils/Constants';
import {
  ITransactionCategory,
  TransactionType,
} from '../transaction/TransactionTypes';
import { getTransactionCategories } from './TransactionController';

const defaultCategory: ITransactionCategory = {
  transactionCategoryId: 0,
  title: '',
  transactionType: TransactionType.EXPENSE,
  description: '',
  categoryIcon: 'plus',
};
interface TransactionCategotyList {
  navigation?: any;
  onChange: Function;
  defaultValue?: number | null;
  type: TransactionType;
}

const TransactionCategotyList = ({
  navigation,
  onChange,
  defaultValue,
  type,
}: TransactionCategotyList) => {
  const flatList = useRef<FlatList>(null);
  const [activeCategory, setActiveCategory] = useState(defaultValue);
  const [transactionCategories, setTransactionCategories] = useState<
    ITransactionCategory[]
  >([]);

  const scrollToSeletedCategory = (list: ITransactionCategory[]) => {
    setTimeout(() => {
      let scrollIndex = 0;
      list.forEach((category: ITransactionCategory, index: number) => {
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

  const getTransactionCategoryList = async () => {
    const categoriesList = [...(await getTransactionCategories(type))];
    categoriesList.unshift(defaultCategory);
    setTransactionCategories(categoriesList);
    scrollToSeletedCategory(categoriesList);
  };
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      getTransactionCategoryList();
    });
    // scrollToSeletedCategory(expenseCategories);
    return unsubscribe;
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
        data={transactionCategories}
        renderItem={({ item, index }) => {
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
                      type,
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
                  name={'check-circle'}
                  color={colors.theme[THEME].textLight}
                />
              )}
              <IconMap
                name={item.categoryIcon ?? 'cash-minus'}
                color={colors.theme[THEME].textLight}
              />
              <Text style={categoryList.categoryTitle}>{item.title}</Text>
            </Pressable>
          );
        }}
        keyExtractor={(category: ITransactionCategory, index: number) =>
          category?.transactionCategoryId?.toString() || `category-id${index}`
        }
      />
    </View>
  );
};

export default TransactionCategotyList;
