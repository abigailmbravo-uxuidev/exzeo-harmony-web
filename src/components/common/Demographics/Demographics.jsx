import React, { PropTypes } from 'react';
// import _ from 'lodash';
import { connect } from 'react-redux';
import moment from 'moment';
import { reduxForm, Form, formValueSelector, Field } from 'redux-form';
import Footer from '../Footer';
import TextInput from '../form/TextInput';
import PolicyHolder from '../policyHolder/PolicyHolder';

let Demographics = (props) => {
  const { effectiveDate, styleName, handleSubmit, handleOnSubmit, handleChange,
          pristine, reset, submitting, error, invalid } = props;
  return (
    <Form
      className={`fade-in ${styleName || ''}`} id="Demographics" onSubmit={handleSubmit(() => { })}
      noValidate
    >
      <h3>Demographics</h3>
      <PolicyHolder {...props} />
      <TextInput
        answerType="date"
        handleChange={handleChange}
        name="effectiveDate"
        defaultValue={effectiveDate}
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
  effectiveDate: PropTypes.string,
  handleOnSubmit: PropTypes.func,
  handleSubmit: PropTypes.func,
  handleChange: PropTypes.func,
};

Demographics = reduxForm({
  form: 'Demographics', // a unique identifier for this form
})(Demographics);

const selector = formValueSelector('Demographics'); // <-- same as form name

Demographics = connect(
    (state) => {
      const effectiveDate = selector(state, 'effectiveDate');

      return {
        initialValues: {
          effectiveDate: moment().format('YYYY-MM-DD'),
        },
        effectiveDate,
      };
    },
  )(Demographics);


export default Demographics;
