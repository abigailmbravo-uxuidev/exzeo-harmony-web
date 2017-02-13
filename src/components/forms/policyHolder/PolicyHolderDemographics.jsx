import React, { PropTypes } from 'react';
// import _ from 'lodash';
import { formValueSelector } from 'redux-form';
import TextInput from '../../common/inputs/TextInput';

const PolicyHolderDemographics = ({ handleChange, state, formName,
  }) => {
  const selector = formValueSelector(formName);
  const entityType = selector(state, 'entityType');

  return (
    <div className="form-group survey-wrapper policyHolder-component" role="group">
      {/* <Dropdown*/}
      {/* answers={[{ answer: 'Company' }, { answer: 'Person' }]}*/}
      {/* handleChange={handleChange}*/}
      {/* defaultValue={'Person'}*/}
      {/* name={'entityType'}*/}
      {/* question={'Entity Type'}*/}
      {/* validations={['required']}*/}
      {/* />*/}

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
  state: PropTypes.any,// eslint-disable-line
  formName: PropTypes.string,
  handleChange: PropTypes.func,
};

export default PolicyHolderDemographics;
