import * as React from 'react';
import {
  Image,
  Platform,
  Pressable,
  SafeAreaView,
  Text,
  View,
} from 'react-native';
import AppHeader from '../common/AppHeader';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import t from '../common/translations/Translation';
import { SET_THEME, SHOW_TOAST } from '../../redux/constants/StoreConstants';
import { setThemeConfig } from '../database/common/CommonController';
import { themeScreenStyles } from '../styles/themeScreenStyles';
import { GetTheme } from '../styles/GetThemeHook';

const ThemeScreen = ({ navigation }: any) => {
  const themeKey = useSelector(state => state.common.theme);
  const dispatch = useDispatch();

  //Always at the end
  const { commonStyles, styles } = GetTheme(themeScreenStyles);

  const setTheme = async (theme: string) => {
    const result = await setThemeConfig(theme);
    if (result) {
      dispatch({
        type: SHOW_TOAST,
        payload: [
          {
            title: t('themeSet', { name: theme }),
          },
        ],
      });
      dispatch({ type: SET_THEME, payload: theme });
    }
  };

  useEffect(() => {}, []);

  return (
    <SafeAreaView style={commonStyles.screen}>
      <View style={commonStyles.container}>
        <AppHeader
          navigation={navigation}
          homeScreen={false}
          title={t('theme')}
        />
        <View />
      </View>
      <View style={[styles.themeWrapper, commonStyles.container]}>
        <Pressable
          style={styles.themeItem}
          onPress={() => {
            setTheme('lightPurple');
          }}>
          {/* <View style={styles.themeType} /> */}
          <Image
            resizeMethod="auto"
            resizeMode="cover"
            style={[
              styles.themeType,
              themeKey === 'lightPurple' ? styles.themeTypeActive : {},
            ]}
            source={require('../../assets/img/light.jpg')}
          />
          <Text style={styles.themeName}>{t('light')}</Text>
        </Pressable>
        <Pressable
          style={styles.themeItem}
          onPress={() => {
            setTheme('darkYellow');
          }}>
          {/* <View style={styles.themeType} /> */}
          <Image
            resizeMethod="auto"
            resizeMode="cover"
            style={[
              styles.themeType,
              themeKey === 'darkYellow' ? styles.themeTypeActive : {},
            ]}
            source={require('../../assets/img/dark.jpg')}
          />
          <Text style={styles.themeName}>{t('dark')}</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

// const styles =

export default ThemeScreen;
