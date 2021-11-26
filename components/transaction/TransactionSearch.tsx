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
import { getTransactions } from './TransactionController';
import AppHeader from '../common/AppHeader';
import { SafeAreaView } from 'react-native-safe-area-context';
import ScrollViewWrapper from '../common/ScrollViewWrapper';
import { DEBOUNCE_RATE } from '../utils/Constants';
import t from '../common/translations/Translation';
import { ITransaction, TransactionType } from './TransactionTypes';
import TransactionItem from './TransactionItem';
import debounce from 'lodash.debounce';
import Search from '../illustrations/Search';
import { GetTheme } from '../styles/GetThemeHook';
import { recentListStyles } from '../styles/recentList';

interface ITransactionSearch {
  limit?: number;
  navigation?: any;
  type?: TransactionType;
  route?: any;
  scrollY?: Animated.Value;
}

interface ITransactionTypes {
  id: number;
  label: string;
  type: TransactionType;
}

// const usePrevious = (value: TransactionType) => {
//   const ref = useRef();
//   // Store current value in ref
//   useEffect(() => {
//     ref.current = value;
//   }, [value]); // Only re-run if value changes
//   // Return previous value (happens before update in useEffect above)
//   return ref.current;
// };

const TransactionSearch = ({
  limit = 10,
  navigation,
  type = TransactionType.ALL,
  route,
  scrollY = new Animated.Value(0),
}: ITransactionSearch) => {
  type = route?.params?.type || type;
  const { colors, commonStyles, formStyles, styles } =
    GetTheme(recentListStyles);
  const [loading, setLoading] = useState(false);
  const [transactionType] = useState<TransactionType>(type);
  const [transactionList, setTransactionList] = useState<ITransaction[]>([]);
  const [enableSearch] = useState(false);
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
    updateTransactions(true, TransactionType.ALL, query);
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
    if (!query && query?.trim() === '') {
      setTransactionList([]);
      setLoading(false);
      return;
    }
    const resultList = await getTransactions(
      limit,
      overrideType ?? transactionType,
      query,
    );
    console.log(resultList);
    setTransactionList(resultList);
    setLoading(false);
  };

  useEffect(() => {
    return () => {
      searchDebounce.cancel();
    };
  }, []);

  return (
    <SafeAreaView style={commonStyles.screen}>
      <View style={commonStyles.container}>
        <AppHeader
          navigation={navigation}
          homeScreen={false}
          scrollY={scrollY}
          title={'Search'}
        />
      </View>
      <ScrollViewWrapper scrollY={scrollY}>
        <View>
          <View style={[commonStyles.searchWrapper]}>
            <View style={formStyles.inputWrapper}>
              <TextInput
                placeholder={t('searchTransaction')}
                placeholderTextColor={colors.textCardGray}
                style={formStyles.input}
                onChangeText={onQueryChange}
                value={searchQuery}
              />
            </View>
          </View>
        </View>
        <View style={[commonStyles.container, styles.listWrapper]}>
          {!loading && (
            <FlatList
              // maxToRenderPerBatch={10}
              scrollEnabled
              showsVerticalScrollIndicator={false}
              contentContainerStyle={commonStyles.contentContainerStyle}
              data={transactionList}
              renderItem={renderItem}
              onEndReachedThreshold={1}
            />
          )}
          {transactionList.length < 1 && !loading && (
            <View style={commonStyles.illustrationWrapper}>
              <Search style={commonStyles.illustration} />
            </View>
          )}
        </View>
      </ScrollViewWrapper>
    </SafeAreaView>
  );
};

export default TransactionSearch;
