import React from 'react';
import PropTypes from 'prop-types';
import CountUp from 'react-countup/build';

export const ShowPremium = ({ isCustomize, totalPremium }) => {
  return isCustomize
    ? <CountUp prefix="$ " separator="," start={0} end={totalPremium} />
    : <span>$ {totalPremium.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}</span>;
};

ShowPremium.propTypes = {
  totalPremium: PropTypes.number,
  isCustomize: PropTypes.bool
};

ShowPremium.defaultProps = {};

export default ShowPremium;
