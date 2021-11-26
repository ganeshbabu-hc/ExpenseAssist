import * as React from 'react';
import { FlatList, Pressable, SafeAreaView, Text, View } from 'react-native';
import AppHeader from '../common/AppHeader';
import { useEffect, useState } from 'react';
import t from '../common/translations/Translation';
import {
  ITransactionCategory,
  ITransactionTypes,
  TransactionType,
} from '../transaction/TransactionTypes';
import { getTransactionCategories } from '../transaction/TransactionController';
import TransactionCategoryItem from './TransactionCategoryItem';
import IconMap from '../common/IconMap';
import { GetStyle, GetTheme } from '../styles/GetThemeHook';
import { categoriesScreenStyle } from '../styles/commonStyles';

const transactionTypes: ITransactionTypes[] = [
  {
    id: 1,
    label: t('Expense'),
    type: TransactionType.EXPENSE,
  },
  {
    id: 2,
    label: t('Income'),
    type: TransactionType.INCOME,
  },
];

interface ICategoriesScreen {
  navigation: any;
  route: any;
}

const CategoriesScreen = ({ navigation }: ICategoriesScreen) => {
  const { commonStyles, colors } = GetTheme();
  const styles = GetStyle(categoriesScreenStyle);
  const [loading, setLoading] = useState(false);
  const [transactionType, setTransactionType] = useState<TransactionType>(
    TransactionType.EXPENSE,
  );
  const [categoryList, setCategoryList] = useState<ITransactionCategory[]>([]);

  const getCategories = async () => {
    setLoading(true);
    const categories: ITransactionCategory[] = await getTransactionCategories(
      transactionType,
    );
    setLoading(false);
    setCategoryList(categories);
  };

  useEffect(() => {
    getCategories();
  }, [transactionType]);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      getCategories();
    });
    return unsubscribe;
  }, []);

  return (
    <SafeAreaView style={commonStyles.screen}>
      <View style={commonStyles.container}>
        <AppHeader
          navigation={navigation}
          homeScreen={false}
          title={t('categories')}
        />
        <View />
      </View>
      <View style={[commonStyles.container, commonStyles.mb160]}>
        {!loading && (
          <FlatList
            // maxToRenderPerBatch={10}
            scrollEnabled
            showsVerticalScrollIndicator={false}
            contentContainerStyle={commonStyles.contentContainerStyle}
            data={categoryList}
            renderItem={({ item, index }: any) => {
              return (
                <TransactionCategoryItem
                  index={index}
                  category={item}
                  navigation={navigation}
                  onUpdate={getCategories}
                />
              );
            }}
            onEndReachedThreshold={1}
          />
        )}
      </View>
      <View style={commonStyles.bottomTabContainer}>
        {transactionTypes.map((transactionItem: ITransactionTypes) => {
          return (
            <Pressable
              key={`list-type-${transactionItem.id}`}
              onPress={() => {
                setTransactionType(transactionItem.type);
              }}
              style={commonStyles.bottomTab}>
              <Text
                style={[
                  transactionType === transactionItem.type
                    ? commonStyles.bottomTabTextActive
                    : commonStyles.bottomTabText,
                ]}>
                {transactionItem.label}
              </Text>
            </Pressable>
          );
        })}
        <Pressable
          key={'list-type-3'}
          onPress={() => {
            navigation.navigate('AddEditCategory', { type: transactionType });
          }}
          style={styles.addCategoryBtn}>
          <IconMap name="plus" size={34} color={colors.textLight} />
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

export default CategoriesScreen;
