import React from 'react';
import {Pressable, PressableProps, StyleSheet, View} from 'react-native';
import {ripple} from '../styles/theme';
interface PressableWrapper extends PressableProps {
  borderRadius?: number;
}
const PressableRipple = (props: PressableWrapper) => {
  const br = props.borderRadius ?? 0;
  return (
    <View style={[{borderRadius: br}, styles.buttonView]}>
      <Pressable android_ripple={ripple} {...props} />
    </View>
  );
};

const styles = StyleSheet.create({
  buttonView: {
    alignSelf: 'stretch',
    justifyContent: 'center',
    overflow: 'hidden',
    borderRadius: 20,
  },
});

export default PressableRipple;
