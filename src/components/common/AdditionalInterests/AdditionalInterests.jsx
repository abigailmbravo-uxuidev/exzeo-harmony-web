import React from 'react';
import { Field, FieldArray, reduxForm } from 'redux-form';
import TextInput from '../form/TextInput';
import MailingAddress from '../MailingAddress/MailingAddress';
import PolicyHolder from '../policyHolder/PolicyHolder';

const rendermortgagees = ({ fields, InterestType, handleChange, meta: { touched, error } }) => (
  <div>
    <button type="button" onClick={() => fields.push({})}>+ Add a {InterestType}</button>
    {touched && error && <span>{error}</span>}
    {fields.map((ai, index) =>
      <div key={index}>
        <button
          type="button"
          onClick={() => fields.remove(index)}
        >Remove {InterestType}</button>
        <br /> <br />
        <h4>{InterestType} #{index + 1}</h4>
        <TextInput
          answerType="text"
          handleChange={function () {}}
          name={`${InterestType + index + 1}.name1`}
          question={'Name 1'}
          validations={['required']}
        />
        <TextInput
          answerType="text"
          handleChange={function () {}}
          name={`${InterestType + index + 1}.name2`}
          question={'Name 2'}
          validations={['required']}
        />
        <TextInput
          answerType="text"
          handleChange={function () {}}
          name={`${InterestType + index + 1}.phoneNumber`}
          question={'Phone Number'}
          validations={['required', 'phone']}
        />
        <TextInput
          answerType="text"
          handleChange={function () {}}
          name={`${InterestType + index + 1}.referenceNumber`}
          question={'Reference Number'}
          validations={['required']}
        />
        <MailingAddress handleChange={function () {}} name={`${InterestType + index + 1}.`} />
      </div>,
    )}
  </div>
);

const renderPolicyHolder = ({ fields, InterestType, handleChange, meta: { touched, error } }) => (
  <div>
    <button type="button" onClick={() => fields.push({})}>+ Add a {InterestType}</button>
    {touched && error && <span>{error}</span>}
    {fields.map((ai, index) =>
      <div key={index}>
        <button
          type="button"
          onClick={() => fields.remove(index)}
        >Remove {InterestType}</button>
        <br /> <br />
        <h4>{InterestType} #{index + 2}</h4>
        <PolicyHolder handleChange={function () {}} name={`${InterestType + index + 2}.`} />
      </div>,
    )}
  </div>
);

const AdditionalInterests = (props) => {
  const { handleSubmit, handleChange, pristine, reset, submitting } = props;

  return (
    <div>
      <FieldArray name="mortgagees.Mortgagee" component={rendermortgagees} InterestType={'Mortgagee'} />
      <br /><br />
      <FieldArray name="mortgagees.leinholder" component={rendermortgagees} InterestType={'Lienholder'} />
      <br /><br />
      <FieldArray name="mortgagees.AdditionalInterest" component={rendermortgagees} InterestType={'AdditionalInterest'} />
      <br /><br />
      <FieldArray name="mortgagees.AdditionalInsured" component={rendermortgagees} InterestType={'AdditionalInsured'} />
      <br /><br />
      <FieldArray name="mortgagees.BillPayer" component={rendermortgagees} InterestType={'BillPayer'} />
      <br /><br />
      <FieldArray name="additionalPolicyHolder" component={renderPolicyHolder} InterestType={'Policy Holder'} />
    </div>
  );
};

export default AdditionalInterests;
