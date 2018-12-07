import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { reduxForm, Form, propTypes, getFormSyncErrors, change } from 'redux-form';
import _ from 'lodash';
import Rules from '../Form/Rules';
import * as cgActions from '../../actions/cgActions';
import * as appStateActions from '../../actions/appStateActions';
import * as errorActions from '../../actions/errorActions';
import * as serviceActions from '../../actions/serviceActions';
import * as searchActions from '../../actions/searchActions';

import Pagination from '../Common/Pagination';
import { generateField, getSearchType } from './searchUtils';

const userTasks = {
  handleSearchBarSubmit: 'search'
};

const handleInitialize = (state) => {
  const values = {
    address: '',
    pageNumber: _.get(state.search, 'state.search.pageNumber') || 1,
    totalPages: _.get(state.search, 'state.search.totalPages') || 0
  };
  return values;
};

export const changePageQuote = (props, isNext) => {
  const { fieldValues } = props;
  const workflowId = props.appState.instanceId;
  const taskName = userTasks.handleSearchBarSubmit;
  const modelName = props.appState.modelName;
  const searchType = 'quote';

  const taskData = {
    firstName: (encodeURIComponent(fieldValues.firstName) !== 'undefined' ? encodeURIComponent(fieldValues.firstName) : ''),
    lastName: (encodeURIComponent(fieldValues.lastName) !== 'undefined' ? encodeURIComponent(fieldValues.lastName) : ''),
    address: (encodeURIComponent(fieldValues.address) !== 'undefined' ? encodeURIComponent(String(fieldValues.address).trim()) : ''),
    quoteNumber: (encodeURIComponent(fieldValues.policyNumber) !== 'undefined' ? encodeURIComponent(fieldValues.policyNumber) : ''),
    quoteState: (encodeURIComponent(fieldValues.quoteState) !== 'undefined' ? encodeURIComponent(fieldValues.quoteState) : ''),
    searchType,
    hasSearched: true,
    resultStart: '60',
    pageSize: '25'
  };


  taskData.pageNumber = isNext ? String(Number(fieldValues.pageNumber) + 1) : String(Number(fieldValues.pageNumber) - 1);

  props.actions.searchActions.setQuoteSearch(taskData);
  localStorage.setItem('lastSearchData', JSON.stringify(taskData));

  props.actions.errorActions.clearAppError();
  props.actions.appStateActions.setAppState(props.appState.modelName, workflowId, { ...props.appState.data, submitting: true });

  // we need to make sure the active task is search otherwise we need to reset the workflow
  if (props.tasks[modelName].data.activeTask && (props.tasks[modelName].data.activeTask.name !== userTasks.handleSearchBarSubmit)) {
    const completeStep = {
      stepName: taskName,
      data: taskData
    };
    props.actions.cgActions.moveToTaskAndExecuteComplete(props.appState.modelName, workflowId, taskName, completeStep);
  } else {
    props.actions.appStateActions.setAppState(modelName, workflowId, { ...props.appState.data, submitting: true });
    props.actions.cgActions.completeTask(modelName, workflowId, taskName, taskData);
  }
};

export const handleSearchBarSubmit = (data, dispatch, props) => {
  const workflowId = props.appState.instanceId;
  const taskName = userTasks.handleSearchBarSubmit;
  console.log(props.authState);
  const { groups } = props.userProfile;
  const userGroup = groups[0];
  const { state, companyCode } = userGroup;

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
    pageNumber: '1'
  };

  props.actions.searchActions.setQuoteSearch(taskData);

  props.actions.searchActions.searchQuotes(taskData);


  // props.actions.appStateActions.setAppState(props.appState.modelName, workflowId, { ...props.appState.data, submitting: true });

  // we need to make sure the active task is search otherwise we need to reset the workflow
  // if (!props.tasks[props.appState.modelName].data.activeTask) {
  //   props.actions.errorActions.setAppError({ message: 'An Error has occured' });
  // } else if (props.tasks[props.appState.modelName].data.activeTask.name !== userTasks.handleSearchBarSubmit) {
  //   // const completeStep = {
  //   //   stepName: taskName,
  //   //   data: taskData
  //   // };
  //   // props.actions.cgActions.moveToTaskAndExecuteComplete(props.appState.modelName, workflowId, taskName, completeStep);
  // } else {
    // props.actions.cgActions.completeTask(props.appState.modelName, workflowId, taskName, taskData);
  // }
};

export const handleSearchBarAddressSubmit = (data, dispatch, props) => {
  props.actions.searchActions.searchAddresses(encodeURIComponent(data.address));
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

    const model = nextProps.tasks[nextProps.appState.modelName] || {};
    const previousTask = model.data && model.data.previousTask
      ? model.data.previousTask
      : {};

    const quoteSearchResponse = previousTask.value && previousTask.value.result ? previousTask.value.result : {};

    if (nextProps.searchType === 'quote' && nextProps.search.hasSearched && !_.isEqual(this.props.quoteSearchResponse, quoteSearchResponse)) {
      const totalPages = Math.ceil(quoteSearchResponse.totalNumberOfRecords / quoteSearchResponse.pageSize);
      const pageNumber = quoteSearchResponse.currentPage;
      dispatch(change('SearchBar', 'pageNumber', pageNumber));
      dispatch(change('SearchBar', 'totalPages', totalPages));
      nextProps.actions.searchActions.setQuoteSearch({ ...nextProps.search, totalPages, pageNumber });
    }
  }

  render() {
    const { handleSubmit, formErrors, searchType, fieldValues } = this.props;
    const model = this.props.tasks[this.props.appState.modelName] || {};
    const previousTask = model.data && model.data.previousTask
      ? model.data.previousTask
      : {};
    const quoteResults = previousTask.value && previousTask.value.result ? previousTask.value.result : [];

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
              disabled={this.props.appState.data.submitting || formErrors}
            >
              <i className="fa fa-search" /><span>Search</span>
            </button>
          </div>
          { quoteResults && quoteResults.quotes && quoteResults.quotes.length > 0 && fieldValues.totalPages > 1 &&
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
            disabled={(this.props.appState.data && this.props.appState.data.submitting) || formErrors || !fieldValues.address || !String(fieldValues.address).replace(/\./g, '').trim()}
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
  userProfile: state.authState.userProfile
});

const mapDispatchToProps = dispatch => ({
  actions: {
    cgActions: bindActionCreators(cgActions, dispatch),
    appStateActions: bindActionCreators(appStateActions, dispatch),
    errorActions: bindActionCreators(errorActions, dispatch),
    serviceActions: bindActionCreators(serviceActions, dispatch),
    searchActions: bindActionCreators(searchActions, dispatch)
  }
});

const searchBarForm = reduxForm({
  form: 'SearchBar',
  enableReinitialize: true,
  validate
})(SearchBar);

export default connect(mapStateToProps, mapDispatchToProps)(searchBarForm);
