import React from 'react';
import {StyleSheet, View} from 'react-native';
import Svg, {Path, Text} from 'react-native-svg';
import {colors} from '../styles/common';

const Wave = () => {
  return (
    <View style={styles.waveContainer}>
      <Svg height="100%" width="100%" viewBox="0 0 1440 320" style={styles.svg}>
        <Path
          fill={colors.brandMedium}
          fill-opacity="1"
          d="M0,192L60,176C120,160,240,128,360,122.7C480,117,600,139,720,176C840,213,960,267,1080,272C1200,277,1320,235,1380,213.3L1440,192L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z"
        />
      </Svg>
    </View>
  );
};

export default Wave;

const styles = StyleSheet.create({
  waveContainer: {
    position: 'relative',
    backgroundColor: colors.white,
    height: '100%',
  },
  svg: {
    position: 'absolute',
    top: -10,
  },
});
