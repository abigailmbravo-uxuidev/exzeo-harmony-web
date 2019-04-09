import React from 'react';
import PropTypes from 'prop-types';
import { Field } from 'redux-form';
import { Input, Button, Select, validation } from '@exzeo/core-ui';

const { isValidChar, isRequired } = validation;

const NewQuoteSearch = ({
  filterTypeOptions,
  filterTypeLabel,
  filterTypeName,
  filterTypeOnChange,
  canFilter,
  groupClass,
  disabledSubmit
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
        styleName="property-search"
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
        customClass="multi-input"
        type="submit"
        disabled={disabledSubmit}
        dataTest="submit" >
        <i className="fa fa-search" />Search
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
