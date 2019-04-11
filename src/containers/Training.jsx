import React from 'react';

import FancyExternalLink from '../components/FancyExternalLink';
import Footer from '../components/Common/Footer';
import AppWrapper from '../components/AppWrapper';

export const externalLinks = [
  {
    key: 1,
    productIcon: 'home',
    url: 'https://cdn.typtap.com/2018/12/TT-Pilot-Agents-one-pager-112818.pdf',
    title: 'TypTap Homeowners Agent Program Guide',
    description: 'Reference guide for payments, how to login, open counties, year built and agency support.',
    linkIcon: 'pdf'
  },
  {
    key: 2,
    productIcon: 'home',
    url: 'https://cdn.typtap.com/2019/01/TT-HO3-Quick-Ref-Guide.pdf',
    title: 'TypTap Homeowners Quick Reference Guide',
    description: 'Detailed list of the TypTap HO3 underwriting guidelines.',
    linkIcon: 'pdf'
  },
  {
    key: 5,
    url: 'https://cdn.typtap.com/2019/01/TT-HO3-County-Map-1218.pdf',
    productIcon: 'home',
    title: 'TypTap Homeowners County Map (Updated December 2018)',
    description: 'Where TypTap HO3 product is currently available.',
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
            <div className="survey-wrapper">
              <section>
                <h2>Reference</h2>
                <ul className="link-list reference-links">
                  {externalLinks.map(link => (
                    <FancyExternalLink key={link.key} {...link} />
                  ))}
                </ul>
              </section>
            </div>
            <Footer />
          </div>
        </div>
      </div>
    )}
  />
);

export default Training;
