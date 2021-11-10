import React from 'react';
import {StyleSheet, View} from 'react-native';
import Svg, {Path} from 'react-native-svg';
import {colors} from '../styles/theme';

const Wave = () => {
  return (
    <View style={styles.waveContainer}>
      <Svg
        // preserveAspectRatio="xMaxYMin slice"
        width="100%"
        height="40"
        viewBox="0 0 375 24"
        fill="none">
        <Path
          fill={colors.white}
          d="M0 30C0 30 34 0 99 0C164 0 224 30 282.5 30C341 30 375 0 375 0V30H0Z"
        />
      </Svg>
    </View>
  );
};

export default Wave;

const styles = StyleSheet.create({
  waveContainer: {
    paddingTop: 20,
    backgroundColor: colors.brand.brandLight,
  },
});
