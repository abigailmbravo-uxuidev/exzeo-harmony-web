import React from 'react';

import FancyExternalLink from '../components/FancyExternalLink';
import Footer from '../components/Footer';
import AppWrapper from '../components/AppWrapper';

export const externalLinks = [
  {
    key: 1,
    productIcon: 'generic',
    url: 'https://cdn.typtap.com/2019/03/TypTap-Commision-Schedule.pdf',
    title: 'Commission Addendum',
    description: 'Homeowners and Flood Insurance commission schedule.',
    linkIcon: 'pdf'
  },
  {
    key: 2,
    productIcon: 'home',
    url: 'https://cdn.typtap.com/2018/12/TT-Pilot-Agents-one-pager-112818.pdf',
    title: 'TypTap Homeowners Agent Program Guide',
    description:
      'Reference guide for payments, how to login, open counties, year built and agency support.',
    linkIcon: 'pdf'
  },
  {
    key: 3,
    productIcon: 'home',
    url: 'https://cdn.typtap.com/2019/01/TT-HO3-Quick-Ref-Guide.pdf',
    title: 'TypTap Homeowners Quick Reference Guide',
    description: 'Detailed list of the TypTap HO3 underwriting guidelines.',
    linkIcon: 'pdf'
  },
  {
    key: 4,
    url: 'https://cdn.typtap.com/2019/03/TT-HO3-County-Map.pdf',
    productIcon: 'home',
    title: 'TypTap Homeowners County Map',
    description: 'Where TypTap HO3 product is currently available.',
    linkIcon: 'pdf'
  },
  {
    key: 5,
    url: 'https://cdn.typtap.com/2019/03/TypTap-Underwriting-Exception-Req.pdf',
    productIcon: 'home',
    title: 'TypTap Underwriting Exception Requirements Document',
    description: 'Information needed for underwriting exception review.',
    linkIcon: 'pdf'
  }
];

const Training = ({ auth, match }) => (
  <AppWrapper
    logout={auth.logout}
    match={match}
    routeClassName="train"
    render={() => (
      <div className="route">
        <div className="route-content">
          <div className="scroll">
            <div className="detail-wrapper">
              <section>
                <h2>Reference</h2>
                <ul className="link-list reference-links">
                  {externalLinks.map(link => (
                    <FancyExternalLink key={link.key} {...link} />
                  ))}
                </ul>
              </section>
            </div>
          </div>
          <Footer />
        </div>
      </div>
    )}
  />
);

export default Training;
