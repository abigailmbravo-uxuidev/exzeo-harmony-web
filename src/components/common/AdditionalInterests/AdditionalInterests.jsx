import React, { PropTypes } from 'react';
import { FieldArray } from 'redux-form';
import PolicyHolder from '../policyHolder/PolicyHolder';
import Interest from '../AdditionalInterests/Interest';


const renderPolicyHolder = ({ fields, InterestType, InterestTypeName,
   handleChange, meta: { touched, error } }) => (
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
           <PolicyHolder handleChange={handleChange} name={`${`${InterestType}2`}.`} />
         </div>,
    )}
     </div>
);

renderPolicyHolder.propTypes = {
  fields: PropTypes.any,// eslint-disable-line
  InterestType: PropTypes.any,// eslint-disable-line
  InterestTypeName: PropTypes.any,// eslint-disable-line
  handleChange: PropTypes.func,
  meta: PropTypes.any,// eslint-disable-line
};

const AdditionalInterests = () => (
  <div>
    <FieldArray name="mortgagees.Mortgagee" component={Interest} InterestType={'Mortgagee'} InterestTypeName={'Mortgagee'} />

    <FieldArray name="mortgagees.Lienholder" component={Interest} InterestType={'Lienholder'} InterestTypeName={'Lienholder'} />

    <FieldArray name="mortgagees.AdditionalInterest" component={Interest} InterestType={'AdditionalInterest'} InterestTypeName={'Additional Interest'} />

    <FieldArray name="mortgagees.AdditionalInsured" component={Interest} InterestType={'AdditionalInsured'} InterestTypeName={'Additional Insured'} />

    <FieldArray name="mortgagees.BillPayer" component={Interest} InterestType={'BillPayer'} InterestTypeName={'Bill Payer'} />

    <FieldArray name="additionalPolicyHolder" component={renderPolicyHolder} InterestType={'AdditionalPolicyHolder'} InterestTypeName={'Additional Policy Holder'} />
  </div>
  );

export default AdditionalInterests;
