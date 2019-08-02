import React from 'react';
import { shape, func } from 'prop-types';

import AppWrapper from '../components/AppWrapper';
import ContactCard from '../components/Contacts/ContactCard';
import Footer from '../components/Footer';

export const territoryManagerContacts = [
  {
    icon: 'image clark-ramos',
    name: 'Clark Ramos',
    title: 'Southeast Florida Manager',
    phone: '7865171810',
    cell: '3053216071',
    email: 'cramos@hcpci.com'
  },
  {
    icon: 'image edward-spegowski',
    name: 'Edward Spegowski',
    title: 'Southwest Florida Manager',
    phone: '8134195243',
    email: 'espegowski@hcpci.com'
  },
  {
    icon: 'image jodi-kelley',
    name: 'Jodi Kelley',
    title: 'Northeast Florida Manager',
    phone: '8134195220',
    email: 'jkelley@hcpci.com'
  },
  {
    icon: 'image victor-ferdinandi',
    name: 'Victor Ferdinandi',
    title: 'West Central Florida Manager',
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

export const supportContacts = [
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
    icon: 'fa fa-group',
    name: 'Marketing',
    title: '',
    phone: '8882105235',
    extension: 'option 5',
    email: 'marketing@typtap.com'
  },
  {
    icon: 'fa fa-credit-card',
    name: 'Payments',
    title: '',
    message:
      'PAYABLE TO: TYPTAP MANAGEMENT COMPANY, PO BOX 1120, OCALA, FL 34478',
    phone: '8442897968',
    extension: 'option 3',
    email: 'customerservice@typtap.com',
    disclaimer:
      'Provide Policy #, Insured Name, Insured Address. We currently only accept payments via phone using Visa, MasterCard and Discover.'
  }
];

const Contacts = ({ auth, match }) => (
  <AppWrapper logout={auth.logout} match={match} routeClassName="main contacts">
    <div className="scroll">
      <div className="detail-wrapper">
        <section className="contacts">
          <h2 className="title">
            <i className="fa fa-map-marker" />
            &nbsp;Territory Managers
          </h2>
          {territoryManagerContacts.map(contact => (
            <ContactCard key={contact.name} {...contact} />
          ))}
        </section>
        <section className="contacts">
          <h2 className="title">
            <i className="fa fa-address-book" />
            &nbsp;Support
          </h2>
          {supportContacts.map(contact => (
            <ContactCard key={contact.name} {...contact} />
          ))}
        </section>
      </div>
    </div>
    <Footer />
  </AppWrapper>
);

Contacts.propTypes = {
  auth: shape({ logout: func }),
  match: shape({ params: shape({}) })
};

export default Contacts;
