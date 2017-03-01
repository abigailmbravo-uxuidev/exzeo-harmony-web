import React, { PropTypes } from 'react';
import { Form } from 'redux-form';
import {
  TextField,
  SelectField
} from '../../form/inputs';

const MailingAddressForm = (props) => {
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
          name={`${name}.address1`}
          styleName={'address1'}
          question={'Address 1'}
          validations={['required']}
        />
        <TextField
          type="text"
          name={`${name}.address2`}
          styleName={'address2'}
          question={'Address 2'}
          validations={[]}
        />
        <SelectField
          answers={[{ answer: 'USA' }, { answer: 'CANADA' }]}
          name={`${name}.country`}
          question={'Country'}
          validations={['required']}
        />
        <TextField
          type="text"
          name={`${name}.city`}
          styleName={'city'}
          question={'City'}
          validations={['required']}
        />
        <TextField
          type="text"
          name={`${name}.state`}
          styleName={'state'}
          question={'State'}
          validations={['required']}
        />
        <TextField
          type="tel"
          name={`${name}.zip`}
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


MailingAddressForm.propTypes = {
  name: PropTypes.string,
  styleName: PropTypes.string,
  handleOnSubmit: PropTypes.func,
  handleSubmit: PropTypes.func
};

export default MailingAddressForm;
