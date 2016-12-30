import React, { PropTypes } from 'react';

let links = [
  <a key="ho3">Home</a>,
  <a key="af3">Flood</a>,
];

const Suggestion = ({ data, handleSelect }) => {
  const { heading, mapping, results, count } = data;
  links = links.filter(a => (mapping.links ? mapping.links.includes(a.key) : null));
  return (
    <div>
      <span className="heading">{heading} <span> {count}</span></span>
      <ul>
        {
          results && results.length > 0 ? results.map((result, index) => (
            <li key={index}>
              <a onClick={handleSelect} >
                <span>{result[mapping.title]} {result[mapping.details]}</span>{links}<i className="fa fa-chevron-circle-right" />
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
