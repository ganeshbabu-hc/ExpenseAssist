import React from 'react';
import Svg, {Path} from 'react-native-svg';
import {defaultUnicon, Unicon, uniconPropTypes} from './Types';

const UniconEllipseHorz = (props: Unicon) => {
  const {color, size, ...otherProps} = props;
  return (
    <Svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill={color}
      {...otherProps}>
      <Path d="M12,10a2,2,0,1,0,2,2A2,2,0,0,0,12,10ZM5,10a2,2,0,1,0,2,2A2,2,0,0,0,5,10Zm14,0a2,2,0,1,0,2,2A2,2,0,0,0,19,10Z" />
    </Svg>
  );
};
UniconEllipseHorz.propTypes = uniconPropTypes;
UniconEllipseHorz.defaultProps = defaultUnicon;

export default UniconEllipseHorz;
