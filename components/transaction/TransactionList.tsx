import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import {
  Animated,
  FlatList,
  Pressable,
  Text,
  TextInput,
  View,
} from 'react-native';
import { colors, commonStyles, formStyles, recentList } from '../styles/theme';
import IconMap from '../common/IconMap';
import { getTransactions } from './TransactionController';
import AppHeader from '../common/AppHeader';
import { SafeAreaView } from 'react-native-safe-area-context';
import ScrollViewWrapper from '../common/ScrollViewWrapper';
import { DEBOUNCE_RATE, THEME } from '../utils/Constants';
import t from '../common/translations/Translation';
import { ITransaction, TransactionType } from './TransactionTypes';
import Empty from '../illustrations/Empty';
import TransactionItem from './TransactionItem';
import AddDoc from '../illustrations/AddDoc';
import debounce from 'lodash.debounce';

interface ITransactionList {
  limit?: number;
  navigation?: any;
  type?: TransactionType;
  header?: boolean;
  route?: any;
  scrollY?: Animated.Value;
}

interface ITransactionTypes {
  id: number;
  label: string;
  type: TransactionType;
}

const transactionTypes: ITransactionTypes[] = [
  {
    id: 1,
    label: t('all'),
    type: TransactionType.ALL,
  },
  {
    id: 2,
    label: t('Income'),
    type: TransactionType.INCOME,
  },
  {
    id: 3,
    label: t('Expense'),
    type: TransactionType.EXPENSE,
  },
  {
    id: 4,
    label: t('pinned'),
    type: TransactionType.PINNED,
  },
];

// const usePrevious = (value: TransactionType) => {
//   const ref = useRef();
//   // Store current value in ref
//   useEffect(() => {
//     ref.current = value;
//   }, [value]); // Only re-run if value changes
//   // Return previous value (happens before update in useEffect above)
//   return ref.current;
// };

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
  const animatedValue = useRef(new Animated.Value(0)).current;
  const animatedSearch = useRef(new Animated.Value(1)).current;
  const [loading, setLoading] = useState(false);
  const [transactionType, setTransactionType] = useState<TransactionType>(type);
  const [transactionList, setTransactionList] = useState<ITransaction[]>([]);
  const [enableSearch, setEnableSearch] = useState(false);
  const [title, setTitle] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  const searchDebounce = useCallback(
    debounce((query: string) => {
      handleTransactionSearch(query);
    }, DEBOUNCE_RATE),
    [enableSearch],
  );

  const onQueryChange = (query: string) => {
    setSearchQuery(query);
    searchDebounce(query);
  };

  const handleTransactionSearch = (query: string) => {
    if (enableSearch) {
      updateTransactions(true, transactionType, query);
    }
  };

  const refreshList = () => {
    updateTransactions(false);
  };

  const renderItem = ({ item, index }: any) => {
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

  const updateTransactions = async (
    refresh: boolean = true,
    overrideType?: TransactionType,
    query?: string,
  ) => {
    if (refresh) {
      setLoading(true);
    }
    const resultList = await getTransactions(
      limit,
      overrideType ?? transactionType,
      query,
    );
    setTransactionList(resultList);
    setLoading(false);
  };

  const animateTranslation = animatedValue?.interpolate({
    inputRange: [0, 1],
    outputRange: [40, 0],
    extrapolate: 'clamp',
  });

  const animateTranslationSearch = animatedValue?.interpolate({
    inputRange: [0, 1],
    outputRange: [40, 0],
    extrapolate: 'clamp',
  });
  const animateOpacity = animatedValue?.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 1],
    extrapolate: 'clamp',
  });

  const animateAddButton = () => {
    let newAnimatedValue: number;
    if (
      transactionType === TransactionType.PINNED ||
      transactionType === TransactionType.ALL
    ) {
      newAnimatedValue = 0;
    } else {
      newAnimatedValue = 1;
    }
    Animated.timing(animatedValue, {
      toValue: newAnimatedValue,
      duration: 200,
      useNativeDriver: true,
    }).start();
  };

  const updateTitle = () => {
    switch (transactionType) {
      case TransactionType.INCOME:
        setTitle(t('Income'));
        break;
      case TransactionType.ALL:
        setTitle(t('All'));
        break;
      case TransactionType.EXPENSE:
        setTitle(t('Expense'));
        break;
      case TransactionType.PINNED:
        setTitle(t('pinned'));
        break;
    }
    // animatedTitle.setValue(0);
    // Animated.sequence([
    //   Animated.timing(animatedTitle, {
    //     toValue: 1,
    //     duration: 300,
    //     useNativeDriver: true,
    //   }),
    //   Animated.delay(300),
    //   Animated.timing(animatedTitle, {
    //     toValue: 2,
    //     duration: 300,
    //     useNativeDriver: true,
    //   }),
    // ]).start();
  };

  const showSearch = (enable: boolean) => {
    setEnableSearch(enable);
    Animated.timing(animatedSearch, {
      toValue: enable ? 0 : 1,
      duration: 300,
      useNativeDriver: false,
    }).start();
  };

  useEffect(() => {
    updateTransactions();
    animateAddButton();
    updateTitle();
    // animatedTitle()
  }, [transactionType]);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      updateTransactions(false, transactionType);
    });
    updateTitle();
    return () => {
      unsubscribe();
      searchDebounce.cancel();
    };
  }, []);

  // useEffect(() => {
  //   console.log(searchQuery);
  //   if (enableSearch) {
  //     handleTransactionSearch();
  //   }
  // }, [searchQuery]);

  return (
    <SafeAreaView style={commonStyles.screen}>
      <View style={commonStyles.container}>
        {header && (
          <AppHeader
            navigation={navigation}
            homeScreen={false}
            scrollY={scrollY}
            title={title}
          />
        )}
      </View>
      <ScrollViewWrapper scrollY={scrollY}>
        {header && (
          <Animated.View
            style={[
              {
                height: animatedSearch?.interpolate({
                  inputRange: [0, 1],
                  outputRange: [120, 0],
                  extrapolate: 'clamp',
                }),
                opacity: animatedSearch?.interpolate({
                  inputRange: [0, 1],
                  outputRange: [1, 0],
                  extrapolate: 'clamp',
                }),
              },
            ]}>
            <View style={[commonStyles.searchWrapper]}>
              <View style={formStyles.inputWrapper}>
                <TextInput
                  placeholder={t('searchTransaction')}
                  placeholderTextColor={colors.theme[THEME].textCardGray}
                  style={formStyles.input}
                  onChangeText={onQueryChange}
                  value={searchQuery}
                />
              </View>
            </View>
          </Animated.View>
        )}
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
                  name={'ellipse-horz'}
                  size={commonStyles.icon.width}
                  color={colors.theme[THEME].textBrandMedium}
                />
              </Pressable>
            )}
            {header && (
              <View style={recentList.txActionWrapper}>
                <Animated.View
                  style={[
                    {
                      // opacity: animateOpacity,
                      transform: [{ translateX: animateTranslationSearch }],
                    },
                  ]}>
                  {enableSearch ? (
                    <Pressable
                      onPress={() => {
                        showSearch(false);
                        setSearchQuery('');
                      }}
                      style={recentList.listHeaderIconWrapper}>
                      <IconMap
                        style={recentList.listHeaderIcon}
                        name="close"
                        size={32}
                        color={colors.theme[THEME].textBrandMedium}
                      />
                    </Pressable>
                  ) : (
                    <Pressable
                      onPress={() => {
                        showSearch(true);
                      }}
                      style={recentList.listHeaderIconWrapper}>
                      <IconMap
                        style={recentList.listHeaderIcon}
                        name="search"
                        size={32}
                        color={colors.theme[THEME].textBrandMedium}
                      />
                    </Pressable>
                  )}
                </Animated.View>
                <Animated.View
                  style={[
                    {
                      opacity: animateOpacity,
                      transform: [{ translateX: animateTranslation }],
                    },
                  ]}>
                  <Pressable
                    onPress={() => {
                      navigation.navigate('AddTransaction', {
                        type:
                          transactionType === TransactionType.INCOME
                            ? TransactionType.INCOME
                            : TransactionType.EXPENSE,
                      });
                    }}
                    style={recentList.listHeaderIconWrapper}>
                    <IconMap
                      style={recentList.listHeaderIcon}
                      name="plus-circle"
                      size={32}
                      color={colors.theme[THEME].textBrandMedium}
                    />
                  </Pressable>
                </Animated.View>
              </View>
            )}
          </View>
          {!loading && (
            <FlatList
              // maxToRenderPerBatch={10}
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
                <AddDoc style={commonStyles.illustration} />
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
                    navigation.navigate('AddTransaction', {
                      type:
                        transactionType === TransactionType.INCOME
                          ? TransactionType.INCOME
                          : TransactionType.EXPENSE,
                    });
                  }}
                  style={commonStyles.illustrationTitleBtn}>
                  <IconMap
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
          {transactionTypes.map((transactionItem: ITransactionTypes) => {
            return (
              <Pressable
                key={`list-type-${transactionItem.id}`}
                onPress={() => {
                  setTransactionType(transactionItem.type);
                }}
                style={commonStyles.bottomTabContainer}>
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
        </View>
      )}
    </SafeAreaView>
  );
};

export default TransactionList;
