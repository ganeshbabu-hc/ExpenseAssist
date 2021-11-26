import React from 'react';
import { Pressable } from 'react-native';
import IconMap from '../common/IconMap';
import { addBtnStyles } from '../styles/commonStyles';
import { GetTheme } from '../styles/GetThemeHook';
const Add = ({ navigation }) => {
  const { styles, colors } = GetTheme(addBtnStyles);
  return (
    <Pressable
      style={styles.btnContainer}
      onPress={() => {
        navigation.navigate('AddType');
      }}>
      <IconMap name={'plus'} color={colors.textLight} size={32} />
    </Pressable>
  );
};

export default Add;
