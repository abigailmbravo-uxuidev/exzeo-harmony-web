import React from 'react';
import { Field, FieldArray, reduxForm } from 'redux-form';
import TextInput from '../form/TextInput';
import MailingAddress from '../MailingAddress/MailingAddress';
import PolicyHolder from '../policyHolder/PolicyHolder';
import Interest from '../AdditionalInterests/Interest';


const renderPolicyHolder = ({ fields, InterestType, InterestTypeName, handleChange, meta: { touched, error } }) => (
  <div>
    {fields.length < 1 && <button type="button" onClick={() => fields.push({})}>+ Add {InterestTypeName}</button>}
    {touched && error && <span>{error}</span>}
    {fields.map((ai, index) =>
      <div key={index}>
        <button
          type="button"
          onClick={() => fields.remove(index)}
        >Remove {InterestTypeName}</button>
        <br /> <br />
        <h4>{InterestTypeName}</h4>
        <PolicyHolder handleChange={function () {}} name={`${`${InterestType}2`}.`} />
      </div>,
    )}
  </div>
);

const AdditionalInterests = (props) => {
  const { handleSubmit, handleChange, pristine, reset, submitting } = props;

  return (
    <div>
      <h3>Mailing Address</h3>
      <MailingAddress {...props} />
      <FieldArray name="mortgagees.Mortgagee" component={Interest} InterestType={'Mortgagee'} InterestTypeName={'Mortgagee'} />
      <br /><br />
      <FieldArray name="mortgagees.leinholder" component={Interest} InterestType={'Lienholder'} InterestTypeName={'Lienholder'} />
      <br /><br />
      <FieldArray name="mortgagees.AdditionalInterest" component={Interest} InterestType={'AdditionalInterest'} InterestTypeName={'Additional Interest'} />
      <br /><br />
      <FieldArray name="mortgagees.AdditionalInsured" component={Interest} InterestType={'AdditionalInsured'} InterestTypeName={'Additional Insured'} />
      <br /><br />
      <FieldArray name="mortgagees.BillPayer" component={Interest} InterestType={'BillPayer'} InterestTypeName={'Bill Payer'} />
      <br /><br />
      <FieldArray name="additionalPolicyHolder" component={renderPolicyHolder} InterestType={'AdditionalPolicyHolder'} InterestTypeName={'Additional Policy Holder'} />
    </div>
  );
};

export default AdditionalInterests;
