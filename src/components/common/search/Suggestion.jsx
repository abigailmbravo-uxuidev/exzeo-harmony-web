import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';

// let links = [
//   <span key="ho3">Home</span>,
//   <span key="af3">Flood</span>,
// ];

const Links = ({ details, clearSearch }) => {
  console.log('LINKS HERE:', details);
  return (
    <div className="type-ahead-links">
      <Link className="home-link btn btn-secondary" onClick={(event) => { event.stopPropagation(); clearSearch() }} to={{ pathname: '/workflow', query: { address: details.address1 } }}>H03 Quote</Link>
      <a className="flood-link btn btn-secondary" onClick={(event) => { event.stopPropagation(); }} href={`https://www.typtap.com/flood/?addr=${details.address1} ${details.zip}`} rel="noopener noreferrer" target="_blank" key="ho3">Flood Quote</a>
    </div>
  );
};

const Suggestion = ({ data, handleSelect, showLinks, clearSearch }) => {
  const { heading, mapping, results, count } = data;
  return (
    <div>
      <span className="heading">{heading} <span> {count}</span></span>
      <ul>
        {
          results && results.length > 0 ? results.map((result, index) => (
            <li key={index}>
              <a onClick={handleSelect}>
                <span>{result[mapping.title]} {result[mapping.details]}</span>
                <div className="workflow-links">{showLinks ? <Links details={result} clearSearch={clearSearch} /> : null}</div>
                <i className="fa fa-chevron-circle-right" />
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
    handleSelect: PropTypes.func,
  }),
};

const mapStateToProps = state => ({
  showLinks: state.search.get('config') ? state.search.get('config').showLinks : true,
});

export default connect(mapStateToProps)(Suggestion);
