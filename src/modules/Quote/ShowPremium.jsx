import React from 'react';
import PropTypes from 'prop-types';
import CountUp from 'react-countup';
import { format } from '@exzeo/core-ui';

export const ShowPremium = ({ useAnimation, premium }) => {
  return !!premium
    ? useAnimation
      ? <CountUp duration={1.50} prefix="$ " separator="," start={premium + 100} end={premium} />
      : <span>{format.toCurrency(premium)}</span>
    : '--'
};

ShowPremium.propTypes = {
  premium: PropTypes.number,
  useAnimation: PropTypes.bool
};

ShowPremium.defaultProps = {
  premium: 0,
  useAnimation: false
};

export default ShowPremium;
