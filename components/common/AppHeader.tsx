import React, { useEffect, useState } from 'react';
import {
  Animated,
  Dimensions,
  StatusBar,
  StyleSheet,
  View,
} from 'react-native';
import {
  colors,
  commonStyles,
  containerLeftMargin,
  utils,
} from '../styles/theme';
import Icon from 'react-native-vector-icons/dist/MaterialIcons';
import { THEME } from '../utils/Constants';
import { useRef } from 'react';
import t from './translations/Translation';

interface IAppHeader {
  navigation?: any;
  homeScreen?: boolean;
  backTo?: string;
  title?: string;
  scrollY?: Animated.Value;
}

const MIN_HEIGHT = 200;
const MAX_HEIGHT = 0;

const AppHeader = ({
  homeScreen = true,
  backTo = '',
  navigation,
  title = '',
  scrollY = new Animated.Value(0),
}: IAppHeader) => {
  const backArrow = useRef();
  const [width, setWidth] = useState(Dimensions.get('window').width);

  const animatedImgHeight = scrollY?.interpolate({
    inputRange: [0, MIN_HEIGHT - MAX_HEIGHT],
    outputRange: [90, 50],
    extrapolate: 'clamp',
  });
  // const windowWidth = Dimensions.get('window').width;
  // (containerLeftMargin - commonStyles.icon.width * 2)
  const titleLeftTranslate = scrollY?.interpolate({
    inputRange: [0, MIN_HEIGHT - MAX_HEIGHT],
    outputRange: [
      0,
      -width / 2 + (containerLeftMargin + commonStyles.icon.width * 2.5),
    ],
    extrapolate: 'clamp',
  });

  const fontSizingSubTitle = scrollY?.interpolate({
    inputRange: [0, MIN_HEIGHT - MAX_HEIGHT],
    outputRange: [utils.fontSize.xlarge, utils.fontSize.medium],
    extrapolate: 'clamp',
  });

  const fontSizing = scrollY?.interpolate({
    inputRange: [0, MIN_HEIGHT - MAX_HEIGHT],
    outputRange: [utils.fontSize.xxlarge, utils.fontSize.large],
    extrapolate: 'clamp',
  });

  const headerElevation = scrollY?.interpolate({
    inputRange: [0, MIN_HEIGHT - MAX_HEIGHT],
    outputRange: [10, 0],
    extrapolate: 'clamp',
  });

  useEffect(() => {
    const dimentionCHange = Dimensions.addEventListener('change', () => {
      setWidth(Dimensions.get('window').width);
    });
    return () => {
      dimentionCHange.remove();
    };
  }, []);
  return (
    <Animated.View
      style={[
        styles.headerContainer,
        {
          // elevation: headerElevation,
        },
      ]}>
      <StatusBar
        backgroundColor={colors.theme[THEME].brandLight}
        barStyle={'dark-content'}
      />
      {homeScreen ? (
        <View style={styles.headerDesc}>
          <Animated.Text
            style={[styles.headerDescTitle, { fontSize: fontSizing }]}>
            {t('title')}
          </Animated.Text>
          <Animated.Text style={styles.headerDescSubTitle}>
            {t('subTitle')}
          </Animated.Text>
        </View>
      ) : (
        <Icon
          style={styles.icon}
          ref={backArrow}
          color={colors.theme[THEME].textBrandMedium}
          onPress={() => {
            if (backTo === '') {
              navigation.goBack();
            } else if (backTo) {
              navigation.navigate(backTo);
            } else {
              navigation.navigate('Home');
            }
          }}
          size={commonStyles.icon.width}
          name="keyboard-backspace"
        />
      )}
      {title !== '' && (
        <Animated.Text
          style={[
            styles.appTitle,
            {
              transform: [{ translateX: titleLeftTranslate }],
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

const styles = StyleSheet.create({
  homeMenuIcon: {
    transform: [{ rotateZ: '90deg' }],
  },
  icon: {
    paddingVertical: 10,
    paddingRight: 10,
  },
  headerContainer: {
    zIndex: 1,
    position: 'relative',
    elevation: 10,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 10,
    shadowcolor: colors.theme[THEME].textBrandMedium,
    shadowOffset: {
      width: 20,
      height: 20,
    },
    img: {
      width: 50,
      height: 90,
      borderRadius: commonStyles.r10.borderRadius,
    },
  },
  appTitle: {
    fontSize: utils.fontSize.xlarge,
    fontFamily: utils.fontFamily.Bold,
    color: colors.theme[THEME].textDark,
  },
  headerDesc: {
    paddingVertical: 20,
  },
  headerDescTitle: {
    color: colors.theme[THEME].textDark,
    fontSize: utils.fontSize.xxlarge,
    fontFamily: utils.fontFamily.Bold,
  },
  headerDescSubTitle: {
    color: colors.theme[THEME].textCardGray,
    fontSize: utils.fontSize.xsmall,
    fontFamily: utils.fontFamily.Regular,
  },
});

export default AppHeader;
