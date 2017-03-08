import React, { PropTypes } from 'react';
import { Form } from 'redux-form';
import {
  TextField,
  SelectField
} from '../../form/inputs';

const MailingAddressFormFields = (props) => {
  const {
    name
  } = props;
  return (
    <div className="form-group survey-wrapper MailingAddress-component" role="group">
      <TextField
        type="text"
        name={`${name}Address1`}
        styleName={'address1'}
        label={'Address 1'}
        validations={['required']}
      />
      <TextField
        type="text"
        name={`${name}Address2`}
        styleName={'address2'}
        label={'Address 2'}
        validations={[]}
      />
      <SelectField
        answers={[{ answer: 'USA' }, { answer: 'CANADA' }]}
        name={`${name}Country`}
        label={'Country'}
        validations={['required']}
      />
      <TextField
        type="text"
        name={`${name}City`}
        styleName={'city'}
        label={'City'}
        validations={['required']}
      />
      <TextField
        type="text"
        name={`${name}State`}
        styleName={'state'}
        label={'State'}
        validations={['required']}
      />
      <TextField
        type="tel"
        name={`${name}Zip`}
        styleName={'zip'}
        label={'Zip'}
        validations={['required']}
      />
    </div>
  );
};


MailingAddressFormFields.propTypes = {
  name: PropTypes.string
};

export default MailingAddressFormFields;
