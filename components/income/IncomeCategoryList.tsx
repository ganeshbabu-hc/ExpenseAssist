import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, FlatList, Pressable} from 'react-native';
import {colors, utils} from '../styles/common';
import Icon from 'react-native-vector-icons/dist/MaterialIcons';
import {IIncomeCategory} from '../database/income/IncomeTypes';
import {getIncomeCaetegories} from '../database/income/IncomeController';
import IconMap from '../common/IconMap';

const defaultCategory: IIncomeCategory = {
  incomeCategoryId: 0,
  title: '',
  description: '',
  categoryIcon: 'plus',
};

const IncomeCategoryList = ({onChange}) => {
  const [incomeCategories, setIncomeCategories] = useState<IIncomeCategory[]>([
    defaultCategory,
  ]);

  const getCategoryList = async () => {
    const list: IIncomeCategory[] = await getIncomeCaetegories();
    list.unshift(defaultCategory);
    setIncomeCategories(list);
  };

  useEffect(() => {
    getCategoryList();
  }, []);
  return (
    <View style={styles.incomeWrapper}>
      <Text style={styles.title}>Category</Text>
      <FlatList
        showsHorizontalScrollIndicator={false}
        horizontal
        data={incomeCategories}
        renderItem={({item, index}) => {
          if (item.incomeCategoryId === 0) {
            return (
              <View style={styles.categoryAddBtnWrapper}>
                <Pressable
                  style={styles.categoryAddBtn}
                  onPress={() => {
                    onChange(item.incomeCategoryId);
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
                onChange(item.incomeCategoryId);
              }}>
              <IconMap iconName={item.categoryIcon} color={colors.white} />
              <Text style={styles.categoryTitle}>{item.title}</Text>
            </Pressable>
          );
        }}
        keyExtractor={(category: IIncomeCategory) =>
          category.incomeCategoryId.toString()
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  incomeWrapper: {
    backgroundColor: colors.brandLight,
    display: 'flex',
    overflow: 'scroll',
  },
  categoryAddBtnWrapper: {
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'center',
    marginVertical: 20,
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
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
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
    marginLeft: 10,
  },
  title: {
    marginTop: 20,
    fontSize: 24,
    fontWeight: '600',
  },
});

export default IncomeCategoryList;
