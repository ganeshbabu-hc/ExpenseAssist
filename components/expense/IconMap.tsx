import React from 'react';
import Icon from 'react-native-vector-icons/dist/MaterialIcons';
import IonIcon from 'react-native-vector-icons/dist/Ionicons';
import {colors, commonStyles} from '../styles/common';
import {StyleSheet} from 'react-native';
interface IconMap {
  iconName: string;
  color?: string;
  style?: StyleSheet.NamedStyles<string>;
}

const IconMap = ({iconName, color, style}: IconMap) => {
  let IconComponent;
  switch (iconName) {
    case 'cash':
      IconComponent = (
        <IonIcon
          style={style}
          color={color ? color : colors.black}
          name={iconName}
          size={commonStyles.icon.width}
        />
      );
      break;
    case 'gift':
      IconComponent = (
        <IonIcon
          style={style}
          color={color ? color : colors.black}
          name={'gift-sharp'}
          size={commonStyles.icon.width}
        />
      );
      break;
    default:
      IconComponent = (
        <Icon
          style={style}
          color={color ? color : colors.black}
          name={iconName}
          size={commonStyles.icon.width}
        />
      );
      break;
  }
  return IconComponent;
};
export default IconMap;
