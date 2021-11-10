import React from 'react';
import {Pressable, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/dist/MaterialIcons';
import {colors, utils} from '../styles/theme';
const Add = ({navigation}) => {
  return (
    <Pressable
      style={styles.btnContainer}
      onPress={() => {
        navigation.navigate('AddType');
      }}>
      <Icon name="add" color={colors.white} size={32} />
    </Pressable>
  );
};

export default Add;

const styles = StyleSheet.create({
  btnContainer: {
    backgroundColor: colors.brand.brandMedium,
    zIndex: 1,
    borderRadius: utils.inputRadius,
    width: 56,
    height: 56,
    position: 'relative',
    bottom: 20,
    right: 10,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 10,
    shadowColor: colors.brand.brandMedium,
    shadowOffset: {
      width: 10,
      height: 10,
    },
  },
});
