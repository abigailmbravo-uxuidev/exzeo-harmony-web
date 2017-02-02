import React, { PropTypes } from 'react';
// import _ from 'lodash';
import { connect } from 'react-redux';
import { reduxForm, Form, formValueSelector } from 'redux-form';
import Footer from '../Footer';
import MailingAddress from './MailingAddress';

let MailingAddressForm = (props) => {
  const { styleName, handleSubmit, handleOnSubmit, handleChange,
          pristine, reset, submitting, error, invalid } = props;
  return (
    <Form
      className={`fade-in ${styleName || ''}`} id="MailingAddressForm" onSubmit={handleSubmit(handleOnSubmit)}
      noValidate
    >
      <h3>Mailing Address</h3>
      <MailingAddress {...props} />
      <div className="workflow-steps">
        <button className="btn btn-primary" type="submit" form="MailingAddressForm">next</button>
      </div>
      <Footer />
    </Form>
  );
};

MailingAddressForm.propTypes = {
  handleOnSubmit: PropTypes.func,
  handleSubmit: PropTypes.func,
  handleChange: PropTypes.func,
};

MailingAddressForm = reduxForm({
  form: 'MailingAddressForm', // a unique identifier for this form
})(MailingAddressForm);

const selector = formValueSelector('MailingAddressForm'); // <-- same as form name

MailingAddressForm = connect(
    state => ({
      initialValues: {
        address1: state.form.Verify.values.policyHolderAddress1,
        address2: state.form.Verify.values.policyHolderAddress2,
        city: state.form.Verify.values.policyHolderCity,
        state: state.form.Verify.values.policyHolderState,
        zip: state.form.Verify.values.policyHolderZip,
        country: state.form.Verify.values.policyHolderCountry,
      },
    }),
  )(MailingAddressForm);


export default MailingAddressForm;
