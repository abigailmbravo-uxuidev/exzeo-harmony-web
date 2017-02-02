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
        <PolicyHolder handleChange={function () {}} name={`${InterestType + (index + 1)}`} />
      </div>,
    )}
  </div>
);

let PolicyHolderUpdateFormForm = (props) => {
  const { styleName, handleSubmit, handleOnSubmit, handleChange, policyHolders,
          pristine, reset, submitting, error, invalid } = props;
  return (
    <Form
      className={`fade-in ${styleName || ''}`} id="PolicyHolderUpdateFormForm" onSubmit={handleSubmit(handleOnSubmit)}
      noValidate
    >
      <FieldArray name="policyHolder" component={renderPolicyHolder} InterestType={'PolicyHolder'} InterestTypeName={'Policy Holder'} fields={policyHolders} />
      <div className="workflow-steps">
        <button className="btn btn-primary" type="submit" form="PolicyHolderUpdateFormForm">next</button>
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
          PolicyHolder1FirstName: state.form.Verify.values.policyHolderFirstName1,
          PolicyHolder1LastName: state.form.Verify.values.policyHolderLastName1,
          PolicyHolder1PhoneNumber: state.form.Verify.values.policyHolderPhoneNumber1,
          PolicyHolder1Email: state.form.Verify.values.policyHolderEmail1,
          PolicyHolder2FirstName: state.form.Verify.values.policyHolderFirstName2,
          PolicyHolder2LastName: state.form.Verify.values.policyHolderLastName2,
          PolicyHolder2PhoneNumber: state.form.Verify.values.policyHolderPhoneNumber2,
          PolicyHolder2Email: state.form.Verify.values.policyHolderEmail2,
        },
      };
    },
  )(PolicyHolderUpdateFormForm);


export default PolicyHolderUpdateFormForm;
