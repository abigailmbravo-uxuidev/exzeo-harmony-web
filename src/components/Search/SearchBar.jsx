import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { reduxForm, Form, propTypes, getFormSyncErrors, change } from 'redux-form';
import _ from 'lodash';
import Rules from '../Form/Rules';

import { clearAppError } from '../../actions/errorActions';
import { searchQuotes, setQuoteSearch, searchAddresses } from '../../actions/searchActions';

import Pagination from '../Common/Pagination';
import { generateField, getSearchType } from './searchUtils';

const handleInitialize = state => ({
  address: '',
  pageNumber: _.get(state.search, 'state.search.pageNumber') || 1,
  totalPages: _.get(state.search, 'state.search.totalPages') || 0
});

export const changePageQuote = async (props, isNext) => {
  const { fieldValues } = props;
  const searchType = 'quote';

  const { agency = {} } = props.userProfile;
  const { state, companyCode } = agency;

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
  const { agency = {} } = props.userProfile;
  const { state, companyCode } = agency;

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
  const { address } = data;
  props.setQuoteSearch({ searchType: 'address', address });
  props.searchAddresses(encodeURIComponent(address));
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


export class SearchForm extends Component {
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
    const { handleSubmit, formErrors, searchType, fieldValues } = this.props;
    const { searchResults } = this.props;

    if (searchType === 'quote') {
      return (
        <Form id="SearchBar" onSubmit={handleSubmit(handleSearchBarSubmit)} noValidate>
          <div className="search-input-wrapper retrieve-quote-wrapper">
            {generateField('firstName', 'First Name Search', 'First Name', formErrors, 'first-name-search', true)}
            {generateField('lastName', 'Last Name Search', 'Last Name', formErrors, 'last-name-search', false)}
            {generateField('address', 'Property Street Address Search', 'Property Street Address', formErrors, 'property-search', false)}
            {generateField('quoteNumber', 'Quote No Search', 'Quote Number', formErrors, 'quote-no-search', false)}
            <button
              tabIndex="0"
              className="btn btn-success multi-input"
              type="submit"
              form="SearchBar"
              disabled={this.props.appState.isLoading || formErrors}
              data-test="submit"
            >
              <i className="fa fa-search" /><span>Search</span>
            </button>
          </div>
          { searchResults && searchResults.length > 0 && fieldValues.totalPages > 1 &&
            <Pagination changePageForward={() => changePageQuote(this.props, true)} changePageBack={() => changePageQuote(this.props, false)} fieldValues={fieldValues} />
          }
        </Form>
      );
    }
    return (
      <Form id="SearchBar" onSubmit={handleSubmit(handleSearchBarAddressSubmit)} noValidate>
        <div className="search-input-wrapper">
          {generateField('address', 'Search for Property Address', 'Property Address', formErrors, '', true)}
          <button
            tabIndex="0"
            className="btn btn-success multi-input"
            type="submit"
            form="SearchBar"
            disabled={this.props.appState.isLoading || formErrors || !fieldValues.address || !String(fieldValues.address).replace(/\./g, '').trim()}
            data-test="submit"
          >
            <i className="fa fa-search" /><span>Search</span>
          </button>
        </div>
      </Form>
    );
  }
}

const SearchBar = props => new SearchForm(props);

SearchBar.propTypes = {
  ...propTypes,
  handleSubmit: PropTypes.func,
  tasks: PropTypes.shape({}),
  appState: PropTypes.shape({
    modelName: PropTypes.string,
    instanceId: PropTypes.string,
    data: PropTypes.shape({
      submitting: PropTypes.boolean
    })
  })
};

SearchForm.propTypes = {
  ...propTypes
};

const mapStateToProps = state => ({
  tasks: state.cg,
  appState: state.appState,
  fieldValues: _.get(state.form, 'SearchBar.values', { address: '', sortBy: 'policyNumber' }),
  formErrors: getFormSyncErrors('SearchBar')(state),
  searchType: getSearchType(),
  initialValues: handleInitialize(state),
  policyResults: state.service.policyResults,
  search: state.search,
  userProfile: state.authState.userProfile,
  searchResults: state.search.results
});

const searchBarForm = reduxForm({
  form: 'SearchBar',
  enableReinitialize: true,
  validate
})(SearchBar);

export default connect(mapStateToProps, {
  clearAppError,
  searchQuotes,
  setQuoteSearch,
  searchAddresses
})(searchBarForm);
