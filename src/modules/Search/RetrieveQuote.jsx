import React from 'react';
import { Field } from 'redux-form';
import { Input, Button, Select, validation } from '@exzeo/core-ui';

const isRequired = value => {
  if (value) {
    return validation.isRequired(String(value).trim())
      ? 'Field Required'
      : undefined;
  }
  return undefined;
};

const RetrieveQuote = ({ disabledSubmit, answers, products, states }) => {
  const productAnswers = [{ answer: '', label: 'All' }, ...products];

  return (
    <React.Fragment>
      <Field
        name="firstName"
        dataTest="firstName"
        component={Input}
        styleName="first-name-search"
        placeholder="First Name Search"
        label="First Name"
        validate={validation.isValidNameFormat}
        errorHint
        autoFocus
      />
      <Field
        name="lastName"
        dataTest="lastName"
        component={Input}
        styleName="last-name-search"
        placeholder="Last Name Search"
        label="Last Name"
        validate={validation.isValidNameFormat}
        errorHint
      />
      <Field
        name="address"
        dataTest="address"
        component={Input}
        styleName="property-search"
        placeholder="Property Street Address Search"
        label="Property Street Address"
        validate={[isRequired, validation.isValidChar]}
        errorHint
      />
      <Field
        name="state"
        dataTest="state"
        label="State"
        component={Select}
        answers={states}
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
      <Field
        name="quoteNumber"
        dataTest="quoteNumber"
        component={Input}
        styleName="quote-no-search"
        placeholder="Quote No Search"
        label="Quote Number"
        validate={[isRequired, validation.isValidChar]}
        errorHint
      />

      <Button
        className={Button.constants.classNames.success}
        customClass="multi-input"
        type="submit"
        form="SearchBar"
        data-test="submit"
        disabled={disabledSubmit}
      >
        <i className="fa fa-search" />
        <span>Search</span>
      </Button>
    </React.Fragment>
  );
};

export default RetrieveQuote;
