import React from 'react';
import {Button, StyleSheet, View} from 'react-native';
const Add = () => {
  return (
    <View style={styles.btnContainer}>
      <Button title="asasa" onPress={() => {}} />
    </View>
  );
};

export default Add;

const styles = StyleSheet.create({
  btnContainer: {
    position: 'absolute',
    bottom: -20,
    zIndex: 0,
  },
});
