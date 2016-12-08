import React from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import SearchResults from './common/search/SearchResults';

const query = gql`
    query SearchAddress($searchText: String!) {
        searchAddress(address:$searchText) {
            id
            address1
            address2
            city
            state
            zip
        }
    }
`;

const SearchResultsWithQuery = graphql(query)(SearchResults);

const QuoteSearchResults = ({ data }) => {
    let searchText = '123 Main';
    let type = 'card';
    return (
        <div>
            <SearchResultsWithQuery searchText={searchText} type={type}/>
        </div>
    )
};

export default QuoteSearchResults;