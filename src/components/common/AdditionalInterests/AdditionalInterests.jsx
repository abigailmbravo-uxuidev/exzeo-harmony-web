import React from 'react';
import { Field, FieldArray, reduxForm } from 'redux-form';
import TextInput from '../form/TextInput';
import PolicyHolder from '../policyHolder/PolicyHolder';
import Interest from '../AdditionalInterests/Interest';


const renderPolicyHolder = ({ fields, InterestType, InterestTypeName, handleChange, meta: { touched, error } }) => (
  <div>
    {fields.length < 1 && <button type="button" className="btn btn-secondary" onClick={() => fields.push({})}>+ Add {InterestTypeName}</button>}
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
            <h4>Mortgagee</h4>
      <FieldArray name="mortgagees.Mortgagee" component={Interest} InterestType={'Mortgagee'} InterestTypeName={'Mortgagee'} />
<h4>Lienholder</h4>
      <FieldArray name="mortgagees.Lienholder" component={Interest} InterestType={'Lienholder'} InterestTypeName={'Lienholder'} />
<h4>Additional Interest</h4>
      <FieldArray name="mortgagees.AdditionalInterest" component={Interest} InterestType={'AdditionalInterest'} InterestTypeName={'Additional Interest'} />
<h4>Additional Insured</h4>
      <FieldArray name="mortgagees.AdditionalInsured" component={Interest} InterestType={'AdditionalInsured'} InterestTypeName={'Additional Insured'} />
<h4>Bill Payer</h4>
      <FieldArray name="mortgagees.BillPayer" component={Interest} InterestType={'BillPayer'} InterestTypeName={'Bill Payer'} />
<h4>Policy Holder</h4>
      <FieldArray name="additionalPolicyHolder" component={renderPolicyHolder} InterestType={'AdditionalPolicyHolder'} InterestTypeName={'Additional Policy Holder'} />
    </div>
  );
};

export default AdditionalInterests;
