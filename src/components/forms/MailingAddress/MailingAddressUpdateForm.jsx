import React, { PropTypes } from 'react';
import { Form } from 'redux-form';
import {
  TextField,
  SelectField
} from '../../form/inputs';

const MailingAddressUpdateForm = (props) => {
  const {
    styleName,
    handleSubmit,
    handleOnSubmit,
    name
  } = props;
  return (
    <Form
      className={`fade-in ${styleName || ''}`} id="MailingAddress" onSubmit={handleSubmit(handleOnSubmit)}
      noValidate
    >
      <h3>Mailing Address</h3>
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
          question={'Zip'}
          validations={['required']}
        />
      </div>
      <div className="workflow-steps">
        <button className="btn btn-primary" type="submit" form="MailingAddress">next</button>
      </div>
    </Form>
  );
};


MailingAddressUpdateForm.propTypes = {
  name: PropTypes.string,
  styleName: PropTypes.string,
  handleOnSubmit: PropTypes.func,
  handleSubmit: PropTypes.func
};

export default MailingAddressUpdateForm;
