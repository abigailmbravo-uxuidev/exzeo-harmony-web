import React, { PropTypes } from 'react';
import { Form } from 'redux-form';
import { TextField } from '../../form/inputs';

const EffectiveDateForm = (props) => {
  const { styleName, handleSubmit, handleOnSubmit } = props;

  return (
    <Form
      className={`fade-in ${styleName || ''}`} id="EffectiveDateForm" onSubmit={handleSubmit(handleOnSubmit)}
      noValidate
    >
      <div className="form-group survey-wrapper" role="group">
        <TextField
          type="date"
          name="effectiveDate"
          label="Effective Date"
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
  handleSubmit: PropTypes.func
};

export default EffectiveDateForm;
