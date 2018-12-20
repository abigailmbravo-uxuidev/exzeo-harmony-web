
import React from 'react';
import { Field } from 'redux-form';
import ReactTooltip from 'react-tooltip';

export const getErrorToolTip = (formErrors, fieldName) => {
  const errorFieldName = `error${fieldName}`;
  return ((formErrors && formErrors[fieldName]) ? <span>
    <i className="fa fa-exclamation-circle" data-tip data-for={errorFieldName} />
    <ReactTooltip place="right" id={errorFieldName} type="error" effect="float">{formErrors[fieldName]}</ReactTooltip>
  </span> : <span />);
};

export const generateField = (name, placeholder, labelText, formErrors, formGroupCss, autoFocus) => {
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

export const getSearchType = () => {
  const path = window.location.pathname;
  switch (path) {
    case '/quote/retrieve':
      return 'quote';
    case '/quote/SearchAddress':
      return 'address';
    case '/policy':
      return 'policy';
    default:
      return 'address';
  }
};

export default {
  generateField,
  getSearchType,
  getErrorToolTip
};