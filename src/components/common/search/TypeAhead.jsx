import React, { PropTypes } from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import Suggestion from './Suggestion';

const query = gql`
  query Search($searchText: String!) {
    search(text:$searchText) {
      heading
      count
      mapping {
        title
        details
      }
      results {
        ... on Address {
          id
          address1
          zip
        }
      }
    }
  }
`;

const TypeAhead = ({ data: { search } }) => {
  console.log(search);
  return (
    <div>
      {
        search ? search.map((suggestion, index) => (
          <Suggestion key={index} suggestion={suggestion} />
        )) : null
      }
    </div>
  );
};

TypeAhead.propTypes = {
  data: PropTypes.arrayOf(PropTypes.shape({
    heading: PropTypes.string,
    mapping: PropTypes.shape({
      title: PropTypes.string,
      description: PropTypes.string,
      details: PropTypes.string,
    }),
    results: PropTypes.arrayOf(PropTypes.object),
  })),
};

export default graphql(query)(TypeAhead);
