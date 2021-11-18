import * as React from 'react';
import {
  Animated,
  FlatList,
  Pressable,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import AppHeader from '../common/AppHeader';
import {
  colors,
  commonStyles,
  formStyles,
  recentList,
  utils,
} from '../styles/theme';
import Icon from 'react-native-vector-icons/dist/MaterialIcons';
import {useEffect, useRef, useState} from 'react';
import {
  getCurrncyTypes,
  ICurrency,
  setCurrency,
} from '../database/common/CurrencyController';
import {useDispatch, useSelector} from 'react-redux';
import {
  SHOW_TOAST,
  UPDATE_CURRENCY,
} from '../../redux/constants/StoreConstants';
import {THEME} from '../utils/Constants';
import t from '../common/translations/Translation';
import ScrollViewWrapper from '../common/ScrollViewWrapper';
import IconMap from '../common/IconMap';
const CurrencyScreen = ({navigation}: any) => {
  // const isDarkMode = useColorScheme() === 'dark';
  const scrollY = useRef(new Animated.Value(0)).current;
  const dispatch = useDispatch();
  const [title, setTitle] = useState('');
  const [currencyList, setCurrencyList] = useState<ICurrency[]>([]);
  const [filteredList, setFilteredList] = useState<ICurrency[]>([]);
  const userCurrency: ICurrency = useSelector((state: any) => {
    return state.common.configuration.currency.value;
  });
  const flatList = useRef<FlatList>(null);

  const scrollToSeletedCategory = (list: ICurrency[]) => {
    setTimeout(() => {
      let scrollIndex = 0;
      list.forEach((currency: ICurrency, index: number) => {
        if (currency.currencyId === userCurrency.currencyId) {
          scrollIndex = index;
        }
      });
      if (scrollIndex !== 0) {
        flatList?.current?.scrollToIndex({
          index: scrollIndex,
          animated: true,
        });
      }
    }, 1000);
  };
  const getCurrecyList = async () => {
    const curList: ICurrency[] = await getCurrncyTypes();
    setCurrencyList(curList);
    setFilteredList(curList);
    // scrollToSeletedCategory(curList);
  };
  const _keyExtractor = (item: ICurrency, index: number) =>
    item.currencyId ? item.currencyId.toString() : `currency-${index}`;

  const updateCurrency = async (currency: ICurrency) => {
    const result = await setCurrency(currency);
    if (result) {
      dispatch({type: UPDATE_CURRENCY, payload: currency});
      dispatch({
        type: SHOW_TOAST,
        payload: [
          {
            title: t('currencySet', {name: currency.name}),
          },
        ],
      });
    }
  };

  const _renderItem = (item: ICurrency, index: number) => {
    return (
      <React.Fragment>
        {index !== 0 && (
          <View style={recentList.dividerWrapper}>
            <Text style={recentList.divider} />
          </View>
        )}
        <Pressable
          onPress={() => {
            updateCurrency(item);
          }}
          style={styles.listWrapper}>
          <View style={styles.iconWrapper}>
            {userCurrency.currencyId === item.currencyId ? (
              <IconMap
                color={colors.theme[THEME].textBrandMedium}
                iconName={'check-circle'}
                size={commonStyles.icon.width}
              />
            ) : (
              <IconMap
                color={colors.theme[THEME].textCardGray}
                iconName={'circle'}
                size={commonStyles.icon.width}
              />
            )}
          </View>
          <View style={styles.currencyDescWrapper}>
            <View style={styles.currencyDesc}>
              <Text style={styles.currencyName}>{item.name}</Text>
              <Text style={styles.currencyCode}>{item.code}</Text>
            </View>
            <Text style={styles.currencySymbol}>{item.symbol}</Text>
          </View>
        </Pressable>
      </React.Fragment>
    );
  };

  const updateFilteredList = async () => {
    const query = title.trim().toLocaleLowerCase();
    if (query !== '') {
      const filtered = currencyList.filter((item: ICurrency) => {
        return (
          item.name.toLocaleLowerCase().includes(query) ||
          item.code.toLocaleLowerCase().includes(query)
        );
      });
      setFilteredList(filtered);
    } else {
      setFilteredList(currencyList);
    }
  };

  useEffect(() => {
    getCurrecyList();
  }, []);

  useEffect(() => {
    updateFilteredList();
  }, [title]);

  return (
    <SafeAreaView style={commonStyles.screen}>
      <View style={commonStyles.container}>
        <AppHeader
          navigation={navigation}
          homeScreen={false}
          title="Currency"
          scrollY={scrollY}
        />
      </View>
      <View style={commonStyles.container}>
        <View style={styles.inputWrapper}>
          <TextInput
            placeholderTextColor={colors.theme[THEME].textCardGray}
            placeholder="Eg, Dollars"
            style={formStyles.input}
            onChangeText={setTitle}
            value={title}
          />
        </View>
        <FlatList
          ref={flatList}
          contentInsetAdjustmentBehavior="automatic"
          keyboardDismissMode="interactive"
          keyboardShouldPersistTaps="always"
          style={styles.currencyList}
          data={filteredList}
          renderItem={({item, index}) => _renderItem(item, index)}
          keyExtractor={_keyExtractor}
          onScroll={Animated.event(
            [{nativeEvent: {contentOffset: {y: scrollY}}}],
            {useNativeDriver: false},
          )}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  iconWrapper: {},
  currencyList: {
    backgroundColor: colors.theme[THEME].brandLight,
  },
  listWrapper: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  currencyDescWrapper: {
    flex: 1,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginLeft: 14,
  },
  currencyDesc: {},
  currencyName: {
    fontFamily: utils.fontFamily.Bold,
    color: colors.theme[THEME].textCardGray,
  },
  currencyCode: {
    fontFamily: utils.fontFamily.Bold,
    color: colors.theme[THEME].textDark,
  },
  currencySymbol: {
    fontFamily: utils.fontFamily.Black,
    color: colors.theme[THEME].textDark,
  },
  inputWrapper: {
    marginVertical: 30,
  },
});

export default CurrencyScreen;
