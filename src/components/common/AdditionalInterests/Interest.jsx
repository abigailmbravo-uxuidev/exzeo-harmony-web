import React from 'react';
import { Field, FieldArray, reduxForm } from 'redux-form';
import TextInput from '../form/TextInput';
import MailingAddress from '../MailingAddress/MailingAddress';

const Interest = ({ fields, InterestType, InterestTypeName, handleChange, meta: { touched, error } }) => (
  <div>
    <button type="button" onClick={() => fields.push({})}>+ Add {InterestTypeName}</button>
    {touched && error && <span>{error}</span>}
    {fields.map((ai, index) =>
      <div key={index}>
        <button
          type="button"
          onClick={() => fields.remove(index)}
        >Remove {InterestTypeName}</button>
        <br /> <br />
        <h4>{InterestTypeName} #{index + 1}</h4>
        <TextInput
          answerType="text"
          handleChange={function () {}}
          name={`${InterestType + (index + 1)}.name1`}
          question={'Name 1'}
          validations={['required']}
        />
        <TextInput
          answerType="text"
          handleChange={function () {}}
          name={`${InterestType + (index + 1)}.name2`}
          question={'Name 2'}
          validations={['required']}
        />
        <TextInput
          answerType="text"
          handleChange={function () {}}
          name={`${InterestType + (index + 1)}.phoneNumber`}
          question={'Phone Number'}
          validations={['required', 'phone']}
        />
        <TextInput
          answerType="text"
          handleChange={function () {}}
          name={`${InterestType + (index + 1)}.referenceNumber`}
          question={'Reference Number'}
          validations={['required']}
        />
        <MailingAddress handleChange={function () {}} name={`${InterestType + index + 1}.`} />
      </div>,
    )}
  </div>
);

export default Interest;
