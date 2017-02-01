import React, { PropTypes } from 'react';
// import _ from 'lodash';
import { reduxForm, Form } from 'redux-form';
import Footer from '../Footer';
import TextInput from '../form/TextInput';

const PolicyHolder = ({ askDate, styleName, handleSubmit, handleOnSubmit, handleChange,
   pristine, reset, submitting, error, invalid }) => (
     <div className="form-group survey-wrapper" role="group">
       <TextInput
         answerType="text"
         handleChange={handleChange}
         name={`${name}FirstName`}
         question={'First Name'}
         validations={['required']}
       />
       <TextInput
         answerType="text"
         handleChange={handleChange}
         name={`${name}LastName`}
         question={'Last Name'}
         validations={['required']}
       />
       <TextInput
         answerType="text"
         handleChange={handleChange}
         name={`${name}lastName`}
         question={'Email Address'}
         validations={['required']}
       />
       <TextInput
         answerType="text"
         handleChange={handleChange}
         name={`${name}primaryPhoneNumber`}
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
