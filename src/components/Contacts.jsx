import React from 'react';
import { shape } from 'prop-types';

import territoryMap from '../img/territory-manager-map.png';

import AppWrapper from './AppWrapper';
import ContactCard from './ContactCard';
import Footer from './Footer';

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
    icon: 'image traci-lebeda',
    name: 'Traci Lebeda',
    title: 'Treasure Coast Florida Manager',
    phone: '8134053610',
    email: 'tlebeda@typtap.com'
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
    name: 'Payments (Online Payments Available)',
    title: '',
    phone: '',
    message:
      'PAYABLE TO: TYPTAP MANAGEMENT COMPANY, PO BOX 1120, OCALA, FL 34478',
    email: 'customerservice@typtap.com',
    disclaimer:
      'Provide Policy #, Insured Name, Insured Address. Online payments is available under the policy billing tab. We accept Visa, MasterCard, Discover or Electronic check.'
  }
];

const Contacts = () => (
  <AppWrapper routeClassName="main contacts">
    <div className="scroll">
      <div className="detail-wrapper">
        <section className="contacts territory">
          <h2 className="title">
            <i className="fa fa-map-marker" />
            &nbsp;Territory Managers
          </h2>
          <div className="territory-managers">
            {territoryManagerContacts.map((contact, i) => (
              <ContactCard key={i} {...contact} />
            ))}
          </div>
          <div className="territory-map">
            <img src={territoryMap} alt="Territory Map" />
          </div>
        </section>
        <section className="contacts">
          <div className="support-header">
            <h2 className="title">
              <i className="fa fa-phone-square" />
              &nbsp;All Departments
            </h2>
            <h2 className="telephone-link">
              &nbsp;|&nbsp;<a href="tel:8442897968">(844) 289-7968</a>
            </h2>
          </div>
          {supportContacts.map((contact, i) => (
            <ContactCard key={i} {...contact} />
          ))}
        </section>
      </div>
    </div>
    <Footer />
  </AppWrapper>
);

export default Contacts;
