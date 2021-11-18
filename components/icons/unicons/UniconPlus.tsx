import React from 'react';
import Svg, { Path } from 'react-native-svg';
import { defaultUnicon, Unicon, uniconPropTypes } from './Types';

const UniconPlus = (props: Unicon) => {
  const { color, size, ...otherProps } = props;
  return (
    <Svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill={color}
      {...otherProps}>
      <Path d="M19,11H13V5a1,1,0,0,0-2,0v6H5a1,1,0,0,0,0,2h6v6a1,1,0,0,0,2,0V13h6a1,1,0,0,0,0-2Z" />
    </Svg>
  );
};
UniconPlus.propTypes = uniconPropTypes;
UniconPlus.defaultProps = defaultUnicon;

export default UniconPlus;
