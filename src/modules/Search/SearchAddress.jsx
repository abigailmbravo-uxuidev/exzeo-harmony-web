import React from 'react';
import PropTypes from 'prop-types';
import { Field } from 'redux-form';
import { Input, Button, Select, validation } from '@exzeo/core-ui';

const { isValidAddressFormat, isRequired } = validation;

const SearchAddress = ({ answers, stateAnswers, disabledSubmit }) => (
  <React.Fragment>
    <Field
      name="product"
      dataTest="product"
      label="Select Product"
      component={Select}
      id="product"
      validate={isRequired}
      answers={answers.products}
      styleName="property-search products"
      segmented
      errorHint
    />
    {stateAnswers && stateAnswers.length ? (
      <Field
        name="state"
        dataTest="state"
        label="Select State"
        component={Select}
        id="state"
        validate={isRequired}
        answers={stateAnswers}
        styleName="property-search products"
        segmented
        errorHint
      />
    ) : null}
    <div className="property-search-wrappper">
      <Field
        name="address"
        dataTest="address"
        label="Property Street Address"
        placeholder="Search for Property Address"
        component={Input}
        styleName="property-search"
        validate={[isValidAddressFormat, isRequired]}
        errorHint
      />

      <Button
        customClass="multi-input"
        type="submit"
        disabled={disabledSubmit}
        dataTest="submit"
      >
        <i className="fa fa-search" />
        <span>Search</span>
      </Button>
    </div>
  </React.Fragment>
);

SearchAddress.propTypes = {
  changeSearchType: PropTypes.func,
  searchTypeOptions: PropTypes.array
};

SearchAddress.defaultProps = {
  canFilter: false
};

export default SearchAddress;
