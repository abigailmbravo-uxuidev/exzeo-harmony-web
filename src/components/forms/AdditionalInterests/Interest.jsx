import React, { PropTypes } from 'react';
import TextField from '../../form/inputs/TextField';
import { SelectField } from '../../form/inputs/SelectField';
import MailingAddressFormFields from '../MailingAddress/MailingAddressFormFields';

const Interest = ({ fields, InterestTypeName, meta: { touched, error } }) => (
  <div>
    {fields.length < 2 && <button type="button" className="btn btn-secondary" onClick={() => fields.push({})}>+ Add {InterestTypeName}</button>}
    {touched && error && <span>{error}</span>}
    {fields.map((additionalInterest, index) =>
      <div key={index}>
        <button
          type="button" className="btn btn-secondary"
          onClick={() => fields.remove(index)}
        >Remove {InterestTypeName}</button>
        <br /> <br />
        <h4>{InterestTypeName} #{index + 1}</h4>

        {/* <SelectField
          answers={[{ answer: 'Mortgagee' }, { answer: 'Lienholder' }, { answer: 'Additional Interest' },
           { answer: 'Additional Insured' }, { answer: 'Premium Finance' }, { answer: 'Bill Payer' }]}
          name={`${InterestTypeName}${index + 1}Type`}
          label={'Type'}
          validations={['required']}
        /> */}

        <TextField
          answerType="text"

          name={`${InterestTypeName}${index + 1}Name1`}
          label={'Name 1'}
          validations={['required']}
        />
        <TextField
          answerType="text"

          name={`${InterestTypeName}${index + 1}Name2`}
          label={'Name 2'}
          validations={['required']}
        />
        <TextField
          answerType="text"

          name={`${InterestTypeName}${index + 1}PhoneNumber`}
          label={'Phone Number'}
          validations={['required', 'phone']}
        />
        <TextField
          answerType="text"

          name={`${InterestTypeName}${index + 1}ReferenceNumber`}
          label={'Reference Number'}
          validations={[]}
        />
        <MailingAddressFormFields name={`${InterestTypeName}${index + 1}MailingAddress`} />
      </div>,
    )}
  </div>
);

Interest.propTypes = {
  fields: PropTypes.any,// eslint-disable-line
  InterestType: PropTypes.any,// eslint-disable-line
  InterestTypeName: PropTypes.any,// eslint-disable-line
  meta: PropTypes.any,// eslint-disable-line
};

export default Interest;
