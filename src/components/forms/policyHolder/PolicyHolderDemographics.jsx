import React, { PropTypes } from 'react';
import { formValueSelector } from 'redux-form';
import TextField from '../../form/TextField';

const PolicyHolderDemographics = ({ state, formName
  }) => {
  const selector = formValueSelector(formName);
  const entityType = selector(state, 'entityType');

  return (
    <div className="form-group survey-wrapper policyHolder-component" role="group">
      {/* <Dropdown*/}
      {/* answers={[{ answer: 'Company' }, { answer: 'Person' }]}*/}
      {/* defaultValue={'Person'}*/}
      {/* name={'entityType'}*/}
      {/* question={'Entity Type'}*/}
      {/* validations={['required']}*/}
      {/* />*/}

      {entityType === 'Person' && <TextField
        answerType="text"
        name={'FirstName'}
        styleName={'FirstName FirstName'}
        question={'First Name'}
        validations={['required']}
      />}
      {entityType === 'Person' && <TextField
        answerType="text"
        name={'LastName'}
        styleName={'LastName LastName'}
        question={'Last Name'}
        validations={['required']}
      />
      }
      {entityType === 'Company' && <TextField
        answerType="text"
        name={'CompanyName'}
        styleName={'CompanyName CompanyName'}
        question={'Company'}
        validations={['required']}
      />
      }

      <TextField
        answerType="text"
        name={'EmailAddress'}
        styleName={'Email Email'}
        question={'Email Address'}
        validations={['required', 'email']}
      />
      <TextField
        answerType="text"
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
  formName: PropTypes.string
};

export default PolicyHolderDemographics;
