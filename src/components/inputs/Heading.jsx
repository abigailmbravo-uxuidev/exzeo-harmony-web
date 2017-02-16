import React, { PropTypes } from 'react';

const Heading = ({
  question,
  icon,
}) => (
  <h2 className="section-group-header">
    <i className={'fa ' + question} />
    &nbsp;{question}
  </h2>
);

Heading.propTypes = {
  question: PropTypes.any, // eslint-disable-line
  icon: PropTypes.any, // eslint-disable-line
};

export default Heading;
