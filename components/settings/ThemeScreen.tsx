import * as React from 'react';
import {
  FlatList,
  Pressable,
  SafeAreaView,
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
import {UPDATE_CURRENCY} from '../../redux/constants/StoreConstants';
import {ShowSnackBar} from '../common/Util';
import { THEME } from '../utils/Constants';
const ThemeScreen = ({navigation}: any) => {
  // const isDarkMode = useColorScheme() === 'dark';
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

  const updateCurrency = async (currency: ICurrency) => {
    const result = await setCurrency(currency);
    if (result) {
      dispatch({type: UPDATE_CURRENCY, payload: currency});
      ShowSnackBar(`Currency is set to ${currency.code}: ${currency.symbol}`);
    }
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
    <SafeAreaView>
      <View style={commonStyles.container}>
        <AppHeader navigation={navigation} homeScreen={false} title="Theme" />
        <View>

        </View>
      </View>
      {/* </ScrollView> */}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  iconWrapper: {},
  themeList: {},
  listWrapper: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  themeDescWrapper: {
    flex: 1,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginLeft: 14,
  },
  themeDesc: {},
  themeName: {
    fontFamily: utils.fontFamily.Bold,
    color: colors.theme[THEME].textCardGray,
  },
  themeCode: {
    fontFamily: utils.fontFamily.Bold,
    color: colors.theme[THEME].textDark,
  },
  themeSymbol: {
    fontFamily: utils.fontFamily.Black,
    color: colors.theme[THEME].textDark,
  },
  inputWrapper: {
    marginBottom: 30,
  },
});

export default ThemeScreen;
