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
import {Image, StyleSheet, View} from 'react-native';
import {commonStyles} from '../styles/common';
import IconMenu from '../icons/IconMenu';

const AppHeader = () => {
  return (
    <View style={styles.headerContainer}>
      <IconMenu />
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
});

export default AppHeader;
