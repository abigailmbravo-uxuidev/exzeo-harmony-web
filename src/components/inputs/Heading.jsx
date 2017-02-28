import React, { PropTypes } from 'react';

const Heading = ({
  question
//  icon
}) => (
  <span className="section-group-header">
    <i className={`fa ${question}`} />
    &nbsp;{question}
  </span>
);

Heading.propTypes = {
  question: PropTypes.any, // eslint-disable-line
  icon: PropTypes.any, // eslint-disable-line
};

export default Heading;
