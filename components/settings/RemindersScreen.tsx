import * as React from 'react';
import { Pressable, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import AppHeader from '../common/AppHeader';
import { colors, commonStyles, formStyles, utils } from '../styles/theme';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import t from '../common/translations/Translation';
import WeeklyView from '../common/WeeklyView';
import { THEME } from '../utils/Constants';

const RemindersScreen = ({ navigation }: any) => {
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
          title={t('reminders')}
        />
        <View />
      </View>
      <View style={commonStyles.container}>
        <WeeklyView onChange={() => {}} />
        <View style={formStyles.inputWrapper}>
          <Text style={formStyles.inputLabel}>{t('repeat')}</Text>
          <View style={styles.repeatWrapper}>
            <Pressable style={[styles.repeatType, styles.repeatTypeActive]}>
              <Text style={[styles.repeatLabel, styles.repeatLabelActive]}>
                Daily
              </Text>
            </Pressable>
            <Pressable style={styles.repeatType}>
              <Text style={styles.repeatLabel}>Weekly</Text>
            </Pressable>
            <Pressable style={styles.repeatType}>
              <Text style={styles.repeatLabel}>Monthly</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  repeatWrapper: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  repeatType: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: utils.inputRadius,
    borderColor: colors.theme[THEME].textBrandMedium,
    borderWidth: 1,
  },
  repeatTypeActive: {
    backgroundColor: colors.theme[THEME].brandMedium,
    color: colors.theme[THEME].textLight,
  },
  repeatLabelActive: {
    color: colors.theme[THEME].textLight,
    fontSize: utils.fontSize.small,
    fontFamily: utils.fontFamily.Bold,
  },
  repeatLabel: {
    color: colors.theme[THEME].textBrandMedium,
    fontSize: utils.fontSize.small,
    fontFamily: utils.fontFamily.Bold,
  },
});

export default RemindersScreen;
