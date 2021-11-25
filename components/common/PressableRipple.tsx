import React from 'react';
import { Pressable, PressableProps, StyleSheet, View } from 'react-native';
import { colors, ripple, utils } from '../styles/theme';
import { THEME } from '../utils/Constants';
interface PressableWrapper extends PressableProps {
  borderRadius?: number;
}
const PressableRipple = (props: PressableWrapper) => {
  return (
    <View style={styles.buttonView}>
      <Pressable android_ripple={ripple} {...props} />
    </View>
  );
};

const styles = StyleSheet.create({
  buttonView: {
    // flex: 1,
    alignSelf: 'stretch',
    justifyContent: 'center',
    overflow: 'hidden',
    shadowColor: colors.theme[THEME].shadowBrandMedium,
    borderRadius: utils.inputRadius,
    // elevation: 5,
  },
});

export default PressableRipple;
