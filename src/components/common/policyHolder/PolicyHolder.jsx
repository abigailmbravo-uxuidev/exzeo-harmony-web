import React, { PropTypes } from 'react';
// import _ from 'lodash';
import { reduxForm, Form } from 'redux-form';
import Footer from '../Footer';
import TextInput from '../form/TextInput';

const PolicyHolder = ({ askDate, styleName, handleSubmit, handleOnSubmit, handleChange, name,
   pristine, reset, submitting, error, invalid }) => (
     <div className="form-group survey-wrapper policyHolder-component" role="group">
       <TextInput
         answerType="text"
         handleChange={handleChange}
         name={`${name}.firstName`}
         styleName={`${name}FirstName FirstName`}
         question={'First Name'}
         validations={['required']}
       />
       <TextInput
         answerType="text"
         handleChange={handleChange}
         name={`${name}.lastName`}
         styleName={`${name}LastName LastName`}
         question={'Last Name'}
         validations={['required']}
       />
       <TextInput
         answerType="text"
         handleChange={handleChange}
         name={`${name}.emailAddress`}
         styleName={`${name}Email Email`}
         question={'Email Address'}
         validations={['required', 'email']}
       />
       <TextInput
         answerType="text"
         handleChange={handleChange}
         name={`${name}.primaryPhoneNumber`}
         styleName={`${name}PhoneNumber PhoneNumber`}
         question={'Phone Number'}
         validations={['required', 'phone']}
       />
     </div>
  );

PolicyHolder.propTypes = {
  askDate: PropTypes.bool,
  handleOnSubmit: PropTypes.func,
  handleSubmit: PropTypes.func,
  handleChange: PropTypes.func,
};

export default PolicyHolder;
