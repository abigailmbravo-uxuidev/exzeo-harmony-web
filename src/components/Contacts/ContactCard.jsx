import React from 'react';
import { normalize } from '@exzeo/core-ui/';
// import PropTypes from 'prop-types';


const ContactCard = ({ image, name, title, phone, cell, extension, email, address1, address2, city, state, zip, message }) => {
  return (
    <div className="card contact-card">
      <div className="card-header">
        <div className={`image ${image || ''}`} />
      </div>
      <div className="card-body">
        <div className="contact-info">
          {name && <h4 className="contact-name">{name}</h4>}
          {title && <p className="contact-title">{title}</p>}
          {phone && <p className="contact-phone"><i className="fa fa-phone-square" /><a href={`tel:${phone}`}>{normalize.Phone(phone)} {extension && `${extension}`}</a></p>}
          {cell && <p className="contact-phone mobile"><a href={`tel:${cell}`}>{normalize.Phone(cell)}</a><span>MOBILE</span></p>}
          {email && <p className="contact-email"><i className="fa fa-envelope" /><a href={`mailto:${email}`}>{email}</a></p>}
          {address1 && <p className="contact-address"><i className="fa fa-map-marker" />
            <span className="contact-address-wrapper">
              {address1}<br />
              {address2 && address2}
              {address2 && <br />}
              {city},&nbsp;{state}&nbsp;{zip}
            </span>
          </p>}
          {message && <p className="email-message"><i className="fa fa-info-circle" /><span className="message-wrapper">{message}</span></p>}
        </div>
      </div>
    </div>
  );
};

// ContactCard.propTypes = {};

// ContactCard.defaultProps = {};

export default ContactCard;