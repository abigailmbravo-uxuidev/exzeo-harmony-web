import React from 'react';

export const AddressDetails = ({ address }) => {
  return (
    <section className="display-element">
      <dl>
        <div className="mailing-street-address">
          <dt>Street Address</dt>
          <dd>{address.address1}</dd>
          <dd>{address.address2}</dd>
        </div>
        <div className="mailing-zip-code">
          <dt>City/State/Zip</dt>
          <dd>{address.city}, {address.state} {address.zip}</dd>
        </div>
        <div className="mailing-country">
          <dt>Country</dt>
          <dd>{address && address.country ? address.country.code : 'USA'}</dd>
        </div>
      </dl>
    </section>);
};

AddressDetails.defaultProps = {
  address: {
    country: {}
  }
};
export default AddressDetails;
