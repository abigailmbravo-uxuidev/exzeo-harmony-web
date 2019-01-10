import React from 'react';
// import PropTypes from 'prop-types';

import BaseConnect from './Base';
import FancyExternalLink from '../components/FancyExternalLink';
import Footer from '../components/Common/Footer';

const externalLinks = [
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

const Training = props => (
  <BaseConnect {...props}>
    <div className="train" role="article">
      <div className="route">
        <div className="route-content">
          <div className="scroll">
            <div className="survey-wrapper">
              <section className="reference-links">
                <h2>Reference</h2>

                <ul className="link-list">
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
    </div>
  </BaseConnect>
);

// Training.propTypes = {
//   children: PropTypes.shape()
// };

export default Training;
