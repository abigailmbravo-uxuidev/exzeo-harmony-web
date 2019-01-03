import React from 'react';
// import PropTypes from 'prop-types';

const FancyExternalLink = ({ url, title, description }) => (
  <li>
    <h5><a href={url} target="_blank" rel="noopener noreferrer">{title}</a></h5>
    <p>{description}</p>
  </li>
);

export default FancyExternalLink;
