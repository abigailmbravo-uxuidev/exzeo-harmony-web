import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { reduxForm, Form, Field, propTypes, getFormSyncErrors, change } from 'redux-form';
import ReactTooltip from 'react-tooltip';
import _ from 'lodash';
import Rules from '../Form/Rules';
import * as cgActions from '../../actions/cgActions';
import * as appStateActions from '../../actions/appStateActions';
import * as errorActions from '../../actions/errorActions';
import * as serviceActions from '../../actions/serviceActions';
import * as searchActions from '../../actions/searchActions';
import SelectField from '../Form/inputs/SelectField';
import TextField from '../Form/inputs/TextField';

const userTasks = {
  handleSearchBarSubmit: 'search'
};

const handleInitialize = (state) => {
  const values = {
    address: '',
    sortBy: 'policyNumber',
    pageNumber: _.get(state.search, 'state.search.pageNumber') || 1,
    totalPages: _.get(state.search, 'state.search.totalPages') || 0
  };
  return values;
};


export const resetSearch = (props) => {
  props.actions.serviceActions.clearPolicyResults();
};

export const changePage = (props, isNext) => {
  const { fieldValues } = props;

  const taskData = {
    firstName: (encodeURIComponent(fieldValues.firstName) !== 'undefined' ? encodeURIComponent(fieldValues.firstName) : ''),
    lastName: (encodeURIComponent(fieldValues.lastName) !== 'undefined' ? encodeURIComponent(fieldValues.lastName) : ''),
    address: (encodeURIComponent(fieldValues.address) !== 'undefined' ? encodeURIComponent(String(fieldValues.address).trim()) : ''),
    policyNumber: (encodeURIComponent(fieldValues.policyNumber) !== 'undefined' ? encodeURIComponent(fieldValues.policyNumber) : ''),
    searchType: 'policy',
    isLoading: true,
    hasSearched: true
  };


  taskData.pageNumber = isNext ? Number(fieldValues.pageNumber) + 1 : Number(fieldValues.pageNumber) - 1;

  props.actions.searchActions.setPolicySearch(taskData);


  props.actions.serviceActions.searchPolicy(taskData.policyNumber, taskData.firstName, taskData.lastName, taskData.address, taskData.pageNumber, 25, fieldValues.sortBy).then(() => {
    taskData.isLoading = false;
    props.actions.searchActions.setPolicySearch(taskData);
  });
};

export const handlePolicySearchSubmit = (data, dispatch, props) => {
  const taskData = {
    firstName: (encodeURIComponent(data.firstName) !== 'undefined' ? encodeURIComponent(data.firstName) : ''),
    lastName: (encodeURIComponent(data.lastName) !== 'undefined' ? encodeURIComponent(data.lastName) : ''),
    address: (encodeURIComponent(data.address) !== 'undefined' ? encodeURIComponent(String(data.address).trim()) : ''),
    policyNumber: (encodeURIComponent(data.policyNumber) !== 'undefined' ? encodeURIComponent(data.policyNumber) : ''),
    searchType: 'policy',
    isLoading: true,
    hasSearched: true,
    page: 1
  };

  props.actions.searchActions.setPolicySearch(taskData);

  props.actions.serviceActions.searchPolicy(taskData.policyNumber, taskData.firstName, taskData.lastName, taskData.address, taskData.page, 25, data.sortBy).then(() => {
    taskData.isLoading = false;
    props.actions.searchActions.setPolicySearch(taskData);
  });
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

  props.actions.searchActions.setQuoteSearch(taskData);

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

const getSearchType = () => {
  const path = window.location.pathname;
  switch (path) {
    case '/quote/retrieve':
      return 'quote';
    case '/quote':
      return 'address';
    case '/policy':
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

export class SearchForm extends Component {

  componentWillReceiveProps(nextProps) {
    const { dispatch } = nextProps;

    if (!_.isEqual(this.props.policyResults, nextProps.policyResults)) {
      const totalPages = Math.ceil(nextProps.policyResults.totalNumberOfRecords / nextProps.policyResults.pageSize);
      const pageNumber = nextProps.policyResults.currentPage;
      dispatch(change('SearchBar', 'pageNumber', pageNumber));
      dispatch(change('SearchBar', 'totalPages', totalPages));
      nextProps.actions.searchActions.setPolicySearch({ ...nextProps.search, totalPages, pageNumber });
    }
  }

  render() {
    const { handleSubmit, formErrors, searchType, fieldValues } = this.props;
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
              disabled={this.props.appState.data.submitting || formErrors}
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
          <div className="search-input-wrapper search-policy-wrapper">

            <SelectField
              name="sortBy" component="select" styleName={'search-context'} label="Sort By" validations={['required']}
              onChange={() => resetSearch(this.props)}
              answers={[
                {
                  answer: 'policyNumber',
                  label: 'Policy Number'
                },
                {
                  answer: 'firstName',
                  label: 'First Name'
                },
                {
                  answer: 'lastName',
                  label: 'Last Name'
                }
              ]}
            />

            {generateField('firstName', 'First Name Search', 'First Name', formErrors, 'first-name-search', true)}
            {generateField('lastName', 'Last Name Search', 'Last Name', formErrors, 'last-name-search', false)}
            {generateField('address', 'Property Address Search', 'Property Address', formErrors, 'property-search', false)}
            {generateField('policyNumber', 'Policy No Search', 'Policy Number', formErrors, 'policy-no-search', false)}
            <button
              tabIndex="0"
              className="btn btn-success multi-input"
              type="submit"
              form="SearchBar"
              disabled={(this.props.policyState && this.props.policyState.submitting) || formErrors}
            >
              <i className="fa fa-search" /><span>Search</span>
            </button>
          </div>
          { this.props.policyResults && this.props.policyResults.policies && this.props.policyResults.policies.length > 0 && <div className="pagination-wrapper">
            <button
              onClick={() => changePage(this.props, false)}
              disabled={String(fieldValues.pageNumber) === '1'}
              tabIndex="0"
              className="btn multi-input"
              type="button"
              form="SearchBar"
            >
              <span className="fa fa-chevron-circle-left" />
            </button>
            <div className="pagination-count">
              <TextField size="2" name={'pageNumber'} label={'Page'} readOnly />
              <span className="pagination-operand">of</span>
              <TextField size="2" name={'totalPages'} label={''} readOnly />
            </div>
            <button
              onClick={() => changePage(this.props, true)}
              disabled={String(fieldValues.pageNumber) === String(fieldValues.totalPages)}
              tabIndex="0"
              className="btn multi-input"
              type="button"
              form="SearchBar"
            >
              <span className="fa fa-chevron-circle-right" />
            </button>
          </div>
          }
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
            disabled={this.props.appState.data.submitting || formErrors || !fieldValues.address || !String(fieldValues.address).trim()}
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
  search: state.search
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
