/*
eslint import/no-mutable-exports:0
*/
import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { reduxForm, Form } from 'redux-form';
import TextInput from '../form/TextInput';

let EffectiveDateForm = (props) => {
  const { styleName, handleSubmit, handleOnSubmit } = props;

  return (
    <Form
      className={`fade-in ${styleName || ''}`} id="EffectiveDateForm" onSubmit={handleSubmit(handleOnSubmit)}
      noValidate
    >
      <div className="form-group survey-wrapper" role="group">
        <TextInput
          answerType="date"
          name="effectiveDate"
          question={'Effective Date'}
          validations={['required', 'date']}
        />
      </div>
      <div className="workflow-steps">
        <button className="btn btn-primary" type="submit" form="EffectiveDateForm">Save</button>
      </div>
    </Form>
  );
};

EffectiveDateForm.propTypes = {
  styleName: PropTypes.string,
  handleOnSubmit: PropTypes.func,
  handleSubmit: PropTypes.func,
};

EffectiveDateForm = reduxForm({
  form: 'EffectiveDateForm', // a unique identifier for this form
})(EffectiveDateForm);

EffectiveDateForm = connect(
    state => ({
      initialValues: {
        effectiveDate: state.form && state.form.Verify && state.form.Verify.initial ? state.form.Verify.initial.effectiveDate : '',
      },
    }),
  )(EffectiveDateForm);


export default EffectiveDateForm;
