import React, { PropTypes } from 'react';
import { formValueSelector } from 'redux-form';
import { TextField, SelectField } from '../../form/inputs';

const PolicyHolderFormFields = ({ name, state, formName }) => {
  // const selector = formValueSelector(formName);
  const entityType = 'Person'; // selector(state, `${name}.entityType`);

  return (
    <div className="form-group survey-wrapper policyHolder-component" role="group">
      {/* <SelectField
        answers={[{ answer: 'Company' }, { answer: 'Person' }]}
        defaultValue={'Person'}
        name={`${name}.entityType`}
        label={'Entity Type'}
        validations={['required']}
      /> */}

      {entityType === 'Person' && <TextField
        answerType="text"
        name={`${name}FirstName`}
        styleName={`${name}FirstName FirstName`}
        label={'First Name'}
        validations={['required']}
      />}
      {entityType === 'Person' && <TextField
        answerType="text"
        name={`${name}LastName`}
        styleName={`${name}LastName LastName`}
        label={'Last Name'}
        validations={['required']}
      />
      }
      {entityType === 'Company' && <TextField
        answerType="text"
        name={`${name}CompanyName`}
        styleName={`${name}CompanyName CompanyName`}
        label={'Company'}
        validations={['required']}
      />
      }

      <TextField
        answerType="text"
        name={`${name}EmailAddress`}
        styleName={`${name}Email Email`}
        label={'Email Address'}
        validations={['required', 'email']}
      />
      <TextField
        answerType="text"
        name={`${name}PrimaryPhoneNumber`}
        styleName={`${name}PhoneNumber PhoneNumber`}
        label={'Phone Number'}
        validations={['required', 'phone']}
      />
    </div>
  );
};

PolicyHolderFormFields.propTypes = {
  name: PropTypes.string,
  state: PropTypes.any,// eslint-disable-line
  formName: PropTypes.string
};

export default PolicyHolderFormFields;
