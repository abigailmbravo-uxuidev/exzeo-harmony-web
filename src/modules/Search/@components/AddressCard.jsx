import React from 'react';

const AddressCard = ({ address, handleClick }) => {
  return (
    <li
      id={address.id}
      tabIndex="0"
      onKeyPress={e => e.charCode === 13 && handleClick(address)}
    >
      <a onClick={() => handleClick(address)}>
        <i className="card-icon fa fa-map-marker" />
        <section>
          <h4>{address.physicalAddress.address1}</h4>
          <p>
            {address.physicalAddress.city}, {address.physicalAddress.state}{' '}
            {address.physicalAddress.zip}
          </p>
        </section>
        <i className="fa fa-chevron-circle-right" />
      </a>
    </li>
  );
};

export default AddressCard;
