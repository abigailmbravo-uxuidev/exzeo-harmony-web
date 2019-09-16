import React from 'react';
import PropTypes from 'prop-types';
import { Field } from 'redux-form';
import { Input, Button, Radio, Select, validation } from '@exzeo/core-ui';

const { isValidAddressFormat, isRequired } = validation;

const NewQuoteSearch = ({
  filterTypeOptions,
  filterTypeLabel,
  filterTypeName,
  filterTypeOnChange,
  canFilter,
  disabledSubmit
}) => (
  <React.Fragment>
    <Field
      name={filterTypeName}
      dataTest={filterTypeName}
      label={filterTypeLabel}
      component={Radio}
      id={filterTypeName}
      validate={isRequired}
      onChange={filterTypeOnChange}
      answers={filterTypeOptions}
      styleName="property-search products"
      segmented
      errorHint
    />
    <div>
      <Field
        name="address"
        dataTest="address"
        label="Property Address"
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
        Search
      </Button>
    </div>
  </React.Fragment>
);

NewQuoteSearch.propTypes = {
  changeSearchType: PropTypes.func,
  searchTypeOptions: PropTypes.array
};

NewQuoteSearch.defaultProps = {
  canFilter: false
};

export default NewQuoteSearch;
