import React from 'react';

const NoResults = ({ header, children }) => {
  return (
    <div className="survey-wrapper" data-test="no-results">
      <div className="card no-results">
        <div className="card-header">{header}</div>
        <div className="card-block">{children}</div>
      </div>
    </div>
  );
};

export default NoResults;
