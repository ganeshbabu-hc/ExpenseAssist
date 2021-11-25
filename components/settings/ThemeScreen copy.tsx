import * as React from 'react';
import { SafeAreaView, StyleSheet, View } from 'react-native';
import AppHeader from '../common/AppHeader';
import { commonStyles } from '../styles/theme';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import t from '../common/translations/Translation';

interface ThemeScreen {
  navigation: any;
}

const ThemeScreen = ({ navigation }: ThemeScreen) => {
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
      {/* </ScrollView> */}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  iconWrapper: {},
});

export default ThemeScreen;
