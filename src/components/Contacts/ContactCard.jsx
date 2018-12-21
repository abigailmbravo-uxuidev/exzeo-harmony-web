import React from 'react';
import PropTypes from 'prop-types';

function formatPhone(phoneNumberString) {
  const cleaned = `${phoneNumberString.replace(/\D/g)}`;
  const match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
  if (match) {
    return `(${match[1]}) ${match[2]}-${match[3]}`;
  }
  return '';
}

const ContactCard = ({image, name, title, phone, extension, email, address1, address2, city, state, zip, message}) => {
  return (
    <div className="card contact-card">
      <div className="card-header">
        <div className={`image ${image || ''}`} />
      </div>
      <div className="card-body">
        <div className="contact-info">
          {name && <h4 className="contact-name">{name}</h4>}
          {title && <p className="contact-title">{title}</p>}
          {phone && <p className="contact-phone"><i className="fa fa-phone" /><a href={`tel:${phone}`}>{formatPhone(phone)} {extension && `${extension}`}</a></p>}
          {address1 && <p className="contact-address"><i className="fa fa-map-marker" />
            {address1}<br />
            {address2}<br />
            {city},&nbsp;{state}&nbsp;{zip}
          </p>}
          {email && <p className="contact-email"><i className="fa fa-envelope" /><a href={`mailto:${email}`}>{email}</a></p>}
          {message && <p className="email-message">{message}</p>}
        </div>
      </div>
    </div>
  );
};

// ContactCard.propTypes = {};

// ContactCard.defaultProps = {};

export default ContactCard;
