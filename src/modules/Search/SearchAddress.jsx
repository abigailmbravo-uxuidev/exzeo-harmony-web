import React from 'react';
import PropTypes from 'prop-types';
import { Field } from 'redux-form';
import { Input, Button, Select, validation } from '@exzeo/core-ui';

const { isValidAddressFormat, isRequired } = validation;

const SearchAddress = ({ products, states, disabledSubmit }) => (
  <React.Fragment>
    <Field
      name="product"
      dataTest="product"
      label="Select Product"
      component={Select}
      id="product"
      validate={isRequired}
      answers={products}
      styleName="property-search products"
      segmented
      errorHint
    />
    <Field
      name="state"
      dataTest="state"
      label="Select State"
      component={Select}
      id="state"
      validate={isRequired}
      answers={states}
      styleName="property-search products"
      segmented
      errorHint
    />
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

SearchAddress.defaultProps = {
  products: [],
  states: []
};

export default SearchAddress;
