import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import localStorage from 'localStorage';

const Results = ({ addresses, handleClick }) => (
  <ul className="results result-cards">
    {
      addresses ? addresses.map((address, index) => (
        <li id={address.id} key={index}>
          <a onClick={() => handleClick(address)} tabIndex="-1">
            <i className="card-icon fa fa-map-marker" />
            <section>
              <h4>{address.address1}</h4>
              <p>{address.city}, {address.state} {address.zip}</p>
            </section>
            <i className="fa fa-chevron-circle-right" />
          </a>
        </li>
      )) : null
    }
  </ul>
);

Results.propTypes = {
  addresses: PropTypes.Object,
  handleClick: PropTypes.func,
};

export default Results;