import * as React from 'react';
import {
  Animated,
  Pressable,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import AppHeader from '../common/AppHeader';
import { colors, commonStyles, recentList, utils } from '../styles/theme';
import { useSelector } from 'react-redux';
import t from '../common/translations/Translation';
import { THEME } from '../utils/Constants';
import ScrollViewWrapper from '../common/ScrollViewWrapper';
import { useRef } from 'react';
import IconMap from '../common/IconMap';

export const AccountsScreen = ({ navigation }: any) => {
  const scrollY = useRef(new Animated.Value(0)).current;
  // const isDarkMode = useColorScheme() === 'dark';

  // const userConfiguration: any = useSelector((state: any) => {
  //   return state.common.configuration;
  // });
  const currency: any = useSelector((state: any) => {
    return state.common.configuration.currency.value;
  });
  // console.log('--curr-----', curr);

  return (
    <SafeAreaView style={commonStyles.screen}>
      <View style={commonStyles.container}>
        <AppHeader
          navigation={navigation}
          homeScreen={false}
          title="Accounts"
          scrollY={scrollY}
        />
      </View>
      <ScrollViewWrapper scrollY={scrollY} style={styles.quickMenuContainer}>
        <View style={commonStyles.container}>
          <Pressable style={styles.settingWrapper}>
            <View style={styles.settingIconWrapper}>
              <IconMap
                name={'ul-li'}
                size={28}
                color={colors.theme[THEME].brandMedium}
              />
            </View>
            <View style={styles.settingDesc}>
              <Text style={styles.settingName}>Categories</Text>
              <IconMap
                name={'angle-right'}
                size={28}
                color={colors.theme[THEME].brandMediumDark}
              />
            </View>
          </Pressable>
          <View style={[recentList.dividerWrapper, styles.divider]}>
            <Text style={recentList.divider} />
          </View>
          <Pressable style={styles.settingWrapper}>
            <View style={styles.settingIconWrapper}>
              <IconMap
                name={'payments'}
                size={28}
                color={colors.theme[THEME].brandMedium}
              />
            </View>
            <View style={styles.settingDesc}>
              <Text style={styles.settingName}>Payments</Text>
              <IconMap
                name={'angle-right'}
                size={28}
                color={colors.theme[THEME].brandMediumDark}
              />
            </View>
          </Pressable>
          <View style={[recentList.dividerWrapper, styles.divider]}>
            <Text style={recentList.divider} />
          </View>
          <Pressable style={styles.settingWrapper}>
            <View style={styles.settingIconWrapper}>
              <IconMap
                name={'alarm'}
                size={28}
                color={colors.theme[THEME].brandMedium}
              />
            </View>
            <View style={styles.settingDesc}>
              <Text style={styles.settingName}>Remainders</Text>
              <IconMap
                name={'angle-right'}
                size={28}
                color={colors.theme[THEME].brandMediumDark}
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
    backgroundColor: colors.theme[THEME].brandLight,
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
