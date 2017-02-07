import React from 'react';

const Heading = ({
  name,
  question,
  icon,
}) => (
  <h4 className="section-group-header">
    <i className={icon} />
    &nbsp;{question}
  </h4>
)

export default Heading;
