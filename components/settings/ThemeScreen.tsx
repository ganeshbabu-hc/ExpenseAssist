import * as React from 'react';
import {
  Image,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import AppHeader from '../common/AppHeader';
import { colors, commonStyles, utils } from '../styles/theme';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import t from '../common/translations/Translation';
import { THEME } from '../utils/Constants';
const ThemeScreen = ({ navigation }: any) => {
  // const isDarkMode = useColorScheme() === 'dark';
  const dispatch = useDispatch();
  const [title, setTitle] = useState('');

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
        <Pressable style={styles.themeItem} onPress={() => {}}>
          {/* <View style={styles.themeType} /> */}
          <Image
            resizeMethod="auto"
            resizeMode="cover"
            style={[styles.themeType, styles.themeTypeActive]}
            source={require('../../assets/img/light.jpg')}
          />
          <Text style={styles.themeName}>{t('light')}</Text>
        </Pressable>
        <Pressable style={styles.themeItem} onPress={() => {}}>
          {/* <View style={styles.themeType} /> */}
          <Image
            resizeMethod="auto"
            resizeMode="cover"
            style={[styles.themeType]}
            source={require('../../assets/img/dark.jpg')}
          />
          <Text style={styles.themeName}>{t('dark')}</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  themeWrapper: {
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'space-evenly',
    flex: 1,
    flexDirection: 'row',
    marginVertical: 20,
  },
  themeItem: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    flex: 1,
    // flexDirection: 'row',
  },
  themeName: {
    color: colors.theme[THEME].textDark,
    fontSize: utils.fontSize.large,
    fontFamily: utils.fontFamily.Bold,
    paddingVertical: 20,
  },
  themeTypeActive: {
    borderColor: colors.theme[THEME].brandMedium,
    borderWidth: 3,
  },
  themeType: {
    width: '90%',
    height: 200,
    borderWidth: 1,
    borderColor: colors.theme[THEME].textCardGray,
    borderRadius: utils.inputRadius,
    backgroundColor: colors.theme[THEME].brandMedium,
  },
});

export default ThemeScreen;
