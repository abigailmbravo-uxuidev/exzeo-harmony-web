import React, { PropTypes } from 'react';

const Suggestion = ({ data }) => {
  const { heading, mapping, results, count } = data;
  return (
    <div>
      <span className="heading">{heading}</span>
      <span> {count}</span>
      <ul>
        {
          results && results.length > 0 ? results.map((result, index) => (
            <li key={index}>{result[mapping.title]} {result[mapping.details]}</li>
          )) : null
        }
      </ul>
    </div>
  );
};

Suggestion.propTypes = {
  data: PropTypes.shape({
    heading: PropTypes.String,
  }),
};

export default Suggestion;
