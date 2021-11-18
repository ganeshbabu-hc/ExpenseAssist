import React, {useEffect, useState} from 'react';
import {Animated, FlatList, Pressable, Text, View} from 'react-native';
import {colors, commonStyles, recentList} from '../../styles/theme';
import Icon from 'react-native-vector-icons/dist/MaterialIcons';
import FeatherIcon from 'react-native-vector-icons/dist/Feather';
import IconMap from '../../common/IconMap';
import {getTransactions} from './TransactionController';
import AppHeader from '../../common/AppHeader';
import AddInfo from '../../illustrations/AddInfo';
import {SafeAreaView} from 'react-native-safe-area-context';
import ScrollViewWrapper from '../../common/ScrollViewWrapper';
import {THEME} from '../../utils/Constants';
import t from '../../common/translations/Translation';
import {ITransaction, TransactionType} from './TransactionTypes';
import Empty from '../../illustrations/Empty';
import TransactionItem from './TransactionItem';

interface ITransactionList {
  limit?: number;
  navigation?: any;
  type?: TransactionType;
  header?: boolean;
  route?: any;
  scrollY?: Animated.Value;
}

const TransactionList = ({
  limit = 10,
  navigation,
  type = TransactionType.ALL,
  route,
  header,
  scrollY = new Animated.Value(0),
}: ITransactionList) => {
  header = route?.params?.header || header || false;
  type = route?.params?.type || type;
  const [loading, setLoading] = useState(false);
  const [transactionType, setTransactionType] = useState<TransactionType>(type);
  const [transactionList, setTransactionList] = useState<ITransaction[]>([]);
  const refreshList = () => {
    updateTransactions();
  };

  const renderItem = ({item, index}: any) => {
    // console.log(item.transactionCategoryIcon);
    return (
      <TransactionItem
        onUpdate={refreshList}
        item={item}
        index={index}
        navigation={navigation}
        type={transactionType}
      />
    );
  };

  // console.log(transactionList);
  const updateTransactions = async () => {
    // const recentsList = useSelector((state: any) => {
    //   if (transactionType === TransactionType.INCOME) {
    //     return state.income.incomeList;
    //   }
    //   return state.expense.expenseList;
    // });

    console.log('transactionType--', transactionType);
    const resultList = await getTransactions(limit, transactionType);
    // console.log(transactionList);
    setTransactionList(resultList);
    setLoading(false);
  };

  useEffect(() => {
    setLoading(true);
    updateTransactions();
  }, [transactionType]);

  React.useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      setLoading(true);
      updateTransactions();
    });

    return unsubscribe;
  }, [navigation]);

  return (
    <SafeAreaView style={commonStyles.screen}>
      <View style={commonStyles.container}>
        {header && (
          <AppHeader
            navigation={navigation}
            homeScreen={false}
            scrollY={scrollY}
            title={
              transactionType === TransactionType.INCOME
                ? t('Income')
                : transactionType === TransactionType.ALL
                ? t('All')
                : t('Expense')
            }
          />
        )}
      </View>
      <ScrollViewWrapper scrollY={scrollY}>
        <View style={[commonStyles.container, recentList.listWrapper]}>
          <View style={recentList.listHeader}>
            <Text style={[commonStyles.title, recentList.listTitle]}>
              {t('transactions')}
            </Text>
            {!header && (
              <Pressable
                onPress={() => {
                  navigation.navigate('TransactionList', {
                    transactionType,
                    limit: 10,
                    header: true,
                  });
                }}
                style={recentList.listHeaderIconWrapper}>
                <IconMap
                  style={recentList.listHeaderIcon}
                  iconName="ellipse-horz"
                  size={commonStyles.icon.width}
                  color={colors.theme[THEME].textBrandMedium}
                />
              </Pressable>
            )}
            {header && (
              <Pressable
                onPress={() => {
                  if (transactionType === TransactionType.EXPENSE) {
                    navigation.navigate('AddExpense');
                  } else {
                    navigation.navigate('AddIncome');
                  }
                }}
                style={recentList.listHeaderIconWrapper}>
                <Icon
                  style={recentList.listHeaderIcon}
                  name="add"
                  size={commonStyles.icon.width}
                  color={colors.theme[THEME].textBrandMedium}
                />
              </Pressable>
            )}
          </View>
          {!loading && (
            <FlatList
              scrollEnabled
              contentContainerStyle={commonStyles.contentContainerStyle}
              data={transactionList}
              renderItem={renderItem}
              onEndReachedThreshold={1}
              // onEndReached={({distanceFromEnd}) => {
              //   console.log(distanceFromEnd);
              //   if (distanceFromEnd < 0) {
              //     return;
              //   }
              //   console.log('End ---reached');
              // }}
              // onMomentumScrollBegin={() => {
              //   console.log('sroll---started');
              // }}
            />
          )}
          {transactionList.length < 1 && !loading && (
            <View style={commonStyles.illustrationWrapper}>
              {transactionType !== TransactionType.PINNED && (
                <AddInfo style={commonStyles.illustration} />
              )}
              {transactionType === TransactionType.PINNED && <Empty />}
              <Text style={commonStyles.illustrationTitle}>
                {transactionType === TransactionType.PINNED
                  ? t('noPinned')
                  : t('noTransaction')}
              </Text>
              {transactionType !== TransactionType.PINNED && (
                <Pressable
                  onPress={() => {
                    if (transactionType === TransactionType.EXPENSE) {
                      navigation.navigate('AddExpense');
                    } else {
                      navigation.navigate('AddIncome');
                    }
                  }}
                  style={commonStyles.illustrationTitleBtn}>
                  <FeatherIcon
                    name="plus"
                    color={colors.theme[THEME].textLight}
                    size={32}
                  />
                </Pressable>
              )}
            </View>
          )}
        </View>
      </ScrollViewWrapper>
      {header && (
        <View style={commonStyles.bottomTabContainer}>
          <Pressable
            onPress={() => {
              setTransactionType(TransactionType.ALL);
            }}
            style={commonStyles.bottomTabContainer}>
            <Text
              style={[
                transactionType === TransactionType.ALL
                  ? commonStyles.bottomTabTextActive
                  : commonStyles.bottomTabText,
              ]}>
              All
            </Text>
          </Pressable>
          <Pressable
            onPress={() => {
              setTransactionType(TransactionType.INCOME);
            }}
            style={commonStyles.bottomTabContainer}>
            <Text
              style={[
                transactionType === TransactionType.INCOME
                  ? commonStyles.bottomTabTextActive
                  : commonStyles.bottomTabText,
              ]}>
              {t('Income')}
            </Text>
          </Pressable>
          <Pressable
            onPress={() => {
              setTransactionType(TransactionType.EXPENSE);
            }}
            style={commonStyles.bottomTab}>
            <Text
              style={[
                transactionType === TransactionType.EXPENSE
                  ? commonStyles.bottomTabTextActive
                  : commonStyles.bottomTabText,
              ]}>
              {t('Expense')}
            </Text>
          </Pressable>
          <Pressable
            onPress={() => {
              setTransactionType(TransactionType.PINNED);
            }}
            style={commonStyles.bottomTab}>
            <Text
              style={[
                transactionType === TransactionType.PINNED
                  ? commonStyles.bottomTabTextActive
                  : commonStyles.bottomTabText,
              ]}>
              {t('pinned')}
            </Text>
          </Pressable>
        </View>
      )}
    </SafeAreaView>
  );
};

// {
//   /* <FadeInFlatList
// durationPerItem={50}
// data={recentsList}
// itemsToFadeIn={10}
// key={keyExtractor}
// initialDelay={200}
// renderItem={renderItem}
// /> */
// }

export default TransactionList;
