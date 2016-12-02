import React, { PropTypes } from 'react';

const Suggestion = ({ suggestion: { mapping, heading, results, count } }) => (
  <div>
    <span className="heading">{heading}</span>
    <span> {count}</span>
    <ul>
      {
        results ? results.map((result, index) => (
          <li key={index}>{result[mapping.title]} {result[mapping.details]}</li>
        )) : null
      }
    </ul>
  </div>
);

Suggestion.propTypes = {
  suggestion: PropTypes.shape({
    heading: PropTypes.String,
  }),
};

export default Suggestion;
