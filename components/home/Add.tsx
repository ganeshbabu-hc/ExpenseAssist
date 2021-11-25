import React from 'react';
import { Pressable, StyleSheet } from 'react-native';
import IconMap from '../common/IconMap';
import { colors, utils } from '../styles/theme';
import { THEME } from '../utils/Constants';
const Add = ({ navigation }) => {
  return (
    <Pressable
      style={styles.btnContainer}
      onPress={() => {
        navigation.navigate('AddType');
      }}>
      <IconMap name={'plus'} color={colors.theme[THEME].textLight} size={32} />
    </Pressable>
  );
};

export default Add;

const styles = StyleSheet.create({
  btnContainer: {
    backgroundColor: colors.theme[THEME].brandMedium,
    zIndex: 1,
    borderRadius: utils.inputRadius,
    width: 56,
    height: 56,
    position: 'relative',
    bottom: 24,
    right: 10,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 10,
    shadowColor: colors.theme[THEME].shadowBrandMedium,
    shadowOffset: {
      width: 10,
      height: 10,
    },
  },
});
