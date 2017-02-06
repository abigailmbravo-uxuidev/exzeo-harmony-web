import React, { PropTypes } from 'react';
// import _ from 'lodash';
import { connect } from 'react-redux';
import moment from 'moment';
import { reduxForm, Form, formValueSelector, Field } from 'redux-form';
import Footer from '../Footer';
import TextInput from '../form/TextInput';

let EffectiveDateForm = (props) => {
  const { effectiveDate, styleName, handleSubmit, handleOnSubmit, handleChange,
          pristine, reset, submitting, error, invalid } = props;

  return (
    <Form
      className={`fade-in ${styleName || ''}`} id="EffectiveDateForm" onSubmit={handleSubmit(handleOnSubmit)}
      noValidate
    >
      <div className="form-group survey-wrapper" role="group">
        <TextInput
          answerType="date"
          handleChange={function () { }}
          name="effectiveDate"
          question={'Effective Date'}
          validations={['required', 'date']}
        />
      </div>
      <div className="workflow-steps">
        <button className="btn btn-primary" type="submit" form="EffectiveDateForm">next</button>
      </div>
    </Form>
  );
};

EffectiveDateForm.propTypes = {
  effectiveDate: PropTypes.string,
  handleOnSubmit: PropTypes.func,
  handleSubmit: PropTypes.func,
  handleChange: PropTypes.func,
};

EffectiveDateForm = reduxForm({
  form: 'EffectiveDateForm', // a unique identifier for this form
})(EffectiveDateForm);

const selector = formValueSelector('EffectiveDateForm'); // <-- same as form name

EffectiveDateForm = connect(
    state => ({
      initialValues: {
        effectiveDate: state.form && state.form.Verify && state.form.Verify.initial ? state.form.Verify.initial.effectiveDate : '',
      },
    }),
  )(EffectiveDateForm);


export default EffectiveDateForm;
