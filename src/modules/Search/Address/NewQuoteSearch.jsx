import React from 'react';
import PropTypes from 'prop-types';
import { Field } from 'redux-form';
import { Input, Button, Select, validation } from '@exzeo/core-ui';

const { isValidChar, isRequired } = validation;

const NewQuoteSearch = ({
  submitting,
  filterTypeOptions,
  filterTypeLabel,
  filterTypeName,
  filterTypeOnChange,
  canFilter,
  groupClass
}) => (
  <React.Fragment>
    <div className={groupClass}>
      { canFilter && <Field
        name={filterTypeName}
        dataTest={filterTypeName}
        label={filterTypeLabel}
        component={Select}
        id={filterTypeName}
        validate={isRequired}
        onChange={filterTypeOnChange}
        answers={filterTypeOptions}
        showPlaceholder={false}
        errorHint />
      }
      <Field
        name="address"
        dataTest="address"
        label="Property Address"
        placeholder="Property Address Search"
        component={Input}
        styleName="property-search"
        validate={[isValidChar, isRequired]}
        errorHint />

      <Button
        baseClass="success"
        customClass="multi-input"
        type="submit"
        disabled={submitting}
        dataTest="submit" ><i className="fa fa-search" />Search
      </Button>
    </div>
  </React.Fragment>
);

NewQuoteSearch.propTypes = {
  submitting: PropTypes.bool.isRequired,
  changeSearchType: PropTypes.func,
  searchTypeOptions: PropTypes.array
};

NewQuoteSearch.defaultProps = {
  canFilter: false
};

export default NewQuoteSearch;
