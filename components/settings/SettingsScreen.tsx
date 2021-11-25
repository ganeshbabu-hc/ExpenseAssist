import * as React from 'react';
import {
  Animated,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import AppHeader from '../common/AppHeader';
import { colors, commonStyles, recentList, utils } from '../styles/theme';
import { useSelector } from 'react-redux';
import { THEME } from '../utils/Constants';
import ScrollViewWrapper from '../common/ScrollViewWrapper';
import { useRef } from 'react';
import IconMap from '../common/IconMap';
import t from '../common/translations/Translation';

export const SettingsScreen = ({ navigation }: any) => {
  const scrollY = useRef(new Animated.Value(0)).current;
  // const isDarkMode = useColorScheme() === 'dark';

  // const userConfiguration: any = useSelector((state: any) => {
  //   return state.common.configuration;
  // });
  const currency: any = useSelector((state: any) => {
    return state.common.configuration.currency.value;
  });

  return (
    <SafeAreaView style={commonStyles.screen}>
      <View style={commonStyles.container}>
        <AppHeader
          navigation={navigation}
          homeScreen={false}
          title={t('settings')}
          scrollY={scrollY}
          backBtn={false}
        />
      </View>
      <ScrollViewWrapper scrollY={scrollY} style={styles.quickMenuContainer}>
        <View style={commonStyles.container}>
          <Pressable
            style={styles.settingWrapper}
            onPress={() => {
              navigation.navigate('ThemeScreen');
            }}>
            <View style={styles.settingIconWrapper}>
              <IconMap
                name={'swatch-book'}
                size={28}
                color={colors.theme[THEME].textBrandMedium}
              />
            </View>
            <View style={styles.settingDesc}>
              <Text style={styles.settingName}>{t('theme')}</Text>
              <View style={styles.settingValueWrapper}>
                <Text style={styles.settingValue}>Light</Text>
                <IconMap
                  name={'angle-right'}
                  size={28}
                  color={colors.theme[THEME].textBrandLightMedium}
                />
              </View>
            </View>
          </Pressable>
          <View style={[recentList.dividerWrapper, styles.divider]}>
            <Text style={recentList.divider} />
          </View>
          <Pressable
            style={styles.settingWrapper}
            onPress={() => {
              navigation.navigate('CurrencyScreen');
            }}>
            <View style={styles.settingIconWrapper}>
              <IconMap
                name={'usd-circle'}
                size={28}
                color={colors.theme[THEME].textBrandMedium}
              />
            </View>
            <View style={styles.settingDesc}>
              <Text style={styles.settingName}>{t('currency')}</Text>
              <View style={styles.settingValueWrapper}>
                <Text style={styles.settingValue}>{currency.code}</Text>
                <IconMap
                  name={'angle-right'}
                  size={28}
                  color={colors.theme[THEME].textBrandLightMedium}
                />
              </View>
            </View>
          </Pressable>
          <View style={[recentList.dividerWrapper, styles.divider]}>
            <Text style={recentList.divider} />
          </View>
          <Pressable style={styles.settingWrapper}>
            <View style={styles.settingIconWrapper}>
              <IconMap
                name={'language'}
                size={28}
                color={colors.theme[THEME].textBrandMedium}
              />
            </View>
            <View style={styles.settingDesc}>
              <Text style={styles.settingName}>{t('language')}</Text>
              <IconMap
                name={'angle-right'}
                size={28}
                color={colors.theme[THEME].textBrandLightMedium}
              />
            </View>
          </Pressable>
          <View style={[recentList.dividerWrapper, styles.divider]}>
            <Text style={recentList.divider} />
          </View>
          <Pressable style={styles.settingWrapper}>
            <View style={styles.settingIconWrapper}>
              <IconMap
                name={'image'}
                size={28}
                color={colors.theme[THEME].textBrandMedium}
              />
            </View>
            <View style={styles.settingDesc}>
              <Text style={styles.settingName}>{t('uploads')}</Text>
              <IconMap
                name={'angle-right'}
                size={28}
                color={colors.theme[THEME].textBrandLightMedium}
              />
            </View>
          </Pressable>
          <View style={[recentList.dividerWrapper, styles.divider]}>
            <Text style={recentList.divider} />
          </View>
          <Pressable style={styles.settingWrapper}>
            <View style={styles.settingIconWrapper}>
              <IconMap
                name={'data-sharing'}
                size={28}
                color={colors.theme[THEME].textBrandMedium}
              />
            </View>
            <View style={styles.settingDesc}>
              <Text style={styles.settingName}>{t('backup')}</Text>
              <IconMap
                name={'angle-right'}
                size={28}
                color={colors.theme[THEME].textBrandLightMedium}
              />
            </View>
          </Pressable>
          <View style={[recentList.dividerWrapper, styles.divider]}>
            <Text style={recentList.divider} />
          </View>
          <Pressable style={styles.settingWrapper}>
            <View style={styles.settingIconWrapper}>
              <IconMap
                name={'help-circle'}
                size={28}
                color={colors.theme[THEME].textBrandMedium}
              />
            </View>
            <View style={styles.settingDesc}>
              <Text style={styles.settingName}>{t('help')}</Text>
              <IconMap
                name={'angle-right'}
                size={28}
                color={colors.theme[THEME].textBrandLightMedium}
              />
            </View>
          </Pressable>
        </View>
      </ScrollViewWrapper>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  quickMenuContainer: {
    backgroundColor: colors.theme[THEME].brandBg,
    marginTop: 10,
  },
  divider: {
    marginVertical: 0,
  },
  settingWrapper: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginVertical: 20,
  },
  settingIconWrapper: {
    marginRight: 10,
  },
  settingDesc: {
    display: 'flex',
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  settingName: {
    color: colors.theme[THEME].textDark,
    fontSize: utils.fontSize.medium,
    fontFamily: utils.fontFamily.Bold,
  },
  settingValueWrapper: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  settingValue: {
    color: colors.theme[THEME].textDark,
    fontSize: utils.fontSize.medium,
    fontFamily: utils.fontFamily.Bold,
  },
});
