import React from 'react';
import { normalize } from '@exzeo/core-ui';



const ContactCard = ({ icon, name, title, phone, cell, extension, email, address1, address2, city, state, zip, message, disclaimer }) => {
  return (
    <div className="card contact-card">
      <div className="card-header">
        <div className={icon ||'fa fa-address-card'} />
      </div>
      <div className="card-body">
        {name && <h4 className="contact-name">{name} {title && <span className="contact-title"> | {title}</span>}</h4>}
        {message && <div className="contact-message">{message}</div>}
        <div className="contact-details">
          {phone && <span className="contact-phone"><i className="fa fa-phone-square" />&nbsp;<a href={`tel:${phone}`}>{normalize.phone(phone)} {extension && `${extension}`}</a></span>}
          {cell && <span className="contact-phone mobile"><i className="fa fa-phone"><span>MOBILE</span></i>&nbsp;<a href={`tel:${cell}`}>{normalize.phone(cell)}</a></span>}
          {email && <span className="contact-email"><i className="fa fa-envelope" />&nbsp;<a href={`mailto:${email}`}>{email}</a></span>}
          {address1 && <span className="contact-address"><i className="fa fa-map-marker" />&nbsp;
            <span className="contact-address-wrapper">
              <span>{address1}, </span>
              {address2 && <span>{address2}, </span>}
              <span>{city}, {state} {zip}</span>
            </span>
          </span>}
        </div>
        {disclaimer && <div className="contact-disclaimer">{disclaimer}</div>}
      </div>
    </div>
  );
};

// ContactCard.propTypes = {};

// ContactCard.defaultProps = {};

export default ContactCard;
