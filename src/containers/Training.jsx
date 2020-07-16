import React from 'react';

import FancyExternalLink from '../components/FancyExternalLink';
import Footer from '../components/Footer';
import AppWrapper from '../components/AppWrapper';

export const externalLinksGeneric = [
  {
    key: 1,
    productIcon: 'generic',
    url: `${process.env.REACT_APP_DOCUMENT_URL}/marketing/generic/TypTap-Commision-Schedule.pdf`,
    title: 'Commission Addendum',
    description: 'Homeowners and Flood Insurance commission schedule.',
    linkIcon: 'pdf'
  },
  {
    key: 2,
    productIcon: 'generic',
    url: `${process.env.REACT_APP_DOCUMENT_URL}/marketing/generic/Who-Is-TypTap.pdf`,
    title: 'Who Is TypTap',
    description: 'Brief summary of information about TypTap Insurance.',
    linkIcon: 'pdf'
  },
  {
    key: 3,
    productIcon: 'generic',
    url: `${process.env.REACT_APP_DOCUMENT_URL}/marketing/generic/How-To-Online-Payments.pdf`,
    title: 'How To Online Payments',
    description: 'Instructions for completing online policy payments.',
    linkIcon: 'pdf'
  }
];

export const externalLinksHome = [
  {
    key: 1,
    productIcon: 'home',
    url: `${process.env.REACT_APP_DOCUMENT_URL}/marketing/ho3/TT-Pilot-Agents-one-pager.pdf`,
    title: 'TypTap Homeowners Agent Program Guide',
    description:
      'Reference guide for payments, how to login, open counties, year built and agency support.',
    linkIcon: 'pdf'
  },
  {
    key: 2,
    productIcon: 'home',
    url: `${process.env.REACT_APP_DOCUMENT_URL}/marketing/ho3/TT-HO3-Quick-Ref-Guide.pdf`,
    title: 'TypTap Homeowners Quick Reference Guide',
    description: 'Detailed list of the TypTap HO3 underwriting guidelines.',
    linkIcon: 'pdf'
  },

  {
    key: 3,
    url: `${process.env.REACT_APP_DOCUMENT_URL}/marketing/ho3/TypTap-Underwriting-Exception-Req.pdf`,
    productIcon: 'home',
    title: 'TypTap Underwriting Exception Requirements Document',
    description: 'Information needed for underwriting exception review.',
    linkIcon: 'pdf'
  },
  {
    key: 4,
    url: `${process.env.REACT_APP_DOCUMENT_URL}/marketing/ho3/TT-HO3-Opening-Protection.pdf`,
    productIcon: 'home',
    title: 'Wind Mitigation Opening Protection Assistance',
    description:
      'Assistance in determining the proper Opening Protection selection in Harmony based on the insured’s Wind Mitigation.',
    linkIcon: 'pdf'
  },
  {
    key: 5,
    url: `${process.env.REACT_APP_DOCUMENT_URL}/marketing/ho3/TT-HO3-Coverage-C-Exclusion-Doc.pdf`,
    productIcon: 'home',
    title: 'Coverage C Rejection Form',
    description:
      'Form required to reject Coverage C (0% Contents Coverage). All insured’s signatures required.',
    linkIcon: 'pdf'
  }
];

export const externalLinksFlood = [
  {
    key: 1,
    url: `${process.env.REACT_APP_DOCUMENT_URL}/marketing/af3/TT-FL-AF3-Quick-Ref-Guide.pdf`,
    productIcon: 'flood',
    title: 'TypTap FL Flood Quick Reference Guide',
    description:
      'Detailed list of the TypTap Florida Flood underwriting guidelines.',
    linkIcon: 'pdf'
  },
  {
    key: 2,
    url: `${process.env.REACT_APP_DOCUMENT_URL}/marketing/af3/TT-NJ-AF3-Quick-Ref-Guide.pdf`,
    productIcon: 'flood',
    title: 'TypTap NJ Flood Quick Reference Guide',
    description:
      'Detailed list of the TypTap New Jersey Flood underwriting guidelines.',
    linkIcon: 'pdf'
  },
  {
    key: 3,
    url: `${process.env.REACT_APP_DOCUMENT_URL}/marketing/af3/TT-SC-AF3-Quick-Ref-Guide.pdf`,
    productIcon: 'flood',
    title: 'TypTap SC Flood Quick Reference Guide',
    description:
      'Detailed list of the TypTap South Carolina Flood underwriting guidelines.',
    linkIcon: 'pdf'
  },
  {
    key: 4,
    url: `${process.env.REACT_APP_DOCUMENT_URL}/marketing/af3/TT-AF3-Benefits-Flood-Policy.pdf`,
    productIcon: 'flood',
    title: 'Benefits of a TypTap Flood Policy',
    description:
      'Explanation for the benefits of having an admitted, private market, stand-alone flood policy with TypTap Insurance.',
    linkIcon: 'pdf'
  },
  {
    key: 5,
    url: `${process.env.REACT_APP_DOCUMENT_URL}/marketing/af3/TT-AF3-TT-vs-NFIP.pdf`,
    productIcon: 'flood',
    title: 'TypTap vs. The NFIP',
    description: 'Coverage comparison for TypTap and the NFIP.',
    linkIcon: 'pdf'
  },
  {
    key: 6,
    url: `${process.env.REACT_APP_DOCUMENT_URL}/marketing/af3/TT-AF3-Private-Flood-Mortgage-Adequacy.pdf`,
    productIcon: 'flood',
    title: 'Mortgage Adequacy Document',
    description:
      'Documentation providing proof of proper coverage to satisfy mortgagees.',
    linkIcon: 'pdf'
  }
];

const Training = ({ auth, match }) => (
  <AppWrapper auth={auth} match={match} routeClassName="main training">
    <div className="scroll">
      <div className="detail-wrapper">
        <section className="reference">
          <h2 className="title">
            <i className="fa fa-book" />
            &nbsp;Reference
          </h2>
          <ul className="link-list general-reference-links">
            <h4>
              <u>General Documents</u>
            </h4>
            {externalLinksGeneric.map(link => (
              <FancyExternalLink key={link.key} {...link} />
            ))}
          </ul>
          <ul className="link-list homeowners-reference-links">
            <h4>
              <u>TypTap Homeowners Documents</u>
            </h4>
            {externalLinksHome.map(link => (
              <FancyExternalLink key={link.key} {...link} />
            ))}
          </ul>

          <ul className="link-list flood-reference-links">
            <h4>
              <u>TypTap Flood Documents</u>
            </h4>
            {externalLinksFlood.map(link => (
              <FancyExternalLink key={link.key} {...link} />
            ))}
          </ul>
        </section>
      </div>
    </div>
    <Footer />
  </AppWrapper>
);

export default Training;
