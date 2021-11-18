import {colors} from '../../styles/theme';
import {THEME} from '../../utils/Constants';
import PropTypes from 'prop-types';
import {ComponentProps} from 'react';

export interface Unicon
  extends ComponentProps<React.JSXElementConstructor<any>> {
  size?: number;
  color?: string | number;
  active?: boolean;
}

export const defaultUnicon: Unicon = {
  size: 28,
  color: colors.theme[THEME].textDark,
  active: false,
};
export const uniconPropTypes = {
  color: PropTypes.string,
  size: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  active: PropTypes.bool,
};
