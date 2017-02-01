import React, { PropTypes } from 'react';
// import _ from 'lodash';
import { reduxForm, Form } from 'redux-form';
import Footer from '../Footer';
import TextInput from '../form/TextInput';
import PolicyHolder from '../policyHolder/PolicyHolder';

const Demographics = (props) => {
  const { styleName, handleSubmit, handleOnSubmit, handleChange,
          pristine, reset, submitting, error, invalid } = props;
  return (<Form
    className={`fade-in ${styleName || ''}`} id="Demographics" onSubmit={handleSubmit(() => { })}
    noValidate
  >
    <h3>Demographics</h3>
    <PolicyHolder {...props} />
    <TextInput
      answerType="date"
      handleChange={handleChange}
      name="effectiveDate"
      question={'Phone Number'}
      validations={['required', 'date']}
    />
    <div className="workflow-steps">
      <button className="btn btn-primary" type="submit" form="Demographics">next</button>
    </div>
    <Footer />
  </Form>
  );
};

Demographics.propTypes = {
  handleOnSubmit: PropTypes.func,
  handleSubmit: PropTypes.func,
  handleChange: PropTypes.func,
};

export default reduxForm({
  form: 'Demographics', // a unique identifier for this form
})(Demographics);
