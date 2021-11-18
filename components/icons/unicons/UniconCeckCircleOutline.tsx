import React from 'react';
import Svg, {Path} from 'react-native-svg';
import {defaultUnicon, Unicon, uniconPropTypes} from './Types';

const UniconCeckCircleOutline = (props: Unicon) => {
  const {color, size, ...otherProps} = props;
  return (
    <Svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill={color}
      {...otherProps}>
      <Path d="M14.72,8.79l-4.29,4.3L8.78,11.44a1,1,0,1,0-1.41,1.41l2.35,2.36a1,1,0,0,0,.71.29,1,1,0,0,0,.7-.29l5-5a1,1,0,0,0,0-1.42A1,1,0,0,0,14.72,8.79ZM12,2A10,10,0,1,0,22,12,10,10,0,0,0,12,2Zm0,18a8,8,0,1,1,8-8A8,8,0,0,1,12,20Z" />
    </Svg>
  );
};
UniconCeckCircleOutline.propTypes = uniconPropTypes;
UniconCeckCircleOutline.defaultProps = defaultUnicon;

export default UniconCeckCircleOutline;
