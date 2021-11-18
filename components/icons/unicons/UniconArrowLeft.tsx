import React from 'react';
import Svg, { Path } from 'react-native-svg';
import { defaultUnicon, Unicon, uniconPropTypes } from './Types';

const UniconArrowLeft = (props: Unicon) => {
  const { color, size, ...otherProps } = props;
  return (
    <Svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill={color}
      {...otherProps}>
      <Path d="M17,11H9.41l3.3-3.29a1,1,0,1,0-1.42-1.42l-5,5a1,1,0,0,0-.21.33,1,1,0,0,0,0,.76,1,1,0,0,0,.21.33l5,5a1,1,0,0,0,1.42,0,1,1,0,0,0,0-1.42L9.41,13H17a1,1,0,0,0,0-2Z" />
    </Svg>
  );
};
UniconArrowLeft.propTypes = uniconPropTypes;
UniconArrowLeft.defaultProps = defaultUnicon;

export default UniconArrowLeft;
