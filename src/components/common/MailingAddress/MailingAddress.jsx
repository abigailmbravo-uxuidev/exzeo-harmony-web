import React, { PropTypes } from 'react';
// import _ from 'lodash';
import { reduxForm, Form } from 'redux-form';
import Footer from '../Footer';
import TextInput from '../form/TextInput';
import Dropdown from '../form/Dropdown';

const MailingAddress = ({ styleName, handleChange, name,
   pristine, reset, submitting, error, invalid }) => (
     <div className="form-group survey-wrapper" role="group">
       <TextInput
         answerType="text"
         handleChange={handleChange}
         name={`${name}address1`}
         question={'Address 1'}
         validations={['required']}
       />
       <TextInput
         answerType="text"
         handleChange={handleChange}
         name={`${name}address2`}
         question={'Address 2'}
         validations={['required']}
       />
       <TextInput
         answerType="text"
         handleChange={handleChange}
         name={`${name}city`}
         question={'City'}
         validations={['required']}
       />
       <TextInput
         answerType="text"
         handleChange={handleChange}
         name={`${name}state`}
         question={'State'}
         validations={['required']}
       />
       <Dropdown
         answers={[{ answer: 'USA' }, { answer: 'CANADA' }]}
         handleChange={handleChange}
         name={`${name}country`}
         question={'Country'}
         validations={['required']}
       />
     </div>
  );

MailingAddress.propTypes = {
  handleOnSubmit: PropTypes.func,
  handleSubmit: PropTypes.func,
  handleChange: PropTypes.func,
};

export default MailingAddress;
