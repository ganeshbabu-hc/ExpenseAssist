import React, {useRef} from 'react';
import {Animated, Image, StatusBar, StyleSheet, Text, View} from 'react-native';
import {colors, commonStyles, utils} from '../styles/theme';
import Icon from 'react-native-vector-icons/dist/MaterialIcons';
import {useSelector} from 'react-redux';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import { THEME } from '../utils/Constants';

interface IAppHeader {
  navigation?: any;
  homeScreen?: boolean;
  backTo?: string;
  title?: string;
  // headerStyle?: any;
  // imageStyle?: any;
  // titleStyle?: any;
  // scrollY: Animated.Value;
}

const HEADER_HEIGHT = 150;

const AppHeader = ({
  homeScreen = true,
  backTo = '',
  navigation,
  title = '',
}: // headerStyle,
// imageStyle,
// titleStyle,
// scrollY,
IAppHeader) => {
  // const maxHeight = 100;
  // const minHeight = 50;
  // const scrollX = useSelector((state: any) => {
  //   animatedHeaderValue.setValue(state.common.scrollX);
  //   return state.common.scrollX;
  // });
  // const scrollY = useRef(new Animated.Value(scrollX)).current;

  // const animatedHeaderHeight = scrollY.interpolate({
  //   inputRange: [0, maxHeight - minHeight],
  //   outputRange: [maxHeight, minHeight],
  //   extrapolate: 'clamp',
  // });

  // let animatedHeaderValue = new Animated.Value(0);
  // const maxHeight = 150;
  // const minHeight = 50;
  // const scrollX = useSelector((state: any) => {
  //   animatedHeaderValue.setValue(state.common.scrollX);
  //   return state.common.scrollX;
  // });
  // // const scrollY = useRef(new Animated.Value(scrollX)).current;

  // const animatedHeaderHeight = animatedHeaderValue.interpolate({
  //   inputRange: [0, maxHeight - minHeight],
  //   outputRange: [maxHeight, minHeight],
  //   extrapolate: 'clamp',
  // });
  // const animatedImgHeight = animatedHeaderValue.interpolate({
  //   inputRange: [0, maxHeight - minHeight],
  //   outputRange: [90, 50],
  //   extrapolate: 'clamp',
  // });

  // const offset = useRef(new Animated.Value(0)).current;
  // const insets = useSafeAreaInsets();

  // console.log(insets);

  // const headerHeight = offset.interpolate({
  //   inputRange: [0, HEADER_HEIGHT + insets.top],
  //   outputRange: [HEADER_HEIGHT + insets.top, insets.top + 44],
  //   extrapolate: 'clamp',
  // });

  // animatedHeaderValue.setValue(scrollX);

  return (
    <Animated.View style={[styles.headerContainer]}>
      <StatusBar
        backgroundColor={colors.theme[THEME].brandLight}
        barStyle={'dark-content'}
      />
      {homeScreen ? (
        <View style={styles.headerDesc}>
          <Text style={styles.headerDescTitle}>MoneyAssist</Text>
          <Text style={styles.headerDescSubTitle}>
            Your expense manging partner
          </Text>
        </View>
      ) : (
        <Icon
          color={colors.theme[THEME].brandMedium}
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
      {title !== '' && <Text style={styles.appTitle}>{title}</Text>}
      <Animated.Image
        style={[
          styles.headerContainer.img,
          {
            // height: animatedImgHeight,
          },
        ]}
        source={require('../../assets/img/dp.jpeg')}
      />
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  homeMenuIcon: {
    transform: [{rotateZ: '90deg'}],
  },
  headerContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 20,
    img: {
      width: 50,
      height: 90,
      borderRadius: commonStyles.r10.borderRadius,
    },
  },
  appTitle: {
    fontSize: utils.fontSize.large,
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
