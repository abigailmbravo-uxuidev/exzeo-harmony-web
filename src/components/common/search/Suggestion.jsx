import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

let links = [
  <span key="ho3">Home</span>,
  <span key="af3">Flood</span>,
];

const Suggestion = ({ data, handleSelect, showLinks }) => {
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
                <span>{result[mapping.title]} {result[mapping.details]}</span>{showLinks ? links : null}<i className="fa fa-chevron-circle-right" />
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

const mapStateToProps = state => ({
  showLinks: state.search.get('config') ? state.search.get('config').showLinks : true,
});

export default connect(mapStateToProps)(Suggestion);
