import React, {useEffect, useState} from 'react';
import {View, Text, FlatList, Pressable} from 'react-native';
import {categoryList, colors, commonStyles, utils} from '../styles/theme';
import Icon from 'react-native-vector-icons/dist/MaterialIcons';
import {IIncomeCategory} from '../database/income/IncomeTypes';
import {getIncomeCaetegories} from '../database/income/IncomeController';
import IconMap from '../common/IconMap';
import CustomPressable from '../common/CustomPressable';

const defaultCategory: IIncomeCategory = {
  incomeCategoryId: 0,
  title: '',
  description: '',
  categoryIcon: 'plus',
};

const IncomeCategoryList = ({navigation, onChange, defaultValue}) => {
  const [incomeCategories, setIncomeCategories] = useState<IIncomeCategory[]>([
    defaultCategory,
  ]);
  const [activeCategory, setActiveCategory] = useState(defaultValue);
  const getCategoryList = async () => {
    const list: IIncomeCategory[] = await getIncomeCaetegories();
    list.unshift(defaultCategory);
    setIncomeCategories(list);
  };

  useEffect(() => {
    getCategoryList();
  }, []);
  return (
    <View style={categoryList.expensitureWrapper}>
      <Text style={commonStyles.categoryTitle}>Category</Text>
      <FlatList
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
                    navigation.navigate('AddEditCategory', {type: 'Income'});
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
                activeCategory === item.incomeCategoryId
                  ? categoryList.activeCategory
                  : {},
                index % 2 === 0
                  ? categoryList.categoryItem.light
                  : categoryList.categoryItem.dark,
              ]}
              onPress={() => {
                setActiveCategory(item.incomeCategoryId);
                onChange(item.incomeCategoryId);
              }}>
              <IconMap iconName={item.categoryIcon} color={colors.white} />
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
