import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { reduxForm, getFormSyncErrors, change } from 'redux-form';
import _ from 'lodash';

import Rules from '../Form/Rules';
import { clearAppError } from '../../state/actions/errorActions';
import { searchQuotes, setQuoteSearch, searchAddresses } from '../../state/actions/searchActions';
import Pagination from '../Common/Pagination';
import NewQuoteSearch from '../../modules/Search/Address';

import { generateField, PRODUCTS_LIST } from './searchUtils';
import QuoteSearch from '../../modules/Search/RetrieveQuote';

const handleInitialize = state => ({
  product: 'HO3',
  address: '',
  pageNumber: _.get(state.search, 'state.search.pageNumber') || 1,
  totalPages: _.get(state.search, 'state.search.totalPages') || 0
});

export const changePageQuote = async (props, isNext) => {
  const { fieldValues } = props;
  const searchType = 'quote';
  const { state, companyCode } = props.userProfile.entity;

  const taskData = {
    state,
    companyCode,
    firstName: (encodeURIComponent(fieldValues.firstName) !== 'undefined' ? encodeURIComponent(fieldValues.firstName) : ''),
    lastName: (encodeURIComponent(fieldValues.lastName) !== 'undefined' ? encodeURIComponent(fieldValues.lastName) : ''),
    address: (encodeURIComponent(fieldValues.address) !== 'undefined' ? encodeURIComponent(String(fieldValues.address).trim()) : ''),
    quoteNumber: (encodeURIComponent(fieldValues.policyNumber) !== 'undefined' ? encodeURIComponent(fieldValues.policyNumber) : ''),
    quoteState: (encodeURIComponent(fieldValues.quoteState) !== 'undefined' ? encodeURIComponent(fieldValues.quoteState) : ''),
    searchType,
    hasSearched: true,
    resultStart: '60',
    pageSize: '25',
    sort: 'quoteNumber',
    sortDirection: 'desc'
  };


  taskData.pageNumber = isNext ? String(Number(fieldValues.pageNumber) + 1) : String(Number(fieldValues.pageNumber) - 1);

  props.setQuoteSearch(taskData);
  localStorage.setItem('lastSearchData', JSON.stringify(taskData));
  props.clearAppError();
  await props.searchQuotes(taskData);
};

export const handleSearchBarSubmit = async (data, dispatch, props) => {
  const { state, companyCode } = props.userProfile.entity;

  const taskData = {
    state,
    companyCode,
    firstName: (encodeURIComponent(data.firstName) !== 'undefined' ? encodeURIComponent(data.firstName) : ''),
    lastName: (encodeURIComponent(data.lastName) !== 'undefined' ? encodeURIComponent(data.lastName) : ''),
    address: (encodeURIComponent(data.address) !== 'undefined' ? encodeURIComponent(String(data.address).replace(/\./g, '').trim()) : ''),
    quoteNumber: (encodeURIComponent(data.quoteNumber) !== 'undefined' ? encodeURIComponent(data.quoteNumber) : ''),
    zip: (encodeURIComponent(data.zip) !== 'undefined' ? encodeURIComponent(data.zip) : ''),
    searchType: props.searchType,
    hasSearched: true,
    pageNumber: '1',
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
  props.searchAddresses(encodeURIComponent(address), product, state, companyCode);
};

export const validate = (values) => {
  const errors = {};
  if (values.firstName) {
    const onlyAlphaNumeric = Rules.onlyAlphaNumeric(values.firstName);
    if (onlyAlphaNumeric) {
      errors.firstName = onlyAlphaNumeric;
    }
  }

  if (values.lastName) {
    const lastNameVal = values.lastName.trim() ? values.lastName.replace(/ /g, '') : values.lastName;
    const onlyAlphaNumeric = Rules.onlyAlphaNumeric(lastNameVal);
    if (onlyAlphaNumeric) {
      errors.lastName = onlyAlphaNumeric;
    }
  }

  if (values.quoteNumber) {
    const numberDashesOnly = Rules.numberDashesOnly(values.quoteNumber);
    if (numberDashesOnly) {
      errors.quoteNumber = numberDashesOnly;
    }
  }

  if (values.zip) {
    const onlyAlphaNumeric = Rules.onlyAlphaNumeric(values.zip);
    if (onlyAlphaNumeric) {
      errors.zip = onlyAlphaNumeric;
    }
  }
  if (values.address) {
    const required = Rules.required(String(values.address).trim());
    const invalidCharacters = Rules.invalidCharacters(values.address);
    if (required) {
      errors.address = required;
    } else if (invalidCharacters) {
      errors.address = invalidCharacters;
    }
  }

  return errors;
};

export class SearchBar extends Component {
  componentWillReceiveProps(nextProps) {
    const { dispatch } = nextProps;
    const { totalRecords, pageSize, currentPage } = nextProps.search;

    if (nextProps.searchType === 'quote' && nextProps.search.hasSearched && !_.isEqual(this.props.searchResults, nextProps.searchResults)) {
      const totalPages = Math.ceil(totalRecords / pageSize); // Math.ceil(quoteSearchResponse.totalNumberOfRecords / quoteSearchResponse.pageSize);
      const pageNumber = currentPage; // quoteSearchResponse.currentPage;
      dispatch(change('SearchBar', 'pageNumber', pageNumber));
      dispatch(change('SearchBar', 'totalPages', totalPages));
      nextProps.setQuoteSearch({ ...nextProps.search, totalPages, pageNumber });
    }
  }

  render() {
    const { handleSubmit, formErrors, searchType, fieldValues, searchResults, userProfile : { appMetadata: { beta }} } = this.props;

    if (searchType === 'quote') {
      return (
        <form id="SearchBar" onSubmit={handleSubmit(handleSearchBarSubmit)} >
          <div className="search-input-wrapper retrieve-quote-wrapper">
            <QuoteSearch disabledSubmit={this.props.appState.isLoading} />
          </div>
          { searchResults && searchResults.length > 0 && fieldValues.totalPages > 1 &&
            <Pagination changePageForward={() => changePageQuote(this.props, true)} changePageBack={() => changePageQuote(this.props, false)} fieldValues={fieldValues} />
          }
        </form>
      );
    }
    return (
      <form id="SearchBar" onSubmit={handleSubmit(handleSearchBarAddressSubmit)} >
        { /* TODO: Put this in core-ui to and make reusable for CSR */ }
        <NewQuoteSearch
          canFilter={beta}
          filterTypeName="product"
          filterTypeOptions={PRODUCTS_LIST}
          filterTypeLabel="Select Product"
          groupClass="search-input-wrapper"
          disabledSubmit={this.props.appState.isLoading || !fieldValues.address || !String(fieldValues.address).replace(/\./g, '').trim()}
        />
      </form>
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
  fieldValues: _.get(state.form, 'SearchBar.values', { address: '', sortBy: 'policyNumber' }),
  formErrors: getFormSyncErrors('SearchBar')(state),
  initialValues: handleInitialize(state),
  policyResults: state.service.policyResults,
  search: state.search,
  userProfile: state.authState.userProfile,
  searchResults: state.search.results
});

export default connect(mapStateToProps, {
  clearAppError,
  searchQuotes,
  setQuoteSearch,
  searchAddresses
})(reduxForm({
  form: 'SearchBar',
  enableReinitialize: true,
  validate
})(SearchBar));
