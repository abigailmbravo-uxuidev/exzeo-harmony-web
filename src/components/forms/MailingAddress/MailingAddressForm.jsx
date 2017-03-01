/*
eslint import/no-mutable-exports:0
*/
import React, { PropTypes } from 'react';
// import _ from 'lodash';
import { connect } from 'react-redux';
import { reduxForm, Form } from 'redux-form';
import MailingAddress from './MailingAddress';

let MailingAddressForm = (props) => {
  const { styleName, handleSubmit,
     handleOnSubmit,
     handleChange, name } = props;
  return (
    <Form
      className={`fade-in ${styleName || ''}`} id="MailingAddressForm" onSubmit={handleSubmit(handleOnSubmit)}
      noValidate
    >
      <h3>Mailing Address</h3>
      <MailingAddress {...props} name={name || ''} handleChange={handleChange} />
      <div className="workflow-steps">
        <button className="btn btn-primary" type="submit" form="MailingAddressForm">next</button>
      </div>
    </Form>
  );
};

MailingAddressForm.propTypes = {
  name: PropTypes.string,
  styleName: PropTypes.string,
  handleOnSubmit: PropTypes.func,
  handleSubmit: PropTypes.func,
  handleChange: PropTypes.func
};

MailingAddressForm = reduxForm({
  form: 'MailingAddressForm' // a unique identifier for this form
})(MailingAddressForm);

MailingAddressForm = connect(
    state => ({
      initialValues: {
        policyHolderMailingAddress: state.form.Verify ?
        state.form.Verify.values.policyHolderMailingAddress : {}
      }
    }),
  )(MailingAddressForm);


export default MailingAddressForm;
