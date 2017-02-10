import React, { PropTypes } from 'react';
// import _ from 'lodash';
import { formValueSelector } from 'redux-form';
import TextInput from '../form/TextInput';
import Dropdown from '../form/Dropdown';

const PolicyHolder = ({ handleChange, name, state, formName }) => {
  const selector = formValueSelector(formName);
  const entityType = selector(state, `${name}.entityType`);

  return (
    <div className="form-group survey-wrapper policyHolder-component" role="group">
      <Dropdown
        answers={[{ answer: 'Company' }, { answer: 'Person' }]}
        handleChange={handleChange}
        defaultValue={'Person'}
        name={`${name}.entityType`}
        question={'Entity Type'}
        validations={['required']}
      />

      {entityType === 'Person' && <TextInput
        answerType="text"
        handleChange={handleChange}
        name={`${name}.firstName`}
        styleName={`${name}FirstName FirstName`}
        question={'First Name'}
        validations={['required']}
      />}
      {entityType === 'Person' && <TextInput
        answerType="text"
        handleChange={handleChange}
        name={`${name}.lastName`}
        styleName={`${name}LastName LastName`}
        question={'Last Name'}
        validations={['required']}
      />
      }
      {entityType === 'Company' && <TextInput
        answerType="text"
        handleChange={handleChange}
        name={`${name}.companyName`}
        styleName={`${name}CompanyName CompanyName`}
        question={'Company'}
        validations={['required']}
      />
      }

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
};

PolicyHolder.propTypes = {
  name: PropTypes.string,
  state: PropTypes.any,// eslint-disable-line
  formName: PropTypes.string,
  handleChange: PropTypes.func,
};

export default PolicyHolder;
