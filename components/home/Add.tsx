import React, {useState} from 'react';
import {Button, Pressable, StyleSheet, TextInput, View} from 'react-native';
import Icon from 'react-native-vector-icons/dist/MaterialIcons';
import {colors} from '../styles/common';
const Add = ({navigation}) => {
  return (
    <Pressable
      style={styles.btnContainer}
      onPress={() => {
        navigation.navigate('AddType');
      }}>
      <Icon name="add" color={colors.white} size={35} />
    </Pressable>
  );
};

export default Add;

const styles = StyleSheet.create({
  btnContainer: {
    backgroundColor: colors.brandMedium,
    zIndex: 1,
    borderRadius: 30,
    width: 60,
    height: 60,
    position: 'relative',
    bottom: 16,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 10,
    shadowColor: colors.brandMedium,
    shadowOffset: {
      width: 10,
      height: 10,
    },
  },
});
