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
import SelectField from '../Form/inputs/SelectField';
import Pagination from '../Common/Pagination';
import { generateField } from './searchUtils';

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

export const changePagePolicy = (props, isNext) => {
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

  const direction = fieldValues.sortBy === 'policyNumber' ? 'desc' : 'asc';

  props.actions.serviceActions.searchPolicy(taskData.policyNumber, taskData.firstName, taskData.lastName, taskData.address, taskData.pageNumber, 25, fieldValues.sortBy, direction).then(() => {
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

  const direction = data.sortBy === 'policyNumber' ? 'desc' : 'asc';

  props.actions.serviceActions.searchPolicy(taskData.policyNumber, taskData.firstName, taskData.lastName, taskData.address, taskData.page, 25, data.sortBy, direction).then(() => {
    taskData.isLoading = false;
    props.actions.searchActions.setPolicySearch(taskData);
  });
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

export class PolicySearchBar extends Component {

  componentDidMount() {
    this.props.actions.serviceActions.clearPolicyResults();
  }

  componentWillReceiveProps(nextProps) {
    const { dispatch } = nextProps;
    if (!_.isEqual(this.props.policyResults, nextProps.policyResults)) {
      const totalPages = Math.ceil(nextProps.policyResults.totalNumberOfRecords / nextProps.policyResults.pageSize);
      const pageNumber = nextProps.policyResults.currentPage;
      dispatch(change('PolicySearchBar', 'pageNumber', pageNumber));
      dispatch(change('PolicySearchBar', 'totalPages', totalPages));
      nextProps.actions.searchActions.setPolicySearch({ ...nextProps.search, totalPages, pageNumber });
    }
  }

  render() {
    const { handleSubmit, formErrors, fieldValues } = this.props;
    return (
      <Form id="PolicySearchBar" onSubmit={handleSubmit(handlePolicySearchSubmit)} noValidate>
        <div className="search-input-wrapper search-policy-wrapper">

          <SelectField
            name="sortBy" component="select" styleName={'search-context'} label="Sort By" validations={['required']}
            onChange={() => this.props.actions.serviceActions.clearPolicyResults()}
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
          {generateField('address', 'Property Search Address Search', 'Property Search Address', formErrors, 'property-search', false)}
          {generateField('policyNumber', 'Policy No Search', 'Policy Number', formErrors, 'policy-no-search', false)}
          <button
            tabIndex="0"
            className="btn btn-success multi-input"
            type="submit"
            form="PolicySearchBar"
            disabled={(this.props.policyState && this.props.policyState.submitting) || formErrors}
          >
            <i className="fa fa-search" /><span>Search</span>
          </button>
        </div>
        { this.props.policyResults && this.props.policyResults.policies && this.props.policyResults.policies.length > 0 &&
        <Pagination changePageForward={() => changePagePolicy(this.props, true)} changePageBack={() => changePagePolicy(this.props, false)} fieldValues={fieldValues} />
          }
      </Form>
    );
  }
}

PolicySearchBar.propTypes = {
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

const mapStateToProps = state => ({
  tasks: state.cg,
  appState: state.appState,
  fieldValues: _.get(state.form, 'PolicySearchBar.values', { address: '', sortBy: 'policyNumber' }),
  formErrors: getFormSyncErrors('PolicySearchBar')(state),
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
  form: 'PolicySearchBar',
  enableReinitialize: true,
  validate
})(PolicySearchBar);

export default connect(mapStateToProps, mapDispatchToProps)(searchBarForm);
