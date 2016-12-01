import React, { PropTypes } from 'react';

const Suggestion = ({ suggestion }) => (
  <div>
    <span className="heading">{suggestion.heading}</span>
    <span>{suggestion.count}</span>
  </div>
);

Suggestion.propTypes = {
  suggestion: PropTypes.shape({
    heading: PropTypes.String,
  }),
};

export default Suggestion;
