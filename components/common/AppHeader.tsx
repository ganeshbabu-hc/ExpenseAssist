import React from 'react';
import { Animated, Pressable, StatusBar, View } from 'react-native';
import t from './translations/Translation';
import IconMap from './IconMap';
import { GetTheme } from '../styles/GetThemeHook';
import { headerStyles } from '../styles/appHeader';

interface IAppHeader {
  navigation?: any;
  homeScreen?: boolean;
  backTo?: string;
  title?: string;
  scrollY?: Animated.Value;
  backBtn?: boolean;
}

const MIN_HEIGHT = 200;
const MAX_HEIGHT = 0;

const AppHeader = ({
  homeScreen = true,
  backTo = '',
  navigation,
  title = '',
  scrollY = new Animated.Value(0),
  backBtn = true,
}: IAppHeader) => {
  const { styles, colors, utils } = GetTheme(headerStyles);
  const animatedImgHeight = scrollY?.interpolate({
    inputRange: [0, MIN_HEIGHT - MAX_HEIGHT],
    outputRange: [90, 50],
    extrapolate: 'clamp',
  });

  const fontSizingSubTitle = scrollY?.interpolate({
    inputRange: [0, MIN_HEIGHT - MAX_HEIGHT],
    outputRange: [utils.fontSize.xlarge, utils.fontSize.medium],
    extrapolate: 'clamp',
  });

  const fontSizing = scrollY?.interpolate({
    inputRange: [0, MIN_HEIGHT - MAX_HEIGHT],
    outputRange: [utils.fontSize.xxxlarge, utils.fontSize.xlarge],
    extrapolate: 'clamp',
  });

  const headerElevation = scrollY?.interpolate({
    inputRange: [0, MIN_HEIGHT - MAX_HEIGHT],
    outputRange: [0, 10],
    extrapolate: 'clamp',
  });

  return (
    <Animated.View
      style={[
        styles.headerContainer,
        {
          elevation: headerElevation,
        },
      ]}>
      <StatusBar backgroundColor={colors.brandBg} barStyle={colors.content} />
      {homeScreen && (
        <View style={styles.headerDesc}>
          <Animated.Text
            style={[styles.headerDescTitle, { fontSize: fontSizing }]}>
            {t('title')}
          </Animated.Text>
          <Animated.Text style={styles.headerDescSubTitle}>
            {t('subTitle')}
          </Animated.Text>
        </View>
      )}
      {!homeScreen && backBtn && (
        <Pressable
          onPress={() => {
            if (backTo === '') {
              navigation.goBack();
            } else if (backTo) {
              navigation.navigate(backTo);
            } else {
              navigation.navigate('Home');
            }
          }}>
          <IconMap
            style={styles.icon}
            color={colors.textBrandMedium}
            size={32}
            name="arrow-left"
          />
        </Pressable>
      )}
      {title !== '' && (
        <Animated.Text
          style={[
            styles.appTitle,
            {
              // transform: [{ translateX: titleLeftTranslate }],
              fontSize: fontSizingSubTitle,
            },
          ]}>
          {title}
        </Animated.Text>
      )}
      <Animated.Image
        style={[
          styles.headerContainer.img,
          {
            height: animatedImgHeight,
          },
        ]}
        source={require('../../assets/img/dp.jpeg')}
      />
    </Animated.View>
  );
};

export default AppHeader;
