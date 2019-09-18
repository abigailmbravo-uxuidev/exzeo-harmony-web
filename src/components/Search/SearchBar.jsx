import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { reduxForm, change } from 'redux-form';
import _get from 'lodash/get';
import _isEqual from 'lodash/isEqual';

import { clearAppError } from '../../state/actions/errorActions';
import {
  searchQuotes,
  setQuoteSearch,
  searchAddresses
} from '../../state/actions/searchActions';
import Pagination from './Pagination';
import NewQuoteSearch from '../../modules/Search/Address';

import QuoteSearch from '../../modules/Search/RetrieveQuote';

const handleInitialize = state => ({
  address: '',
  pageNumber: _get(state.search, 'state.search.pageNumber') || 1,
  totalPages: _get(state.search, 'state.search.totalPages') || 0
});

export const changePageQuote = async (props, isNext) => {
  const { fieldValues } = props;
  const searchType = 'quote';
  const { state, companyCode } = props.userProfile.entity;

  const taskData = {
    ...fieldValues,
    state,
    companyCode,
    searchType,
    hasSearched: true,
    resultStart: '60',
    pageSize: '25',
    sort: 'quoteNumber',
    sortDirection: 'desc'
  };

  taskData.page = isNext
    ? String(Number(fieldValues.pageNumber) + 1)
    : String(Number(fieldValues.pageNumber) - 1);

  props.setQuoteSearch(taskData);
  localStorage.setItem('lastSearchData', JSON.stringify(taskData));
  props.clearAppError();
  await props.searchQuotes(taskData);
};

export const handleSearchBarSubmit = async (data, dispatch, props) => {
  const { state, companyCode } = props.userProfile.entity;

  const taskData = {
    ...data,
    state,
    companyCode,
    propertyAddress:
      data.address && data.address !== 'undefined'
        ? String(data.address)
            .replace(/\./g, '')
            .trim()
        : '',
    searchType: props.searchType,
    hasSearched: true,
    page: '1',
    pageSize: '25',
    sort: 'quoteNumber',
    sortDirection: 'desc'
  };

  await props.searchQuotes(taskData);
  props.setQuoteSearch(taskData);
};

export const handleSearchBarAddressSubmit = (data, dispatch, props) => {
  const { state, companyCode } = props.userProfile.entity;
  const { address, product } = data;
  props.setQuoteSearch({ searchType: 'address', address, product });
  props.searchAddresses(
    encodeURIComponent(address),
    product,
    state,
    companyCode
  );
};

export class SearchBar extends Component {
  componentDidUpdate(prevProps) {
    const {
      dispatch,
      searchType,
      searchResults,
      search,
      setQuoteSearch
    } = this.props;
    const {
      totalRecords,
      pageSize,
      currentPage,
      hasSearched
    } = this.props.search;

    if (
      searchType === 'quote' &&
      hasSearched &&
      !_isEqual(prevProps.searchResults, searchResults)
    ) {
      const totalPages = Math.ceil(totalRecords / pageSize); // Math.ceil(quoteSearchResponse.totalNumberOfRecords / quoteSearchResponse.pageSize);
      const pageNumber = currentPage; // quoteSearchResponse.currentPage;
      dispatch(change('SearchBar', 'pageNumber', pageNumber));
      dispatch(change('SearchBar', 'totalPages', totalPages));
      setQuoteSearch({ ...search, totalPages, pageNumber });
    }
  }

  render() {
    const {
      agency,
      handleSubmit,
      searchType,
      fieldValues,
      searchResults
    } = this.props;
    const status = agency && agency.status ? agency.status : null;
    const canQuote = status === 'Active' || status === 'Pending';

    // Only Active agencies can start new quote
    if (searchType === 'address' && status === 'Active') {
      return (
        <form
          id="SearchBar"
          onSubmit={handleSubmit(handleSearchBarAddressSubmit)}
        >
          <div className="search-input-wrapper search-new-quote-wrapper">
            <NewQuoteSearch
              filterTypeName="product"
              answers={(agency && agency.cspAnswers) || {}}
              filterTypeLabel="Select Product"
              disabledSubmit={
                this.props.appState.isLoading ||
                !fieldValues.address ||
                !String(fieldValues.address)
                  .replace(/\./g, '')
                  .trim()
              }
            />
          </div>
        </form>
      );
    }
    // Only Active and Pending agencies can retrieve quotes
    if (searchType === 'quote' && canQuote) {
      return (
        <form id="SearchBar" onSubmit={handleSubmit(handleSearchBarSubmit)}>
          <div className="search-input-wrapper retrieve-quote-wrapper">
            <QuoteSearch
              disabledSubmit={this.props.appState.isLoading}
              answers={(agency && agency.cspAnswers) || {}}
            />
          </div>
          {(searchResults || []).length > 0 && fieldValues.totalPages > 1 && (
            <Pagination
              changePageForward={() => changePageQuote(this.props, true)}
              changePageBack={() => changePageQuote(this.props, false)}
              fieldValues={fieldValues}
            />
          )}
        </form>
      );
    }
    // All others are not allowed
    return (
      <div className="disabled-message">
        <h3>Permission Denied</h3>
        <p>this agency is no longer allowed to retrieve quotes</p>
      </div>
    );
  }
}

SearchBar.propTypes = {
  handleSubmit: PropTypes.func,
  appState: PropTypes.shape({
    modelName: PropTypes.string,
    instanceId: PropTypes.string,
    data: PropTypes.shape({
      submitting: PropTypes.bool
    })
  })
};

const mapStateToProps = state => ({
  appState: state.appState,
  fieldValues: _get(state.form, 'SearchBar.values', {
    address: '',
    sortBy: 'policyNumber'
  }),
  initialValues: handleInitialize(state),
  policyResults: state.service.policyResults,
  search: state.search,
  userProfile: state.authState.userProfile,
  searchResults: state.search.results,
  agency: state.agencyState.agency
});

export default connect(
  mapStateToProps,
  {
    clearAppError,
    searchQuotes,
    setQuoteSearch,
    searchAddresses
  }
)(
  reduxForm({
    form: 'SearchBar',
    enableReinitialize: true
  })(SearchBar)
);
