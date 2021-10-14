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
import {colors, commonStyles} from '../styles/common';
import IconMenu from '../icons/IconMenu';
import Icon from 'react-native-vector-icons/dist/MaterialIcons';

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
        <IconMenu />
      ) : (
        <Icon
          color={colors.brandMedium}
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
  headerContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 20,
    img: {
      width: 54,
      height: 54,
      borderRadius: commonStyles.r10.borderRadius,
    },
  },
  appTitle: {
    fontSize: 24,
    color: colors.black,
  },
});

export default AppHeader;
