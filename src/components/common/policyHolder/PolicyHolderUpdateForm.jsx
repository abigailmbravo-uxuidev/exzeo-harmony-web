import React, { PropTypes } from 'react';
// import _ from 'lodash';
import { connect } from 'react-redux';
import { reduxForm, Form, formValueSelector, FieldArray } from 'redux-form';
import Footer from '../Footer';
import PolicyHolder from './PolicyHolder';

const renderPolicyHolder = ({ fields, InterestType, InterestTypeName, handleChange, meta: { touched, error } }) => (
  <div>
    {fields.length < 1 && <button type="button" onClick={() => fields.push({})}>+ Add {InterestTypeName}</button>}
    {touched && error && <span>{error}</span>}
    {fields.map((policyHolder, index) =>
      <div key={index}>
        <h3>{index === 0 ? 'Primary' : 'Secondary'} Policy Holdler</h3>
        {/* {index > 0 && <button
          type="button"
          onClick={() => fields.remove(index)}
        >Remove {InterestTypeName}</button>
      } */}
        <PolicyHolder handleChange={function () {}} name={`${policyHolder}`} />
      </div>,
    )}
  </div>
);

let PolicyHolderUpdateFormForm = (props) => {
  const { initialValues, styleName, handleSubmit, handleOnSubmit, handleChange,
          pristine, reset, submitting, error, invalid } = props;
  return (
    <Form
      className={`fade-in ${styleName || ''}`} id="PolicyHolderUpdateFormForm" onSubmit={handleSubmit(handleOnSubmit)}
      noValidate
    >
      <FieldArray name="policyHolders" component={renderPolicyHolder} InterestType={'PolicyHolder'} InterestTypeName={'Policy Holder'} />
      <div className="workflow-steps">
        <button className="btn btn-primary" type="submit" form="PolicyHolderUpdateFormForm">Save</button>
      </div>
    </Form>
  );
};

PolicyHolderUpdateFormForm.propTypes = {
  handleOnSubmit: PropTypes.func,
  handleSubmit: PropTypes.func,
  handleChange: PropTypes.func,
};

PolicyHolderUpdateFormForm = reduxForm({
  form: 'PolicyHolderUpdateFormForm', // a unique identifier for this form
})(PolicyHolderUpdateFormForm);

const selector = formValueSelector('PolicyHolderUpdateFormForm'); // <-- same as form name

PolicyHolderUpdateFormForm = connect(
    (state) => {
      console.log('state.form.Verify', state.form.Verify);

      return {
        initialValues: {
          policyHolders: state.form.Verify.values.policyHolders,
        },
      };
    },
  )(PolicyHolderUpdateFormForm);


export default PolicyHolderUpdateFormForm;
