import React, { PropTypes } from 'react';
// import _ from 'lodash';
import { reduxForm, Form, formValueSelector } from 'redux-form';
import Footer from '../Footer';
import TextInput from '../form/TextInput';
import Dropdown from '../form/Dropdown';

const PolicyHolderDemographics = ({ askDate, styleName, handleSubmit, handleOnSubmit, handleChange, name, state, formName,
   pristine, reset, submitting, error, invalid }) => {
  const selector = formValueSelector(formName);
  const entityType = selector(state, 'entityType');

  return (
    <div className="form-group survey-wrapper policyHolder-component" role="group">
      <Dropdown
        answers={[{ answer: 'Company' }, { answer: 'Person' }]}
        handleChange={handleChange}
        defaultValue={'Person'}
        name={'entityType'}
        question={'Entity Type'}
        validations={['required']}
      />

      {entityType === 'Person' && <TextInput
        answerType="text"
        handleChange={handleChange}
        name={'FirstName'}
        styleName={'FirstName FirstName'}
        question={'First Name'}
        validations={['required']}
      />}
      {entityType === 'Person' && <TextInput
        answerType="text"
        handleChange={handleChange}
        name={'LastName'}
        styleName={'LastName LastName'}
        question={'Last Name'}
        validations={['required']}
      />
      }
      {entityType === 'Company' && <TextInput
        answerType="text"
        handleChange={handleChange}
        name={'CompanyName'}
        styleName={'CompanyName CompanyName'}
        question={'Company'}
        validations={['required']}
      />
      }

      <TextInput
        answerType="text"
        handleChange={handleChange}
        name={'EmailAddress'}
        styleName={'Email Email'}
        question={'Email Address'}
        validations={['required', 'email']}
      />
      <TextInput
        answerType="text"
        handleChange={handleChange}
        name={'phoneNumber'}
        styleName={'PhoneNumber PhoneNumber'}
        question={'Phone Number'}
        validations={['required', 'phone']}
      />
    </div>
  );
};

PolicyHolderDemographics.propTypes = {
  askDate: PropTypes.bool,
  handleOnSubmit: PropTypes.func,
  handleSubmit: PropTypes.func,
  handleChange: PropTypes.func,
};

export default PolicyHolderDemographics;
