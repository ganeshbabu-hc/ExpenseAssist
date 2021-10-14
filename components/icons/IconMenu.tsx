import React from 'react';
import Svg, {Path} from 'react-native-svg';
import {colors} from '../styles/common';
import {IconType} from './IconTypes';
// import PropTypes from 'prop-types';

const IconMenu = ({color}: IconType) => {
  const fillColor = color ?? colors.brandMedium;
  return (
    <Svg width="28" height="28" viewBox="0 0 24 24" fill="none">
      <Path
        d="M4 18H14"
        stroke={fillColor}
        stroke-width="4"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <Path
        d="M4 12H20"
        stroke={fillColor}
        stroke-width="4"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <Path
        d="M4 6H10"
        stroke={fillColor}
        stroke-width="4"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </Svg>
  );
};

export default IconMenu;
