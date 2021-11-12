import React, {useEffect, useLayoutEffect, useRef, useState} from 'react';
import {View, Text, FlatList, Pressable, FlatListProps} from 'react-native';
import {categoryList, colors, commonStyles, utils} from '../styles/theme';
import Icon from 'react-native-vector-icons/dist/MaterialIcons';
import {IIncomeCategory} from '../database/income/IncomeTypes';
import {getIncomeCaetegories} from '../database/income/IncomeController';
import IconMap from '../common/IconMap';
import CustomPressable from '../common/CustomPressable';
import {useSelector} from 'react-redux';
import {THEME} from '../utils/Constants';

const defaultCategory: IIncomeCategory = {
  incomeCategoryId: 0,
  title: '',
  description: '',
  categoryIcon: 'plus',
};

const IncomeCategoryList = ({navigation, onChange, defaultValue}) => {
  const flatList = useRef<FlatList>(null);
  const [activeCategory, setActiveCategory] = useState(defaultValue);

  const incomeCategories = useSelector((state: any) => {
    const list = [...state.income.incomeCategoryList];
    console.log(list);
    list.unshift(defaultCategory);
    return list;
  });

  const scrollToSeletedCategory = (list: IIncomeCategory[]) => {
    setTimeout(() => {
      let scrollIndex = 0;
      list.forEach((category: IIncomeCategory, index: number) => {
        console.log(category.incomeCategoryId, activeCategory);
        if (category.incomeCategoryId === activeCategory) {
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
          if (item.incomeCategoryId === 0) {
            return (
              <View
                style={[
                  categoryList.categoryAddBtnWrapper,
                  index === 0 ? commonStyles.card.firstCard : {},
                ]}>
                <Pressable
                  style={categoryList.categoryAddBtn}
                  onPress={() => {
                    navigation.navigate('AddEditCategory', {type: 'income'});
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
                setActiveCategory(item.incomeCategoryId);
                onChange(item.incomeCategoryId);
              }}>
              {activeCategory === item.incomeCategoryId && (
                <IconMap
                  style={categoryList.activeCategory}
                  iconName={'check-circle'}
                  color={colors.theme[THEME].brandMediumDark}
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
        keyExtractor={(category: IIncomeCategory) =>
          category.incomeCategoryId.toString()
        }
      />
      <CustomPressable />
    </View>
  );
};

export default IncomeCategoryList;
