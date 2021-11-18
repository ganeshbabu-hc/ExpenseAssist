import React from 'react';
import Icon from 'react-native-vector-icons/dist/MaterialIcons';
import IonIcon from 'react-native-vector-icons/dist/Ionicons';
import CommunityIcon from 'react-native-vector-icons/dist/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/dist/FontAwesome5';
import {colors, commonStyles} from '../styles/theme';
import {StyleSheet} from 'react-native';
import {THEME} from '../utils/Constants';
import UniconCrockery from '../icons/unicons/UniconCrockery';
import UniconShopping from '../icons/unicons/UniconShopping';
import UniconCar from '../icons/unicons/UniconCar';
import UniconSocial from '../icons/unicons/UniconSocial';
import UniconKart from '../icons/unicons/UniconKart';
import UniconHealth from '../icons/unicons/UniconHealth';
import UniconGift from '../icons/unicons/UniconGift';
import UniconEducation from '../icons/unicons/UniconEducation';
import UniconArchive from '../icons/unicons/UniconArchive';
import UniconMoneyInsert from '../icons/unicons/UniconMoneyInsert';
import UniconCeckCircleOutline from '../icons/unicons/UniconCeckCircleOutline';
import UniconMoneyStack from '../icons/unicons/UniconMoneyStack';
import UniconMoneyBill from '../icons/unicons/UniconMoneyBill';
import UniconAward from '../icons/unicons/UniconAward';
import UniconEnvolopeDownload from '../icons/unicons/UniconEnvolopeDownload';
import UniconPercent from '../icons/unicons/UniconPercent';
import UniconWithDrawl from '../icons/unicons/UniconWithDrawl';
import UniconArrowGrowth from '../icons/unicons/UniconArrowGrowth';
import UniconBuilding from '../icons/unicons/UniconBuilding';
import UniconWallet from '../icons/unicons/UniconWallet';
import UniconTransaction from '../icons/unicons/UniconTransaction';
import UniconAlarm from '../icons/unicons/UniconAlarm';
import UniconEllipseHorz from '../icons/unicons/UniconEllipseHorz';
import UniconAngleRight from '../icons/unicons/UniconAngleRight';
import UniconSwatchBook from '../icons/unicons/UniconSwatchBook';
import UniconUsdCircle from '../icons/unicons/UniconUsdCircle';
import UniconLanguage from '../icons/unicons/UniconLanguage';
import UniconHelpCircle from '../icons/unicons/UniconHelpCircle';
import UniconUlLi from '../icons/unicons/UniconUlLi';
import UniconCircle from '../icons/unicons/UniconCircle';
import UniconClock from '../icons/unicons/UniconClock';
import UniconCalendar from '../icons/unicons/UniconCalendar';
import UniconPaperClip from '../icons/unicons/UniconPaperClip';
interface IconMap {
  iconName: string;
  color?: string;
  style?: any;
  size?: number;
  active?: boolean;
}

const IconMap = ({iconName, color, style, size, active = false}: IconMap) => {
  // console.log(iconName);
  let IconComponent;
  switch (iconName) {
    case 'paper-clip':
      return (
        <UniconPaperClip
          style={style}
          active={active}
          size={24}
          color={color ? color : colors.theme[THEME].textDark}
        />
      );
    case 'clock':
      return (
        <UniconClock
          style={style}
          active={active}
          size={24}
          color={color ? color : colors.theme[THEME].textDark}
        />
      );
    case 'calendar':
      return (
        <UniconCalendar
          style={style}
          active={active}
          size={24}
          color={color ? color : colors.theme[THEME].textDark}
        />
      );
    case 'circle':
      return (
        <UniconCircle
          style={style}
          active={active}
          size={24}
          color={color ? color : colors.theme[THEME].textDark}
        />
      );
    case 'help-circle':
      return (
        <UniconHelpCircle
          style={style}
          active={active}
          size={24}
          color={color ? color : colors.theme[THEME].textDark}
        />
      );
    case 'language':
      return (
        <UniconLanguage
          style={style}
          active={active}
          size={24}
          color={color ? color : colors.theme[THEME].textDark}
        />
      );
    case 'ul-li':
      return (
        <UniconUlLi
          style={style}
          active={active}
          size={24}
          color={color ? color : colors.theme[THEME].textDark}
        />
      );
    case 'usd-circle':
      return (
        <UniconUsdCircle
          style={style}
          active={active}
          size={24}
          color={color ? color : colors.theme[THEME].textDark}
        />
      );
    case 'swatch-book':
      return (
        <UniconSwatchBook
          style={style}
          active={active}
          size={24}
          color={color ? color : colors.theme[THEME].textDark}
        />
      );
    case 'angle-right':
      return (
        <UniconAngleRight
          style={style}
          active={active}
          size={24}
          color={color ? color : colors.theme[THEME].textDark}
        />
      );
    case 'angle-right':
      return (
        <UniconAngleRight
          style={style}
          active={active}
          size={24}
          color={color ? color : colors.theme[THEME].textDark}
        />
      );
    case 'ellipse-horz':
      return (
        <UniconEllipseHorz
          style={style}
          active={active}
          size={24}
          color={color ? color : colors.theme[THEME].textDark}
        />
      );
    case 'alarm':
      return (
        <UniconAlarm
          style={style}
          active={active}
          size={24}
          color={color ? color : colors.theme[THEME].textDark}
        />
      );
    case 'payments':
      return (
        <UniconTransaction
          style={style}
          active={active}
          size={24}
          color={color ? color : colors.theme[THEME].textDark}
        />
      );
    case 'account-balance-wallet':
      return (
        <UniconWallet
          style={style}
          active={active}
          size={24}
          color={color ? color : colors.theme[THEME].textDark}
        />
      );
    case 'cash-plus':
      return (
        <UniconMoneyInsert
          style={style}
          active={active}
          size={24}
          color={color ? color : colors.theme[THEME].textDark}
        />
      );
    case 'business':
      return (
        <UniconBuilding
          style={style}
          active={active}
          size={24}
          color={color ? color : colors.theme[THEME].textDark}
        />
      );
    case 'chart-line':
      return (
        <UniconArrowGrowth
          style={style}
          active={active}
          size={24}
          color={color ? color : colors.theme[THEME].textDark}
        />
      );
    case 'cash-refund':
      return (
        <UniconWithDrawl
          style={style}
          active={active}
          size={24}
          color={color ? color : colors.theme[THEME].textDark}
        />
      );
    case 'sale':
      return (
        <UniconPercent
          style={style}
          active={active}
          size={24}
          color={color ? color : colors.theme[THEME].textDark}
        />
      );
    case 'hand-holding-usd':
      return (
        <UniconEnvolopeDownload
          style={style}
          active={active}
          size={24}
          color={color ? color : colors.theme[THEME].textDark}
        />
      );
    case 'award':
      return (
        <UniconAward
          style={style}
          active={active}
          size={24}
          color={color ? color : colors.theme[THEME].textDark}
        />
      );
    case 'cash':
      return (
        <UniconMoneyBill
          style={style}
          active={active}
          size={24}
          color={color ? color : colors.theme[THEME].textDark}
        />
      );
    case 'account-cash':
      return (
        <UniconMoneyStack
          style={style}
          active={active}
          size={24}
          color={color ? color : colors.theme[THEME].textDark}
        />
      );
      // case 'plus':
      //   return (
      //     <UniconMoneyStack
      //       style={style}
      active = {active};
    //       size={24}
    //       color={color ? color : colors.theme[THEME].textDark}
    //     />
    //   );
    case 'check-circle':
      return (
        <UniconCeckCircleOutline
          style={style}
          active={active}
          size={24}
          color={color ? color : colors.theme[THEME].textDark}
        />
      );
    case 'cash-minus':
      return (
        <UniconMoneyInsert
          style={style}
          active={active}
          size={24}
          color={color ? color : colors.theme[THEME].textDark}
        />
      );
    case 'person':
      return (
        <UniconArchive
          style={style}
          active={active}
          size={24}
          color={color ? color : colors.theme[THEME].textDark}
        />
      );
    case 'school':
      return (
        <UniconEducation
          style={style}
          active={active}
          size={24}
          color={color ? color : colors.theme[THEME].textDark}
        />
      );
    case 'gift':
      return (
        <UniconGift
          style={style}
          active={active}
          size={24}
          color={color ? color : colors.theme[THEME].textDark}
        />
      );
    case 'local-hospital':
      return (
        <UniconHealth
          style={style}
          active={active}
          size={24}
          color={color ? color : colors.theme[THEME].textDark}
        />
      );
    case 'store':
      return (
        <UniconKart
          style={style}
          active={active}
          size={24}
          color={color ? color : colors.theme[THEME].textDark}
        />
      );
    case 'groups':
      return (
        <UniconSocial
          style={style}
          active={active}
          size={24}
          color={color ? color : colors.theme[THEME].textDark}
        />
      );
    case 'emoji-transportation':
      return (
        <UniconCar
          style={style}
          active={active}
          size={24}
          color={color ? color : colors.theme[THEME].textDark}
        />
      );
    case 'fastfood':
      return (
        <UniconCrockery
          style={style}
          active={active}
          size={24}
          color={color ? color : colors.theme[THEME].textDark}
        />
      );
    case 'shopping-bag':
      return (
        <UniconShopping
          style={style}
          active={active}
          size={24}
          color={color ? color : colors.theme[THEME].textDark}
        />
      );
    case 'hand-holding-usd':
    case 'award':
      IconComponent = (
        <FontAwesome
          style={style}
          active={active}
          color={color ? color : colors.theme[THEME].textDark}
          name={iconName}
          size={size ?? commonStyles.icon.width}
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
    case 'gift':
      IconComponent = (
        <CommunityIcon
          style={style}
          active={active}
          color={color ? color : colors.theme[THEME].textDark}
          name={iconName}
          size={size ?? commonStyles.icon.width}
        />
      );
      break;
    case 'business':
      IconComponent = (
        <IonIcon
          style={style}
          active={active}
          color={color ? color : colors.theme[THEME].textDark}
          name={iconName}
          size={size ?? commonStyles.icon.width}
        />
      );
      break;
    default:
      IconComponent = (
        <Icon
          style={style}
          active={active}
          color={color ? color : colors.theme[THEME].textDark}
          name={iconName}
          size={size ?? commonStyles.icon.width}
        />
      );
      break;
  }
  return IconComponent;
};
export default IconMap;
