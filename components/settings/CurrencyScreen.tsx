import * as React from 'react';
import {
  Animated,
  FlatList,
  Pressable,
  SafeAreaView,
  Text,
  TextInput,
  View,
} from 'react-native';
import AppHeader from '../common/AppHeader';
import { useEffect, useRef, useState } from 'react';
import {
  getCurrncyTypes,
  ICurrency,
  setCurrency,
} from '../database/common/CurrencyController';
import { useDispatch, useSelector } from 'react-redux';
import {
  SHOW_TOAST,
  UPDATE_CURRENCY,
} from '../../redux/constants/StoreConstants';
import t from '../common/translations/Translation';
import IconMap from '../common/IconMap';
import { GetStyle, GetTheme } from '../styles/GetThemeHook';
import { currencyScreenStyle } from '../styles/commonStyles';
import { recentListStyles } from '../styles/recentList';
const CurrencyScreen = ({ navigation }: any) => {
  // const isDarkMode = useColorScheme() === 'dark';
  const scrollY = useRef(new Animated.Value(0)).current;
  const { colors, commonStyles, formStyles } = GetTheme();
  const styles = GetStyle(currencyScreenStyle);
  const recentList = GetStyle(recentListStyles);
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
      dispatch({ type: UPDATE_CURRENCY, payload: currency });
      dispatch({
        type: SHOW_TOAST,
        payload: [
          {
            title: t('currencySet', { name: currency.name }),
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
                color={colors.textBrandMedium}
                name={'check-circle'}
                size={commonStyles.icon.width}
              />
            ) : (
              <IconMap
                color={colors.textCardGray}
                name={'circle'}
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
          title={t('currency')}
          scrollY={scrollY}
        />
      </View>
      <View style={commonStyles.container}>
        <View style={styles.inputWrapper}>
          <TextInput
            placeholderTextColor={colors.textCardGray}
            placeholder={t('egDollars')}
            style={formStyles.input}
            onChangeText={setTitle}
            value={title}
          />
        </View>
        <FlatList
          ref={flatList}
          showsVerticalScrollIndicator={false}
          maxToRenderPerBatch={10}
          contentInsetAdjustmentBehavior="automatic"
          keyboardDismissMode="interactive"
          keyboardShouldPersistTaps="always"
          style={styles.currencyList}
          data={filteredList}
          renderItem={({ item, index }) => _renderItem(item, index)}
          keyExtractor={_keyExtractor}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { y: scrollY } } }],
            { useNativeDriver: false },
          )}
        />
      </View>
    </SafeAreaView>
  );
};

// const styles = 
export default CurrencyScreen;
