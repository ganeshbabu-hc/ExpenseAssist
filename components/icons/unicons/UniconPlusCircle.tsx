import React from 'react';
import Svg, { Path } from 'react-native-svg';
import { defaultUnicon, Unicon, uniconPropTypes } from './Types';

const UniconPlusCircle = (props: Unicon) => {
  const { color, size, ...otherProps } = props;
  return (
    <Svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill={color}
      {...otherProps}>
      <Path d="M12,2A10,10,0,1,0,22,12,10,10,0,0,0,12,2Zm0,18a8,8,0,1,1,8-8A8,8,0,0,1,12,20Zm4-9H13V8a1,1,0,0,0-2,0v3H8a1,1,0,0,0,0,2h3v3a1,1,0,0,0,2,0V13h3a1,1,0,0,0,0-2Z" />
    </Svg>
  );
};
UniconPlusCircle.propTypes = uniconPropTypes;
UniconPlusCircle.defaultProps = defaultUnicon;

export default UniconPlusCircle;
