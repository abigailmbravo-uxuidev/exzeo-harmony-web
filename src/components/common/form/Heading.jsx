import React, { PropTypes } from 'react';

const Heading = ({
  question,
  icon,
}) => (
  <h4 className="section-group-header">
    <i className={icon} />
    &nbsp;{question}
  </h4>
);

Heading.propTypes = {
  question: PropTypes.any, // eslint-disable-line
  icon: PropTypes.any, // eslint-disable-line
};

export default Heading;
