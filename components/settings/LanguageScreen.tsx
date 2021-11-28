import * as React from 'react';
import { SafeAreaView, StyleSheet, View } from 'react-native';
import AppHeader from '../common/AppHeader';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import t from '../common/translations/Translation';
import { GetTheme } from '../styles/GetThemeHook';

interface ILanguageScreen {
  navigation: any;
}

const LanguageScreen = ({ navigation }: ILanguageScreen) => {
  // const isDarkMode = useColorScheme() === 'dark';
  const { commonStyles } = GetTheme();
  // const dispatch = useDispatch();
  const [language, setLanguage] = useState();

  useEffect(() => {}, []);

  return (
    <SafeAreaView style={commonStyles.screen}>
      <View style={commonStyles.container}>
        <AppHeader
          navigation={navigation}
          homeScreen={false}
          title={t('language')}
        />
        <View />
      </View>
      {/* </ScrollView> */}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  iconWrapper: {},
});

export default LanguageScreen;
