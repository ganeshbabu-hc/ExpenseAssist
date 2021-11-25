import React from 'react';
import { colors } from '../styles/theme';
import { THEME } from '../utils/Constants';
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
import UniconPlus from '../icons/unicons/UniconPlus';
import UniconArrowLeft from '../icons/unicons/UniconArrowLeft';
import UniconExclamationTriangle from '../icons/unicons/UniconExclamationTriangle';
import UniconExclamationCircle from '../icons/unicons/UniconExclamationCircle';
import UniconExclamationOctagon from '../icons/unicons/UniconExclamationOctagon';
import UniconPlusCircle from '../icons/unicons/UniconPlusCircle';
import UniconImage from '../icons/unicons/UniconImage';
import UniconSearch from '../icons/unicons/UniconSearch';
import UniconSetting from '../icons/unicons/UniconSetting';
import UniconPieAlt from '../icons/unicons/UniconPieAlt';
import UniconUnivercity from '../icons/unicons/UniconUnivercity';
import UniconHome from '../icons/unicons/UniconHome';
import UniconCreditCard from '../icons/unicons/UniconCreditCard';
import UniconMobile from '../icons/unicons/UniconMobile';
import UniconScenary from '../icons/unicons/UniconScenary';
import UniconCamera from '../icons/unicons/UniconCamera';
import UniconDataSharing from '../icons/unicons/UniconDataSharing';
import UniconTrashAlt from '../icons/unicons/UniconTrashAlt';
import UniconEdit from '../icons/unicons/UniconEdit';
interface IconMap {
  name: string;
  color?: string;
  style?: any;
  size?: number;
  active?: boolean;
}

const IconMap = ({ name, color, style, size, active = false }: IconMap) => {
  let IconComponent = null;
  switch (name) {
    case 'edit':
      return (
        <UniconEdit
          style={style}
          active={active}
          size={size ?? 24}
          color={color ? color : colors.theme[THEME].textDark}
        />
      );
    case 'trash':
      return (
        <UniconTrashAlt
          style={style}
          active={active}
          size={size ?? 24}
          color={color ? color : colors.theme[THEME].textDark}
        />
      );
    case 'scenary':
      return (
        <UniconScenary
          style={style}
          active={active}
          size={size ?? 24}
          color={color ? color : colors.theme[THEME].textDark}
        />
      );
    case 'data-sharing':
      return (
        <UniconDataSharing
          style={style}
          active={active}
          size={size ?? 24}
          color={color ? color : colors.theme[THEME].textDark}
        />
      );
    case 'close':
      return (
        <UniconPlus
          style={[style, { transform: [{ rotateZ: '-45deg' }] }]}
          active={active}
          size={size ?? 24}
          color={color ? color : colors.theme[THEME].textDark}
        />
      );
    case 'search':
      return (
        <UniconSearch
          style={style}
          active={active}
          size={size ?? 24}
          color={color ? color : colors.theme[THEME].textDark}
        />
      );
    case 'credit-card':
      return (
        <UniconCreditCard
          style={style}
          active={active}
          size={size ?? 24}
          color={color ? color : colors.theme[THEME].textDark}
        />
      );
    case 'mobile':
    case 'touch-app':
      return (
        <UniconMobile
          style={style}
          active={active}
          size={size ?? 24}
          color={color ? color : colors.theme[THEME].textDark}
        />
      );
    case 'home':
      return (
        <UniconHome
          style={style}
          active={active}
          size={size ?? 24}
          color={color ? color : colors.theme[THEME].textDark}
        />
      );
    case 'univercity':
    case 'account-balance':
      return (
        <UniconUnivercity
          style={style}
          active={active}
          size={size ?? 24}
          color={color ? color : colors.theme[THEME].textDark}
        />
      );
    case 'pie':
      return (
        <UniconPieAlt
          style={style}
          active={active}
          size={size ?? 24}
          color={color ? color : colors.theme[THEME].textDark}
        />
      );
    case 'gear':
      return (
        <UniconSetting
          style={style}
          active={active}
          size={size ?? 24}
          color={color ? color : colors.theme[THEME].textDark}
        />
      );

    case 'camera':
      return (
        <UniconCamera
          style={style}
          active={active}
          size={size ?? 24}
          color={color ? color : colors.theme[THEME].textDark}
        />
      );
    case 'image':
      return (
        <UniconImage
          style={style}
          active={active}
          size={size ?? 24}
          color={color ? color : colors.theme[THEME].textDark}
        />
      );
    case 'plus-circle':
      return (
        <UniconPlusCircle
          style={style}
          active={active}
          size={size ?? 24}
          color={color ? color : colors.theme[THEME].textDark}
        />
      );
    case 'plus':
      return (
        <UniconPlus
          style={style}
          active={active}
          size={size ?? 24}
          color={color ? color : colors.theme[THEME].textDark}
        />
      );
    case 'arrow-left':
      return (
        <UniconArrowLeft
          style={style}
          active={active}
          size={size ?? 24}
          color={color ? color : colors.theme[THEME].textDark}
        />
      );
    case 'exclamation-triangle':
      return (
        <UniconExclamationTriangle
          style={style}
          active={active}
          size={size ?? 24}
          color={color ? color : colors.theme[THEME].textDark}
        />
      );
    case 'exclamation-circle':
      return (
        <UniconExclamationCircle
          style={style}
          active={active}
          size={size ?? 24}
          color={color ? color : colors.theme[THEME].textDark}
        />
      );
    case 'exclamation-octo':
      return (
        <UniconExclamationOctagon
          style={style}
          active={active}
          size={size ?? 24}
          color={color ? color : colors.theme[THEME].textDark}
        />
      );
    case 'paper-clip':
      return (
        <UniconPaperClip
          style={style}
          active={active}
          size={size ?? 24}
          color={color ? color : colors.theme[THEME].textDark}
        />
      );
    case 'clock':
      return (
        <UniconClock
          style={style}
          active={active}
          size={size ?? 24}
          color={color ? color : colors.theme[THEME].textDark}
        />
      );
    case 'calendar':
      return (
        <UniconCalendar
          style={style}
          active={active}
          size={size ?? 24}
          color={color ? color : colors.theme[THEME].textDark}
        />
      );
    case 'circle':
      return (
        <UniconCircle
          style={style}
          active={active}
          size={size ?? 24}
          color={color ? color : colors.theme[THEME].textDark}
        />
      );
    case 'help-circle':
      return (
        <UniconHelpCircle
          style={style}
          active={active}
          size={size ?? 24}
          color={color ? color : colors.theme[THEME].textDark}
        />
      );
    case 'language':
      return (
        <UniconLanguage
          style={style}
          active={active}
          size={size ?? 24}
          color={color ? color : colors.theme[THEME].textDark}
        />
      );
    case 'ul-li':
      return (
        <UniconUlLi
          style={style}
          active={active}
          size={size ?? 24}
          color={color ? color : colors.theme[THEME].textDark}
        />
      );
    case 'usd-circle':
      return (
        <UniconUsdCircle
          style={style}
          active={active}
          size={size ?? 24}
          color={color ? color : colors.theme[THEME].textDark}
        />
      );
    case 'swatch-book':
      return (
        <UniconSwatchBook
          style={style}
          active={active}
          size={size ?? 24}
          color={color ? color : colors.theme[THEME].textDark}
        />
      );
    case 'angle-right':
      return (
        <UniconAngleRight
          style={style}
          active={active}
          size={size ?? 24}
          color={color ? color : colors.theme[THEME].textDark}
        />
      );
    case 'angle-right':
      return (
        <UniconAngleRight
          style={style}
          active={active}
          size={size ?? 24}
          color={color ? color : colors.theme[THEME].textDark}
        />
      );
    case 'ellipse-horz':
      return (
        <UniconEllipseHorz
          style={style}
          active={active}
          size={size ?? 24}
          color={color ? color : colors.theme[THEME].textDark}
        />
      );
    case 'alarm':
      return (
        <UniconAlarm
          style={style}
          active={active}
          size={size ?? 24}
          color={color ? color : colors.theme[THEME].textDark}
        />
      );
    case 'payments':
      return (
        <UniconTransaction
          style={style}
          active={active}
          size={size ?? 24}
          color={color ? color : colors.theme[THEME].textDark}
        />
      );
    case 'account-balance-wallet':
      return (
        <UniconWallet
          style={style}
          active={active}
          size={size ?? 24}
          color={color ? color : colors.theme[THEME].textDark}
        />
      );
    case 'cash-plus':
      return (
        <UniconMoneyInsert
          style={style}
          active={active}
          size={size ?? 24}
          color={color ? color : colors.theme[THEME].textDark}
        />
      );
    case 'business':
      return (
        <UniconBuilding
          style={style}
          active={active}
          size={size ?? 24}
          color={color ? color : colors.theme[THEME].textDark}
        />
      );
    case 'chart-line':
    case 'arrow-growth':
      return (
        <UniconArrowGrowth
          style={style}
          active={active}
          size={size ?? 24}
          color={color ? color : colors.theme[THEME].textDark}
        />
      );
    case 'cash-refund':
      return (
        <UniconWithDrawl
          style={style}
          active={active}
          size={size ?? 24}
          color={color ? color : colors.theme[THEME].textDark}
        />
      );
    case 'sale':
      return (
        <UniconPercent
          style={style}
          active={active}
          size={size ?? 24}
          color={color ? color : colors.theme[THEME].textDark}
        />
      );
    case 'hand-holding-usd':
      return (
        <UniconEnvolopeDownload
          style={style}
          active={active}
          size={size ?? 24}
          color={color ? color : colors.theme[THEME].textDark}
        />
      );
    case 'award':
      return (
        <UniconAward
          style={style}
          active={active}
          size={size ?? 24}
          color={color ? color : colors.theme[THEME].textDark}
        />
      );
    case 'cash':
      return (
        <UniconMoneyBill
          style={style}
          active={active}
          size={size ?? 24}
          color={color ? color : colors.theme[THEME].textDark}
        />
      );
    case 'account-cash':
      return (
        <UniconMoneyStack
          style={style}
          active={active}
          size={size ?? 24}
          color={color ? color : colors.theme[THEME].textDark}
        />
      );
    case 'check-circle':
      return (
        <UniconCeckCircleOutline
          style={style}
          active={active}
          size={size ?? 24}
          color={color ? color : colors.theme[THEME].textDark}
        />
      );
    case 'cash-minus':
      return (
        <UniconMoneyInsert
          style={style}
          active={active}
          size={size ?? 24}
          color={color ? color : colors.theme[THEME].textDark}
        />
      );
    case 'person':
      return (
        <UniconArchive
          style={style}
          active={active}
          size={size ?? 24}
          color={color ? color : colors.theme[THEME].textDark}
        />
      );
    case 'school':
      return (
        <UniconEducation
          style={style}
          active={active}
          size={size ?? 24}
          color={color ? color : colors.theme[THEME].textDark}
        />
      );
    case 'gift':
      return (
        <UniconGift
          style={style}
          active={active}
          size={size ?? 24}
          color={color ? color : colors.theme[THEME].textDark}
        />
      );
    case 'local-hospital':
      return (
        <UniconHealth
          style={style}
          active={active}
          size={size ?? 24}
          color={color ? color : colors.theme[THEME].textDark}
        />
      );
    case 'store':
      return (
        <UniconKart
          style={style}
          active={active}
          size={size ?? 24}
          color={color ? color : colors.theme[THEME].textDark}
        />
      );
    case 'groups':
      return (
        <UniconSocial
          style={style}
          active={active}
          size={size ?? 24}
          color={color ? color : colors.theme[THEME].textDark}
        />
      );
    case 'emoji-transportation':
      return (
        <UniconCar
          style={style}
          active={active}
          size={size ?? 24}
          color={color ? color : colors.theme[THEME].textDark}
        />
      );
    case 'fastfood':
      return (
        <UniconCrockery
          style={style}
          active={active}
          size={size ?? 24}
          color={color ? color : colors.theme[THEME].textDark}
        />
      );
    case 'shopping-bag':
      return (
        <UniconShopping
          style={style}
          active={active}
          size={size ?? 24}
          color={color ? color : colors.theme[THEME].textDark}
        />
      );
    default:
      break;
  }
  return IconComponent;
};
export default IconMap;
