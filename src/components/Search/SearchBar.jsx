import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { reduxForm, Form, Field, propTypes, getFormSyncErrors } from 'redux-form';
import ReactTooltip from 'react-tooltip';
import _ from 'lodash';
import Rules from '../Form/Rules';
import * as cgActions from '../../actions/cgActions';
import * as appStateActions from '../../actions/appStateActions';
import * as errorActions from '../../actions/errorActions';
import * as serviceActions from '../../actions/serviceActions';
import * as searchActions from '../../actions/searchActions';

const userTasks = {
  handleSearchBarSubmit: 'search'
};

export const handlePolicySearchSubmit = (data, dispatch, props) => {
  const taskData = {
    firstName: (encodeURIComponent(data.firstName) !== 'undefined' ? encodeURIComponent(data.firstName) : ''),
    lastName: (encodeURIComponent(data.lastName) !== 'undefined' ? encodeURIComponent(data.lastName) : ''),
    address: (encodeURIComponent(data.address) !== 'undefined' ? encodeURIComponent(String(data.address).trim()) : ''),
    policyNumber: (encodeURIComponent(data.policyNumber) !== 'undefined' ? encodeURIComponent(data.policyNumber) : ''),
    searchType: 'policy'
  };

  props.actions.searchActions.dispatchPolicySearch(taskData);

  props.actions.serviceActions.searchPolicy(taskData.policyNumber, taskData.firstName, taskData.lastName, taskData.address);
};

export const handleSearchBarSubmit = (data, dispatch, props) => {
  const workflowId = props.appState.instanceId;
  const taskName = userTasks.handleSearchBarSubmit;
  const taskData = {
    firstName: (encodeURIComponent(data.firstName) !== 'undefined' ? encodeURIComponent(data.firstName) : ''),
    lastName: (encodeURIComponent(data.lastName) !== 'undefined' ? encodeURIComponent(data.lastName) : ''),
    address: (encodeURIComponent(data.address) !== 'undefined' ? encodeURIComponent(String(data.address).trim()) : ''),
    quoteNumber: (encodeURIComponent(data.quoteNumber) !== 'undefined' ? encodeURIComponent(data.quoteNumber) : ''),
    zip: (encodeURIComponent(data.zip) !== 'undefined' ? encodeURIComponent(data.zip) : ''),
    searchType: props.searchType
  };

  props.actions.searchActions.dispatchQuoteSearch(taskData);

  props.actions.appStateActions.setAppState(props.appState.modelName, workflowId, { ...props.appState.data, submitting: true });

  // we need to make sure the active task is search otherwise we need to reset the workflow
  if (!props.tasks[props.appState.modelName].data.activeTask) {
    props.actions.errorActions.setAppError({ message: 'An Error has occured' });
  } else if (props.tasks[props.appState.modelName].data.activeTask.name !== userTasks.handleSearchBarSubmit) {
    const completeStep = {
      stepName: taskName,
      data: taskData
    };
    props.actions.cgActions.moveToTaskAndExecuteComplete(props.appState.modelName, workflowId, taskName, completeStep);
  } else {
    props.actions.cgActions.completeTask(props.appState.modelName, workflowId, taskName, taskData);
  }
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
    const onlyAlphaNumeric = Rules.onlyAlphaNumeric(values.lastName);
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

const setSearchType = () => {
  const path = window.location.pathname;
  switch (path) {
    case '/quote/retrieve':
      return 'quote';
    case '/quote':
      return 'address';
    case '/policy/retrieve':
      return 'policy';
    default:
      return 'address';
  }
};

const getErrorToolTip = (formErrors, fieldName) => {
  const errorFieldName = `error${fieldName}`;
  return ((formErrors && formErrors[fieldName]) ? <span>
    <i className="fa fa-exclamation-circle" data-tip data-for={errorFieldName} />
    <ReactTooltip place="right" id={errorFieldName} type="error" effect="float">{formErrors[fieldName]}</ReactTooltip>
  </span> : <span />);
};

const generateField = (name, placeholder, labelText, formErrors, formGroupCss, autoFocus) => {
  const field = (<div className={(formErrors && formErrors[name]) ? `form-group error ${formGroupCss}` : `form-group ${formGroupCss}`}>
    <label htmlFor={name}>{getErrorToolTip(formErrors, name)} {labelText}
    </label>
    <Field
      autoFocus={autoFocus}
      name={name}
      className={''}
      placeholder={placeholder}
      type="text"
      component="input"
    />
  </div>);
  return field;
};

const SearchForm = (props) => {
  const { handleSubmit, formErrors, searchType, fieldValues } = props;
  if (searchType === 'quote') {
    return (
      <Form id="SearchBar" onSubmit={handleSubmit(handleSearchBarSubmit)} noValidate>
        <div className="search-input-wrapper">
          {generateField('firstName', 'First Name Search', 'First Name', formErrors, 'first-name-search', true)}
          {generateField('lastName', 'Last Name Search', 'Last Name', formErrors, 'last-name-search', false)}
          {generateField('address', 'Property Address Search', 'Property Address', formErrors, 'property-search', false)}
          {generateField('quoteNumber', 'Quote No Search', 'Quote Number', formErrors, 'quote-no-search', false)}
          <button
            tabIndex="0"
            className="btn btn-success multi-input"
            type="submit"
            form="SearchBar"
            disabled={props.appState.data.submitting || formErrors}
          >
            <i className="fa fa-search" /><span>Search</span>
          </button>
        </div>
      </Form>
    );
  }
  if (searchType === 'policy') {
    return (
      <Form id="SearchBar" onSubmit={handleSubmit(handlePolicySearchSubmit)} noValidate>
        <div className="search-input-wrapper">
          {generateField('firstName', 'First Name Search', 'First Name', formErrors, 'first-name-search', true)}
          {generateField('lastName', 'Last Name Search', 'Last Name', formErrors, 'last-name-search', false)}
          {generateField('address', 'Property Address Search', 'Property Address', formErrors, 'property-search', false)}
          {generateField('policyNumber', 'Policy No Search', 'Policy Number', formErrors, 'quote-no-search', false)}
          <button
            tabIndex="0"
            className="btn btn-success multi-input"
            type="submit"
            form="SearchBar"
            disabled={(props.policyState && props.policyState.submitting) || formErrors}
          >
            <i className="fa fa-search" /><span>Search</span>
          </button>
        </div>
      </Form>
    );
  }

  return (
    <Form id="SearchBar" onSubmit={handleSubmit(handleSearchBarSubmit)} noValidate>
      <div className="search-input-wrapper">
        {generateField('address', 'Search for Property Address', 'Property Address', formErrors, '', true)}
        <button
          tabIndex="0"
          className="btn btn-success multi-input"
          type="submit"
          form="SearchBar"
          disabled={props.appState.data.submitting || formErrors || !String(fieldValues.address).trim()}
        >
          <i className="fa fa-search" /><span>Search</span>
        </button>
      </div>
    </Form>
  );
};

const SearchBar = props => SearchForm(props);

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
  fieldValues: _.get(state.form, 'SearchBar.values', {}),
  formErrors: getFormSyncErrors('SearchBar')(state),
  searchType: setSearchType()
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
  validate
})(SearchBar);

export default connect(mapStateToProps, mapDispatchToProps)(searchBarForm);
