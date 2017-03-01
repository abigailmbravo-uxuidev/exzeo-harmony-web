import React, { PropTypes } from 'react';
// import _ from 'lodash';
import TextInput from '../../inputs/TextInput';
import Dropdown from '../../inputs/Dropdown';

const MailingAddress = ({ handleChange, name }) => (
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
  handleChange: PropTypes.func,
  name: PropTypes.string
};

export default MailingAddress;
