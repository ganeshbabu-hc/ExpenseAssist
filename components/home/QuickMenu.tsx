import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {colors, commonStyles, utils} from '../styles/common';
import Wave from '../common/Wave';



const QuickMenu = () => {
  return (
    <View style={styles.quickMenuContainer}>
      <Wave />
      <View style={[commonStyles.container, utils.bgWhite]}>
        <Text>Hai</Text>
      </View>
    </View>
  );
};

export default QuickMenu;

const styles = StyleSheet.create({
  quickMenuContainer: {
    backgroundColor: colors.white,
  },
});
