import React from 'react';
import Icon from 'react-native-vector-icons/dist/MaterialIcons';
import IonIcon from 'react-native-vector-icons/dist/Ionicons';
import {colors, commonStyles} from '../styles/common';

const IconMap = ({iconName}) => {
  let IconComponent;
  switch (iconName) {
    case 'cash' || 'gift':
      IconComponent = (
        <IonIcon
          color={colors.black}
          name="cash"
          size={commonStyles.icon.width}
        />
      );
      break;
    default:
      IconComponent = (
        <Icon
          color={colors.black}
          name="account-balance"
          size={commonStyles.icon.width}
        />
      );
      break;
  }
  return IconComponent;
};
export default IconMap;

// <IonIcon name="cash" size={commonStyles.icon.width} />
// <Icon name="account-balance" size={commonStyles.icon.width} />
// <Icon name="touch-app" size={commonStyles.icon.width} />
// <Icon name="credit-card" size={commonStyles.icon.width} />

// <Icon name="fastfood" size={commonStyles.icon.width} />
// <Icon name="shopping-bag" size={commonStyles.icon.width} />
// <Icon name="emoji-transportation" size={commonStyles.icon.width} />
// <Icon name="groups" size={commonStyles.icon.width} />
// <Icon name="store" size={commonStyles.icon.width} />
// <Icon name="local-hospital" size={commonStyles.icon.width} />
// <IonIcon name="gift" size={commonStyles.icon.width} />
// <Icon name="school" size={commonStyles.icon.width} />
// <Icon name="person" size={commonStyles.icon.width} />
