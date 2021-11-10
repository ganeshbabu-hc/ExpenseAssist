import React from 'react';
import {StyleSheet, Text, TextProps} from 'react-native';
import {utils} from '../styles/theme';

const CText = (props: TextProps) => {
  return <Text {...props} style={[props.style, styles.font]} />;
};

const styles = StyleSheet.create({
  font: {
    fontFamily: utils.fontFamily.Regular,
  },
});

export default CText;
