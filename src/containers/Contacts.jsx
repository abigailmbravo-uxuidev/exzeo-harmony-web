import React from 'react';
import { shape, func } from 'prop-types';

import teritoryMap from '../img/territory-manager-map.png';

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
    icon: 'image nigel-cosey',
    name: 'Nigel Cosey',
    title: 'Treasure Coast Florida Manager',
    phone: '7865171850',
    email: 'NCosey@typtap.com'
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
    phone: '',
    email: 'agencysupport@typtap.com'
  },
  {
    icon: 'fa fa-life-ring',
    name: 'Claims',
    title: '',
    phone: '',
    email: 'claims@typtap.com'
  },
  {
    icon: 'fa fa-handshake-o',
    name: 'Customer Service',
    title: '',
    phone: '',
    email: 'customerservice@typtap.com'
  },
  {
    icon: 'fa fa-group',
    name: 'Marketing',
    title: '',
    phone: '',
    email: 'marketing@typtap.com'
  },
  {
    icon: 'fa fa-credit-card',
    name: 'Payments',
    title: '',
    message:
      'PAYABLE TO: TYPTAP MANAGEMENT COMPANY, PO BOX 1120, OCALA, FL 34478',
    extension: 'option 3',
    email: 'customerservice@typtap.com',
    disclaimer:
      'Provide Policy #, Insured Name, Insured Address. We currently only accept payments via phone using Visa, MasterCard and Discover.'
  }
];

const Contacts = ({ auth, match }) => (
  <AppWrapper auth={auth} match={match} routeClassName="main contacts">
    <div className="scroll">
      <div className="detail-wrapper">
        <section className="contacts territory">
          <h2 className="title">
            <i className="fa fa-map-marker" />
            &nbsp;Territory Managers
          </h2>
          <div className="territory-managers">
            {territoryManagerContacts.map(contact => (
              <ContactCard key={contact.name} {...contact} />
            ))}
          </div>
          <div className="territory-map">
            <img src={teritoryMap} alt="Territory Map" />
          </div>
        </section>
        <section className="contacts">
          <h2 className="title">
            <i className="fa fa-phone-square" />
            &nbsp;All Departments | <span>(844) 289-7968</span>
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
