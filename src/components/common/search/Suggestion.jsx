import React, { PropTypes } from 'react';

const Suggestion = ({ data, handleSelect }) => {

  const { heading, mapping, results, count } = data;

  return (
    <div>
      <span className="heading">{heading} <span> {count}</span></span>

      <ul>
        {
          results && results.length > 0 ? results.map((result, index) => (
            <li key={index}>
                <a onClick={handleSelect} >
                    <span>{result[mapping.title]} {result[mapping.details]}</span><i className="fa fa-chevron-circle-right"></i>
                </a>
            </li>
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
