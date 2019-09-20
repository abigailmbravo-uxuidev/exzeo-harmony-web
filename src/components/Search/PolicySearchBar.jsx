import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {
  reduxForm,
  Field,
  Form,
  propTypes,
  getFormSyncErrors,
  change
} from 'redux-form';
import _get from 'lodash/get';
import _isEqual from 'lodash/isEqual';
import { Input, Button, Select, validation } from '@exzeo/core-ui';

import Rules from '../Form/Rules';
import * as appStateActions from '../../state/actions/appStateActions';
import * as errorActions from '../../state/actions/errorActions';
import * as serviceActions from '../../state/actions/serviceActions';
import * as searchActions from '../../state/actions/searchActions';
import SelectField from '../Form/inputs/SelectField';
import Pagination from './Pagination';
import { generateField } from './searchUtils';

const handleInitialize = () => {
  return {
    sortBy: 'policyNumber',
    pageNumber: 1,
    totalPages: 1
  };
};

export const changePagePolicy = (props, isNext) => {
  const { fieldValues } = props;
  const { state, companyCode } = props.userProfile.entity;
  const sortDirection = fieldValues.sortBy === 'policyNumber' ? 'desc' : 'asc';

  const taskData = {
    ...props,
    propertyAddress:
      fieldValues.address && fieldValues.address !== 'undefined'
        ? String(fieldValues.address)
            .replace(/\./g, '')
            .trim()
        : '',
    searchType: 'policy',
    isLoading: true,
    hasSearched: true,
    page: isNext
      ? Number(fieldValues.pageNumber) + 1
      : Number(fieldValues.pageNumber) - 1,
    pageSize: 25,
    sort: fieldValues.sortBy,
    sortDirection
  };
  props.actions.searchActions.setPolicySearch(taskData);

  // TODO pass in object
  props.actions.serviceActions.searchPolicy(taskData).then(() => {
    taskData.isLoading = false;
    taskData.address = decodeURIComponent(taskData.address);
    props.actions.searchActions.setPolicySearch(taskData);
  });
};

export const handlePolicySearchSubmit = (data, dispatch, props) => {
  const { companyCode } = props.userProfile.entity;
  const sortDirection = data.sortBy === 'policyNumber' ? 'desc' : 'asc';

  const taskData = {
    ...data,
    propertyAddress:
      data.address && data.address !== 'undefined'
        ? String(data.address)
            .replace(/\./g, '')
            .trim()
        : '',
    searchType: 'policy',
    isLoading: true,
    hasSearched: true,
    page: 1,
    pageSize: 25,
    sort: data.sortBy,
    sortDirection,
    companyCode
  };

  props.actions.searchActions.setPolicySearch(taskData);

  props.actions.serviceActions.searchPolicy(taskData).then(() => {
    taskData.isLoading = false;
    taskData.address = decodeURIComponent(taskData.address);
    props.actions.searchActions.setPolicySearch(taskData);
  });
};

export const validate = values => {
  const errors = {};
  if (values.firstName) {
    const onlyAlphaNumeric = Rules.onlyAlphaNumeric(values.firstName);
    if (onlyAlphaNumeric) {
      errors.firstName = onlyAlphaNumeric;
    }
  }

  if (values.lastName) {
    const lastNameVal = values.lastName.trim()
      ? values.lastName.replace(/ /g, '')
      : values.lastName;
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
  componentWillReceiveProps(nextProps) {
    const { dispatch } = nextProps;
    if (!_isEqual(this.props.policyResults, nextProps.policyResults)) {
      const totalPages = Math.ceil(
        nextProps.policyResults.totalNumberOfRecords /
          nextProps.policyResults.pageSize
      );
      const pageNumber = nextProps.policyResults.currentPage;
      dispatch(change('PolicySearchBar', 'pageNumber', pageNumber));
      dispatch(change('PolicySearchBar', 'totalPages', totalPages));
      nextProps.actions.searchActions.setPolicySearch({
        ...nextProps.search,
        totalPages,
        pageNumber
      });
    }
  }

  render() {
    const { answers, handleSubmit, formErrors, fieldValues } = this.props;
    const productAnswers = answers.products
      ? [{ answer: '', label: 'All' }, ...answers.products]
      : [];

    return (
      <Form
        id="PolicySearchBar"
        onSubmit={handleSubmit(handlePolicySearchSubmit)}
      >
        <div className="search-input-wrapper search-policy-wrapper">
          <SelectField
            name="sortBy"
            component="select"
            styleName={'search-context'}
            label="Sort By"
            validations={['required']}
            onChange={() =>
              this.props.actions.serviceActions.clearPolicyResults()
            }
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

          {generateField(
            'firstName',
            'First Name Search',
            'First Name',
            formErrors,
            'first-name-search',
            true
          )}
          {generateField(
            'lastName',
            'Last Name Search',
            'Last Name',
            formErrors,
            'last-name-search',
            false
          )}
          {generateField(
            'address',
            'Property Street Address Search',
            'Property Street Address',
            formErrors,
            'property-search',
            false
          )}
          <Field
            name="state"
            dataTest="state"
            label="State"
            component={Select}
            answers={answers.states}
            showPlaceholder={false}
            styleName="state-search"
          />
          <Field
            name="product"
            dataTest="product"
            label="Product"
            component={Select}
            answers={productAnswers}
            showPlaceholder={false}
            styleName="product-search"
          />
          {generateField(
            'policyNumber',
            'Policy No Search',
            'Policy Number',
            formErrors,
            'policy-no-search',
            false
          )}
          <button
            tabIndex="0"
            className="btn btn-success multi-input"
            type="submit"
            form="PolicySearchBar"
            disabled={
              (this.props.policyState && this.props.policyState.submitting) ||
              formErrors
            }
          >
            <i className="fa fa-search" />
            <span>Search</span>
          </button>
        </div>
        {this.props.policyResults &&
          this.props.policyResults.policies &&
          this.props.policyResults.policies.length > 0 && (
            <Pagination
              changePageForward={() => changePagePolicy(this.props, true)}
              changePageBack={() => changePagePolicy(this.props, false)}
              fieldValues={fieldValues}
            />
          )}
      </Form>
    );
  }
}

PolicySearchBar.propTypes = {
  ...propTypes,
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
  fieldValues: _get(state.form, 'PolicySearchBar.values', {
    address: '',
    sortBy: 'policyNumber'
  }),
  formErrors: getFormSyncErrors('PolicySearchBar')(state),
  initialValues: handleInitialize(state),
  policyResults: state.service.policyResults,
  search: state.search,
  userProfile: state.authState.userProfile
});

const mapDispatchToProps = dispatch => ({
  actions: {
    appStateActions: bindActionCreators(appStateActions, dispatch),
    errorActions: bindActionCreators(errorActions, dispatch),
    serviceActions: bindActionCreators(serviceActions, dispatch),
    searchActions: bindActionCreators(searchActions, dispatch)
  }
});

const searchBarForm = reduxForm({
  form: 'PolicySearchBar',
  validate
})(PolicySearchBar);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(searchBarForm);
