import * as React from 'react';
import { Animated, Pressable, SafeAreaView, Text, View } from 'react-native';
import AppHeader from '../common/AppHeader';
import t from '../common/translations/Translation';
import ScrollViewWrapper from '../common/ScrollViewWrapper';
import { useRef } from 'react';
import IconMap from '../common/IconMap';
import { accountsScreenStyle } from '../styles/commonStyles';
import { GetTheme, GetStyle } from '../styles/GetThemeHook';
import { recentListStyles } from '../styles/recentList';

interface IAccountsScreen {
  navigation: any;
}

export const AccountsScreen = ({ navigation }: IAccountsScreen) => {
  const scrollY = useRef(new Animated.Value(0)).current;

  const { commonStyles, colors } = GetTheme();
  const recentList = GetStyle(recentListStyles);
  const styles = GetStyle(accountsScreenStyle);

  return (
    <SafeAreaView style={commonStyles.screen}>
      <View style={commonStyles.container}>
        <AppHeader
          navigation={navigation}
          homeScreen={false}
          title={t('accounts')}
          scrollY={scrollY}
          backBtn={false}
        />
      </View>
      <ScrollViewWrapper scrollY={scrollY} style={styles.quickMenuContainer}>
        <View style={commonStyles.container}>
          <Pressable
            style={styles.settingWrapper}
            onPress={() => {
              navigation.navigate('CategoriesScreen', {});
            }}>
            <View style={styles.settingIconWrapper}>
              <IconMap
                name={'ul-li'}
                size={28}
                color={colors.textBrandMedium}
              />
            </View>
            <View style={styles.settingDesc}>
              <Text style={styles.settingName}>{t('categories')}</Text>
              <IconMap
                name={'angle-right'}
                size={28}
                color={colors.textBrandLightMedium}
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
                color={colors.textBrandMedium}
              />
            </View>
            <View style={styles.settingDesc}>
              <Text style={styles.settingName}>{t('payments')}</Text>
              <IconMap
                name={'angle-right'}
                size={28}
                color={colors.textBrandLightMedium}
              />
            </View>
          </Pressable>
          <View style={[recentList.dividerWrapper, styles.divider]}>
            <Text style={recentList.divider} />
          </View>
          <Pressable
            style={styles.settingWrapper}
            onPress={() => {
              navigation.navigate('Reminders');
            }}>
            <View style={styles.settingIconWrapper}>
              <IconMap
                name={'alarm'}
                size={28}
                color={colors.textBrandMedium}
              />
            </View>
            <View style={styles.settingDesc}>
              <Text style={styles.settingName}>{t('reminders')}</Text>
              <IconMap
                name={'angle-right'}
                size={28}
                color={colors.textBrandLightMedium}
              />
            </View>
          </Pressable>
        </View>
      </ScrollViewWrapper>
    </SafeAreaView>
  );
};
