import React from 'react';
import Svg, { Path } from 'react-native-svg';
import { defaultUnicon, Unicon, uniconPropTypes } from './Types';

const UniconSearch = (props: Unicon) => {
  const { color, size, ...otherProps } = props;
  return (
    <Svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill={color}
      {...otherProps}>
      <Path d="M21.71,20.29,18,16.61A9,9,0,1,0,16.61,18l3.68,3.68a1,1,0,0,0,1.42,0A1,1,0,0,0,21.71,20.29ZM11,18a7,7,0,1,1,7-7A7,7,0,0,1,11,18Z" />
    </Svg>
  );
};
UniconSearch.propTypes = uniconPropTypes;
UniconSearch.defaultProps = defaultUnicon;

export default UniconSearch;