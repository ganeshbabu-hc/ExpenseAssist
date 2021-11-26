import * as React from 'react';
import { Animated, Dimensions, SafeAreaView, View } from 'react-native';
import AppHeader from '../common/AppHeader';
import { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import t from '../common/translations/Translation';
import ScrollViewWrapper from '../common/ScrollViewWrapper';
import WebView from 'react-native-webview';
import { GetStyle, GetTheme } from '../styles/GetThemeHook';
import { helpScreenStyle } from '../styles/commonStyles';

interface IHelpScreen {
  navigation: any;
}

const HelpScreen = ({ navigation }: IHelpScreen) => {
  // const isDarkMode = useColorScheme() === 'dark';
  const themeKey = useSelector(state => state.common.theme);
  const scrollY = useRef(new Animated.Value(0)).current;
  const { commonStyles } = GetTheme();
  const styles = GetStyle(helpScreenStyle);

  const deviceHeight = Dimensions.get('window').height - 125;
  const deviceWidth = Dimensions.get('window').width;

  useEffect(() => {}, []);

  return (
    <SafeAreaView style={commonStyles.screen}>
      <View style={commonStyles.container}>
        <AppHeader
          navigation={navigation}
          homeScreen={false}
          title={t('help')}
        />
        <View />
      </View>
      <ScrollViewWrapper scrollY={scrollY}>
        <View style={styles.helpWrapper}>
          <WebView
            scrollEnabled={false}
            cacheEnabled={false}
            style={[
              styles.webView,
              { width: deviceWidth, height: deviceHeight },
            ]}
            source={{
              uri:
                'https://ganeshbabu-hc.github.io/expense-assist-help/?' +
                themeKey,
              method: 'get',
            }}
          />
        </View>
      </ScrollViewWrapper>
    </SafeAreaView>
  );
};

export default HelpScreen;
