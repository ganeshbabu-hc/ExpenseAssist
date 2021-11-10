import * as React from 'react';
import {
  Pressable,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import AppHeader from '../common/AppHeader';
import {colors, commonStyles, recentList, utils} from '../styles/theme';
import Icon from 'react-native-vector-icons/dist/MaterialIcons';
import {useSelector} from 'react-redux';

export const SettingsScreen = ({navigation}: any) => {
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
      <StatusBar
        backgroundColor={colors.brand.brandLight}
        barStyle={'dark-content'}
      />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        keyboardDismissMode="interactive"
        keyboardShouldPersistTaps="always"
        style={styles.quickMenuContainer}>
        <View style={commonStyles.container}>
          <AppHeader
            navigation={navigation}
            homeScreen={false}
            title="Settings"
          />
          <Pressable style={styles.settingWrapper}>
            <View style={styles.settingIconWrapper}>
              <Icon
                name="color-lens"
                size={28}
                color={colors.brand.brandMedium}
              />
            </View>
            <View style={styles.settingDesc}>
              <Text style={styles.settingName}>Theme</Text>
              <View style={styles.settingValueWrapper}>
                <Text style={styles.settingValue}>Light</Text>
                <Icon
                  name="chevron-right"
                  size={28}
                  color={colors.brand.brandMediumDark}
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
              <Icon
                name="attach-money"
                size={28}
                color={colors.brand.brandMedium}
              />
            </View>
            <View style={styles.settingDesc}>
              <Text style={styles.settingName}>Currency</Text>
              <View style={styles.settingValueWrapper}>
                <Text style={styles.settingValue}>{currency.code}</Text>
                <Icon
                  name="chevron-right"
                  size={28}
                  color={colors.brand.brandMediumDark}
                />
              </View>
            </View>
          </Pressable>
          <View style={[recentList.dividerWrapper, styles.divider]}>
            <Text style={recentList.divider} />
          </View>
          <Pressable style={styles.settingWrapper}>
            <View style={styles.settingIconWrapper}>
              <Icon
                name="filter-list"
                size={28}
                color={colors.brand.brandMedium}
              />
            </View>
            <View style={styles.settingDesc}>
              <Text style={styles.settingName}>Categories</Text>
              <Icon
                name="chevron-right"
                size={28}
                color={colors.brand.brandMediumDark}
              />
              {/* <Text style={styles.settingValue}>INR</Text> */}
            </View>
          </Pressable>
          <View style={[recentList.dividerWrapper, styles.divider]}>
            <Text style={recentList.divider} />
          </View>
          <Pressable style={styles.settingWrapper}>
            <View style={styles.settingIconWrapper}>
              <Icon name="payment" size={28} color={colors.brand.brandMedium} />
            </View>
            <View style={styles.settingDesc}>
              <Text style={styles.settingName}>Payments</Text>
              <Icon
                name="chevron-right"
                size={28}
                color={colors.brand.brandMediumDark}
              />
              {/* <Text style={styles.settingValue}>INR</Text> */}
            </View>
          </Pressable>
          <View style={[recentList.dividerWrapper, styles.divider]}>
            <Text style={recentList.divider} />
          </View>
          <Pressable style={styles.settingWrapper}>
            <View style={styles.settingIconWrapper}>
              <Icon name="alarm" size={28} color={colors.brand.brandMedium} />
            </View>
            <View style={styles.settingDesc}>
              <Text style={styles.settingName}>Remainders</Text>
              <Icon
                name="chevron-right"
                size={28}
                color={colors.brand.brandMediumDark}
              />
              {/* <Text style={styles.settingValue}>INR</Text> */}
            </View>
          </Pressable>
          <View style={[recentList.dividerWrapper, styles.divider]}>
            <Text style={recentList.divider} />
          </View>
          <Pressable style={styles.settingWrapper}>
            <View style={styles.settingIconWrapper}>
              <Icon
                name="language"
                size={28}
                color={colors.brand.brandMedium}
              />
            </View>
            <View style={styles.settingDesc}>
              <Text style={styles.settingName}>Language</Text>
              <Icon
                name="chevron-right"
                size={28}
                color={colors.brand.brandMediumDark}
              />
              {/* <Text style={styles.settingValue}>INR</Text> */}
            </View>
          </Pressable>
          <View style={[recentList.dividerWrapper, styles.divider]}>
            <Text style={recentList.divider} />
          </View>
          <Pressable style={styles.settingWrapper}>
            <View style={styles.settingIconWrapper}>
              <Icon
                name="help-outline"
                size={28}
                color={colors.brand.brandMedium}
              />
            </View>
            <View style={styles.settingDesc}>
              <Text style={styles.settingName}>Help</Text>
              <Icon
                name="chevron-right"
                size={28}
                color={colors.brand.brandMediumDark}
              />
              {/* <Text style={styles.settingValue}>INR</Text> */}
            </View>
          </Pressable>

        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  quickMenuContainer: {
    // backgroundColor: colors.brand.brandLight,
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
    color: colors.black,
    fontSize: utils.fontSize.medium,
    fontFamily: utils.fontFamily.Bold,
  },
  settingValueWrapper: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  settingValue: {
    color: colors.black,
    fontSize: utils.fontSize.medium,
    fontFamily: utils.fontFamily.Bold,
  },
});
