import React, { PropTypes } from 'react';

const Details = ({ details }) => (
  <div className="side-panel">
    {details.map((d, index) => {
      if (d.name.replace(/\s+/g, '') === 'AnnualPremium' || d.name.replace(/\s+/g, '') === 'CoverageA' || d.name.replace(/\s+/g, '') === 'CoverageB' || d.name.replace(/\s+/g, '') === 'CoverageC') {
        return (
          <dl key={`${index}d`}>
            <div>
              <dt>{d.name}</dt>
              <dd>{`$ ${d.value.replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}`}</dd>
            </div>
          </dl>
        );
      }
      return (
        <dl key={`${index}d`}>
          <div>
            <dt>{d.name}</dt>
            <dd>{d.value}</dd>
          </div>
        </dl>
      );
    })}
  </div>);

Details.propTypes = {
  details: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string,
    value: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
    ]),
  })),
};

export default Details;
