import React, { PropTypes } from 'react';
// import _ from 'lodash';
import { reduxForm, Form } from 'redux-form';
import Footer from '../Footer';
import TextInput from '../form/TextInput';
import Dropdown from '../form/Dropdown';

const MailingAddress = ({ styleName, handleChange, name,
   pristine, reset, submitting, error, invalid }) => (
     <div className="form-group survey-wrapper MailingAddress-component" role="group">
       <TextInput
         answerType="text"
         handleChange={handleChange}
         name={`${name}.address1`}
         styleName={'address1'}
         question={'Address 1'}
         validations={['required']}
       />
       <TextInput
         answerType="text"
         handleChange={handleChange}
         name={`${name}.address2`}
         styleName={'address2'}
         question={'Address 2'}
         validations={[]}
       />
       <Dropdown
         answers={[{ answer: 'USA' }, { answer: 'CANADA' }]}
         handleChange={handleChange}
         name={`${name}.country`}
         question={'Country'}
         validations={['required']}
       />
       <TextInput
         answerType="text"
         handleChange={handleChange}
         name={`${name}.city`}
         styleName={'city'}
         question={'City'}
         validations={['required']}
       />
       <TextInput
         answerType="text"
         handleChange={handleChange}
         name={`${name}.state`}
         styleName={'state'}
         question={'State'}
         validations={['required']}
       />
       <TextInput
         answerType="tel"
         handleChange={handleChange}
         name={`${name}.zip`}
         styleName={'zip'}
         question={'Zip'}
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
