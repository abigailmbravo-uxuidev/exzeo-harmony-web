import React from 'react';
import { shape, func } from 'prop-types';

import AppWrapper from '../components/AppWrapper';
import ContactCard from '../components/Contacts/ContactCard'
import Footer from '../components/Common/Footer';

const territoryManagerContacts = [
  {
    image: 'Clark-Ramos',
    name: 'Clark Ramos',
    title: 'Southeast Florida Rep',
    phone: '7865171810',
    cell: '3053216071',
    email: 'cramos@hcpci.com'
  },
  {
    image: 'Edward-Spegowski',
    name: 'Edward Spegowski',
    title: 'Southwest Florida Rep',
    phone: '8134195243',
    email: 'espegowski@hcpci.com'
  },
  {
    image: 'Jodi-Kelley',
    name: 'Jodi Kelley',
    title: 'Northeast Florida Rep',
    phone: '8134195220',
    email: 'jkelley@hcpci.com'
  },
  {
    image: 'Victor-Ferdinandi',
    name: 'Victor Ferdinandi',
    title: 'West Central Florida Rep',
    phone: '8134195245',
    email: 'vferdinandi@hcpci.com'
  }
];

const supportContacts = [
  {
    image: '',
    name: 'Agency Support',
    title: '',
    phone: '8442897968',
    extension: 'option 5',
    email: 'agencysupport@typtap.com'
  },
  {
    image: '',
    name: 'Customer Service',
    title: '',
    phone: '8442897968',
    extension: 'option 2',
    email: 'customerservice@typtap.com'
  },
  {
    image: '',
    name: 'Payments',
    title: '',
    phone: '8442897968',
    extension: 'option 3',
    email: 'customerservice@typtap.com',
    address1: 'Payable to: TypTap Management Company',
    address2: 'PO Box 1120',
    city: 'Ocala',
    state: 'FL',
    zip: '34478',
    message: 'Provide Policy #, Insured Name, Insured Address. We currently only accept payments via phone using Visa, MasterCard and Discover.'
  },
  {
    image: '',
    name: 'Claims',
    title: '',
    phone: '8442897968',
    extension: 'option 1',
    email: 'claims@typtap.com'
  }
];

const Contacts = ({ auth, match }) => (
  <AppWrapper logout={auth.logout} match={match} routeClassName="train">
    <div className="route">
      <div className="route-content">
        <div className="scroll">
          <div className="survey-wrapper">
            <section className="contacts">
              <h2>Territory Representatives</h2>
              <p>Your territory rep is the first point of contact for...</p>
              {territoryManagerContacts.map(contact => (
                <ContactCard key={contact.name} {...contact} />
              ))}
            </section>
            <section className="contacts">
              <h2>Support</h2>
              <p>Support should be contacted for...</p>
              {supportContacts.map(contact => (
                <ContactCard key={contact.name} {...contact} />
              ))}
            </section>
          </div>
          <Footer />
        </div>
      </div>
    </div>
  </AppWrapper>
);

Contacts.propTypes = {
  auth: shape({ logout: func }),
  match: shape({ params: shape({}) }),
};

export default Contacts;
