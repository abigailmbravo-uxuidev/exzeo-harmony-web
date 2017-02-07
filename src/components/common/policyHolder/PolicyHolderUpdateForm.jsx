import React, { PropTypes } from 'react';
// import _ from 'lodash';
import { connect } from 'react-redux';
import { reduxForm, Form, formValueSelector, FieldArray } from 'redux-form';
import Footer from '../Footer';
import PolicyHolder from './PolicyHolder';

const renderPolicyHolder = ({ fieldState, fields, formName, InterestType, InterestTypeName, handleChange, meta: { touched, error } }) => (
  <div>
    {fields.length === 1 && <button type="button" onClick={() => fields.push({})}>+ Add Secondary {InterestTypeName}</button>}
    {fields.length === 2 && <button type="button" onClick={() => fields.remove(1)}>+ Remove Secondary {InterestTypeName}</button>}
    <br />
    <br />
    {touched && error && <span>{error}</span>}
    {fields.map((policyHolder, index) =>
      <div key={index}>
        <h3>{index === 0 ? 'Primary' : 'Secondary'} Policy Holdler</h3>
        {/* {index > 0 && <button
          type="button"
          onClick={() => fields.remove(index)}
        >Remove {InterestTypeName}</button>
      } */}
        <PolicyHolder handleChange={function () {}} name={`${policyHolder}`} formName={formName} state={fieldState} />
      </div>,
    )}
  </div>
  );

let PolicyHolderUpdateForm = (props) => {
  const { formName, initialValues, styleName, handleSubmit, handleOnSubmit, handleChange, state,
          pristine, reset, submitting, error, invalid } = props;
  return (
    <Form
      className={`fade-in ${styleName || ''}`} id="PolicyHolderUpdateForm" onSubmit={handleSubmit(handleOnSubmit)}
      noValidate
    >
      <FieldArray name="policyHolders" component={renderPolicyHolder} InterestType={'PolicyHolder'} InterestTypeName={'Policy Holder'} formName={formName} fieldState={state} />
      <div className="workflow-steps">
        <button className="btn btn-primary" type="submit" form="PolicyHolderUpdateForm">Save</button>
      </div>
    </Form>
  );
};

PolicyHolderUpdateForm.propTypes = {
  handleOnSubmit: PropTypes.func,
  handleSubmit: PropTypes.func,
  handleChange: PropTypes.func,
};

PolicyHolderUpdateForm = reduxForm({
  form: 'PolicyHolderUpdateForm', // a unique identifier for this form
})(PolicyHolderUpdateForm);

const selector = formValueSelector('PolicyHolderUpdateForm'); // <-- same as form name

PolicyHolderUpdateForm = connect(
    state => ({
      initialValues: {
        policyHolders: state.form.Verify.values.policyHolders,
      },
      formName: 'PolicyHolderUpdateForm',
      state,
    }),
  )(PolicyHolderUpdateForm);


export default PolicyHolderUpdateForm;
