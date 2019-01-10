import React from 'react';
import PropTypes from 'prop-types';

import BaseConnect from './Base';
import ContactCard from '../components/Contacts/ContactCard'
import Footer from '../components/Common/Footer';

const territoryManagerContacts = [
  {
    icon: 'image clark-ramos',
    name: 'Clark Ramos',
    title: 'Southeast Florida Rep',
    phone: '7865171810',
    cell: '3053216071',
    email: 'cramos@hcpci.com'
  },
  {
    icon: 'image edward-spegowski',
    name: 'Edward Spegowski',
    title: 'Southwest Florida Rep',
    phone: '8134195243',
    email: 'espegowski@hcpci.com'
  },
  {
    icon: 'image jodi-kelley',
    name: 'Jodi Kelley',
    title: 'Northeast Florida Rep',
    phone: '8134195220',
    email: 'jkelley@hcpci.com'
  },
  {
    icon: 'image victor-ferdinandi',
    name: 'Victor Ferdinandi',
    title: 'West Central Florida Rep',
    phone: '8134195245',
    email: 'vferdinandi@hcpci.com'
  },
  {
    icon: 'image yanet-coursen',
    name: 'Yanet Coursen',
    title: 'VP, Sales & Marketing',
    phone: '8134053273',
    email: 'ycoursen@hcpci.com'
  }
];

const supportContacts = [
  {
    icon: 'fa fa-building-o',
    name: 'Agency Support',
    title: '',
    phone: '8442897968',
    extension: 'option 5',
    email: 'agencysupport@typtap.com'
  },
  {
    icon: 'fa fa-life-ring',
    name: 'Claims',
    title: '',
    phone: '8442897968',
    extension: 'option 1',
    email: 'claims@typtap.com'
  },
  {
    icon: 'fa fa-handshake-o',
    name: 'Customer Service',
    title: '',
    phone: '8442897968',
    extension: 'option 2',
    email: 'customerservice@typtap.com'
  },
  {
    icon: 'fa fa-shopping-cart',
    name: 'Marketing',
    title: '',
    phone: '8442897968',
    extension: 'option 6',
    email: 'marketing@typtap.com'
  },
  {
    icon: 'fa fa-credit-card',
    name: 'Payments',
    title: '',
    message: 'PAYABLE TO: TYPTAP MANAGEMENT COMPANY, PO BOX 1120, OCALA, FL 34478',
    phone: '8442897968',
    extension: 'option 3',
    email: 'customerservice@typtap.com',
    disclaimer: 'Provide Policy #, Insured Name, Insured Address. We currently only accept payments via phone using Visa, MasterCard and Discover.'
  }
];

const Contacts = props => (
  <BaseConnect {...props}>
    <div className="train" role="article">
      <div className="route">
        <div className="route-content">
          <div className="scroll">
            <div className="survey-wrapper">
              <section className="contacts">
                <h2><i className="fa fa-map-marker" />&nbsp;Territory Managers</h2>
                {territoryManagerContacts.map(contact => (
                  <ContactCard key={contact.name} {...contact} />
                ))}
              </section>
              <section className="contacts">
                <h2><i className="fa fa-address-book" />&nbsp;Support</h2>
                {supportContacts.map(contact => (
                  <ContactCard key={contact.name} {...contact} />
                ))}
              </section>
            </div>
            <Footer />
          </div>
        </div>
      </div>
    </div>
  </BaseConnect>
);

// Contacts.propTypes = {
//   children: PropTypes.shape()
// };

export default Contacts;
