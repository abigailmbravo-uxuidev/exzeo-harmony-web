import React, { PropTypes } from 'react';
// import _ from 'lodash';
import { connect } from 'react-redux';
import moment from 'moment';
import { reduxForm, Form, formValueSelector, Field } from 'redux-form';
import Footer from '../common/Footer';
import TextInput from '../common/form/TextInput';
import AdditionalInterests from '../common/AdditionalInterests/AdditionalInterests';

let AdditionalInterestsForm = (props) => {
  const { effectiveDate, styleName, handleSubmit, handleOnSubmit, handleChange,
          pristine, reset, submitting, error, invalid } = props;
  return (
    <Form
      className={`fade-in ${styleName || ''}`} id="AdditionalInterestsForm" onSubmit={handleSubmit(() => { })}
      noValidate
    >
      <AdditionalInterests {...props} />
      <div className="workflow-steps">
        <button className="btn btn-primary" type="submit" form="AdditionalInterestsForm">next</button>
      </div>
    </Form>
  );
};

AdditionalInterestsForm.propTypes = {
  handleOnSubmit: PropTypes.func,
  handleSubmit: PropTypes.func,
  handleChange: PropTypes.func,
};

AdditionalInterestsForm = reduxForm({
  form: 'AdditionalInterestsForm', // a unique identifier for this form
})(AdditionalInterestsForm);

const selector = formValueSelector('AdditionalInterestsForm'); // <-- same as form name

AdditionalInterestsForm = connect(
    state => ({
      initialValues: {
      },
    }),
  )(AdditionalInterestsForm);


export default AdditionalInterestsForm;
