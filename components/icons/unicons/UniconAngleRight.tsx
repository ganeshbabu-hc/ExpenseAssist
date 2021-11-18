import React from 'react';
import Svg, {Path} from 'react-native-svg';
import {defaultUnicon, Unicon, uniconPropTypes} from './Types';

const UniconAngleRight = (props: Unicon) => {
  const {color, size, ...otherProps} = props;
  return (
    <Svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill={color}
      {...otherProps}>
      <Path d="M15.54,11.29,9.88,5.64a1,1,0,0,0-1.42,0,1,1,0,0,0,0,1.41l4.95,5L8.46,17a1,1,0,0,0,0,1.41,1,1,0,0,0,.71.3,1,1,0,0,0,.71-.3l5.66-5.65A1,1,0,0,0,15.54,11.29Z" />
    </Svg>
  );
};
UniconAngleRight.propTypes = uniconPropTypes;
UniconAngleRight.defaultProps = defaultUnicon;

export default UniconAngleRight;
