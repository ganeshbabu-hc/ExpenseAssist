import React from 'react';
import Icon from 'react-native-vector-icons/dist/MaterialIcons';
import IonIcon from 'react-native-vector-icons/dist/Ionicons';
import CommunityIcon from 'react-native-vector-icons/dist/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/dist/FontAwesome5';
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
    case 'hand-holding-usd':
    case 'award':
      IconComponent = (
        <FontAwesome
          style={style}
          color={color ? color : colors.black}
          name={iconName}
          size={commonStyles.icon.width}
        />
      );
      break;
    case 'cash-plus':
    case 'account-cash':
    case 'cash-minus':
    case 'cash-refund':
    case 'chart-line':
    case 'sale':
    case 'cash':
      IconComponent = (
        <CommunityIcon
          style={style}
          color={color ? color : colors.black}
          name={iconName}
          size={commonStyles.icon.width}
        />
      );
      break;
    case 'gift':
    case 'business':
      IconComponent = (
        <IonIcon
          style={style}
          color={color ? color : colors.black}
          name={iconName}
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
