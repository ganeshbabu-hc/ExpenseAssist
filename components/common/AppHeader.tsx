/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React from 'react';
// import VectorImage from 'react-native-vector-image';
import {Image, StyleSheet, Text, View} from 'react-native';
import {colors, commonStyles, utils} from '../styles/theme';
import IconMenu from '../icons/IconMenu';
import Icon from 'react-native-vector-icons/dist/MaterialIcons';
import color from 'material-ui-colors/dist/amber';

interface IAppHeader {
  navigation?: any;
  homeScreen?: boolean;
  backTo?: string;
  title?: string;
}

const AppHeader = ({
  homeScreen = true,
  backTo = '',
  navigation,
  title = '',
}: IAppHeader) => {
  return (
    <View style={styles.headerContainer}>
      {homeScreen ? (
        <View style={styles.headerDesc}>
          <Text style={styles.headerDescTitle}>MoneyAssist</Text>
          <Text style={styles.headerDescSubTitle}>
            Your expense manging partner
          </Text>
        </View>
      ) : (
        <Icon
          color={colors.brand.brandMedium}
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
      <Image
        style={styles.headerContainer.img}
        source={require('../../assets/img/dp.jpeg')}
      />
    </View>
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
    marginVertical: 20,
    img: {
      width: 50,
      height: 90,
      borderRadius: commonStyles.r10.borderRadius,
    },
  },
  appTitle: {
    fontSize: utils.fontSize.large,
    fontFamily: utils.fontFamily.Bold,
    color: colors.black,
  },
  headerDesc: {
    paddingVertical: 20,
  },
  headerDescTitle: {
    color: colors.black,
    fontSize: utils.fontSize.xxlarge,
    fontFamily: utils.fontFamily.Bold,
  },
  headerDescSubTitle: {
    color: colors.grayCardText,
    fontSize: utils.fontSize.xsmall,
    fontFamily: utils.fontFamily.Regular,
  },
});

export default AppHeader;
