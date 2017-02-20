import React, { PropTypes } from 'react';
import TextInput from '../../inputs/TextInput';
import MailingAddress from '../MailingAddress/MailingAddress';

const Interest = ({ fields, InterestTypeName, meta: { touched, error } }) => (
  <div>
    <button type="button" className="btn btn-secondary" onClick={() => fields.push({})}>+ Add {InterestTypeName}</button>
    {touched && error && <span>{error}</span>}
    {fields.map((additionalInterest, index) =>
      <div key={index}>
        <button
          type="button"
          onClick={() => fields.remove(index)}
        >Remove {InterestTypeName}</button>
        <br /> <br />
        <h4>{InterestTypeName} #{index + 1}</h4>
        <TextInput
          answerType="text"

          name={`${additionalInterest}.name1`}
          question={'Name 1'}
          validations={['required']}
        />
        <TextInput
          answerType="text"

          name={`${additionalInterest}.name2`}
          question={'Name 2'}
          validations={['required']}
        />
        <TextInput
          answerType="text"

          name={`${additionalInterest}.phoneNumber`}
          question={'Phone Number'}
          validations={['required', 'phone']}
        />
        <TextInput
          answerType="text"

          name={`${additionalInterest}.referenceNumber`}
          question={'Reference Number'}
          validations={['required']}
        />
        <MailingAddress name={`${additionalInterest}.mailingAddress`} />
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
