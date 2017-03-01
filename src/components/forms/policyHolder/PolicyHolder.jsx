import React, { PropTypes } from 'react';
import { formValueSelector } from 'redux-form';
import { TextField, SelectField } from '../../form/inputs';

const PolicyHolder = ({ name, state, formName }) => {
  const selector = formValueSelector(formName);
  const entityType = selector(state, `${name}.entityType`);

  return (
    <div className="form-group survey-wrapper policyHolder-component" role="group">
      <SelectField
        answers={[{ answer: 'Company' }, { answer: 'Person' }]}
        defaultValue={'Person'}
        name={`${name}.entityType`}
        label={'Entity Type'}
        validations={['required']}
      />

      {entityType === 'Person' && <TextField
        answerType="text"
        name={`${name}.firstName`}
        styleName={`${name}FirstName FirstName`}
        label={'First Name'}
        validations={['required']}
      />}
      {entityType === 'Person' && <TextField
        answerType="text"
        name={`${name}.lastName`}
        styleName={`${name}LastName LastName`}
        label={'Last Name'}
        validations={['required']}
      />
      }
      {entityType === 'Company' && <TextField
        answerType="text"
        name={`${name}.companyName`}
        styleName={`${name}CompanyName CompanyName`}
        label={'Company'}
        validations={['required']}
      />
      }

      <TextField
        answerType="text"
        name={`${name}.emailAddress`}
        styleName={`${name}Email Email`}
        label={'Email Address'}
        validations={['required', 'email']}
      />
      <TextField
        answerType="text"
        name={`${name}.primaryPhoneNumber`}
        styleName={`${name}PhoneNumber PhoneNumber`}
        label={'Phone Number'}
        validations={['required', 'phone']}
      />
    </div>
  );
};

PolicyHolder.propTypes = {
  name: PropTypes.string,
  state: PropTypes.any,// eslint-disable-line
  formName: PropTypes.string
};

export default PolicyHolder;
