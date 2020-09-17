import React, { useState, useMemo } from 'react';
import { Form, Field, Select, Button } from '@exzeo/core-ui';

import { useUser } from '../context/user-context';
import { cspConfigForSearch } from '../utilities/userResources';

import FancyExternalLink from './FancyExternalLink';
import Footer from './Footer';
import AppWrapper from './AppWrapper';
import { PRODUCT_TYPES } from '../constants/companyStateProduct';

export const GENERAL = [
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
    title: 'How To Make Online Payments',
    description: 'Instructions for completing online policy payments.',
    linkIcon: 'pdf'
  },
  {
    key: 4,
    productIcon: 'generic',
    url:
      'https://na2.docusign.net/Member/PowerFormSigning.aspx?PowerFormId=a53b4526-430e-4c7c-8489-4fa06b0f36fa&env=na2&acct=58ab9a1a-860f-4ec6-af60-2e7e54411242&v=2',
    title: 'Agent of Record Change Requirements and Form',
    description:
      'Requirements and instructions for completing Agent of Record Change.',
    linkIcon: 'link'
  }
];

export const HO3 = [
  /*{
    key: 1,
    productIcon: 'home',
    url: `${process.env.REACT_APP_DOCUMENT_URL}/marketing/ho3/TT-Pilot-Agents-one-pager.pdf`,
    title: 'TypTap Homeowners Agent Program Guide',
    description:
      'Reference guide for payments, how to login, open counties, year built and agency support.',
    linkIcon: 'pdf',
    product: PRODUCT_TYPES.home,
    state: 'FL'
  },*/
  {
    key: 2,
    productIcon: 'home',
    url: `${process.env.REACT_APP_DOCUMENT_URL}/marketing/ho3/TT-HO3-Quick-Ref-Guide.pdf`,
    title: 'TypTap Homeowners Quick Reference Guide',
    description: 'Detailed list of the TypTap HO3 underwriting guidelines.',
    linkIcon: 'pdf',
    product: PRODUCT_TYPES.home,
    state: 'FL'
  },

  {
    key: 3,
    url: `${process.env.REACT_APP_DOCUMENT_URL}/marketing/ho3/TypTap-Underwriting-Exception-Req.pdf`,
    productIcon: 'home',
    title: 'TypTap Underwriting Exception Requirements Document',
    description: 'Information needed for underwriting exception review.',
    linkIcon: 'pdf',
    product: PRODUCT_TYPES.home,
    state: 'FL'
  },
  {
    key: 4,
    url: `${process.env.REACT_APP_DOCUMENT_URL}/marketing/ho3/TT-HO3-Opening-Protection.pdf`,
    productIcon: 'home',
    title: 'Wind Mitigation Opening Protection Assistance',
    description:
      'Assistance in determining the proper Opening Protection selection in Harmony based on the insured’s Wind Mitigation.',
    linkIcon: 'pdf',
    product: PRODUCT_TYPES.home,
    state: 'FL'
  },
  {
    key: 5,
    url: `${process.env.REACT_APP_DOCUMENT_URL}/marketing/ho3/TT-HO3-Coverage-C-Exclusion-Doc.pdf`,
    productIcon: 'home',
    title: 'Coverage C Rejection Form',
    description:
      'Form required to reject Coverage C (0% Contents Coverage). All insured’s signatures required.',
    linkIcon: 'pdf',
    product: PRODUCT_TYPES.home,
    state: 'FL'
  }
];

export const AF3 = [
  {
    key: 1,
    url: `${process.env.REACT_APP_DOCUMENT_URL}/marketing/af3/TT-FL-AF3-Quick-Ref-Guide.pdf`,
    productIcon: 'flood',
    title: 'TypTap FL Flood Quick Reference Guide',
    description:
      'Detailed list of the TypTap Florida Flood underwriting guidelines.',
    linkIcon: 'pdf',
    product: PRODUCT_TYPES.flood,
    state: 'FL'
  },
  {
    key: 2,
    url: `${process.env.REACT_APP_DOCUMENT_URL}/marketing/af3/TT-NJ-AF3-Quick-Ref-Guide.pdf`,
    productIcon: 'flood',
    title: 'TypTap NJ Flood Quick Reference Guide',
    description:
      'Detailed list of the TypTap New Jersey Flood underwriting guidelines.',
    linkIcon: 'pdf',
    product: PRODUCT_TYPES.flood,
    state: 'NJ'
  },
  {
    key: 3,
    url: `${process.env.REACT_APP_DOCUMENT_URL}/marketing/af3/TT-SC-AF3-Quick-Ref-Guide.pdf`,
    productIcon: 'flood',
    title: 'TypTap SC Flood Quick Reference Guide',
    description:
      'Detailed list of the TypTap South Carolina Flood underwriting guidelines.',
    linkIcon: 'pdf',
    product: PRODUCT_TYPES.flood,
    state: 'SC'
  },
  {
    key: 4,
    url: `${process.env.REACT_APP_DOCUMENT_URL}/marketing/af3/TT-AF3-Benefits-Flood-Policy.pdf`,
    productIcon: 'flood',
    title: 'Benefits of a TypTap Flood Policy',
    description:
      'Explanation for the benefits of having an admitted, private market, stand-alone flood policy with TypTap Insurance.',
    linkIcon: 'pdf',
    product: PRODUCT_TYPES.flood,
    state: ''
  },
  {
    key: 5,
    url: `${process.env.REACT_APP_DOCUMENT_URL}/marketing/af3/TT-AF3-TT-vs-NFIP.pdf`,
    productIcon: 'flood',
    title: 'TypTap vs. The NFIP',
    description: 'Coverage comparison for TypTap and the NFIP.',
    linkIcon: 'pdf',
    product: PRODUCT_TYPES.flood,
    state: ''
  },
  {
    key: 6,
    url: `${process.env.REACT_APP_DOCUMENT_URL}/marketing/af3/TT-AF3-Private-Flood-Mortgage-Adequacy.pdf`,
    productIcon: 'flood',
    title: 'Mortgage Adequacy Document',
    description:
      'Documentation providing proof of proper coverage to satisfy mortgagees.',
    linkIcon: 'pdf',
    product: PRODUCT_TYPES.flood,
    state: ''
  }
];

const baseCSPFilter = (links, stateOptions, productOptions) => {
  return links.filter(link => {
    const includeState = stateOptions.some(
      o => !link.state || o.answer === link.state
    );
    const includeProduct = productOptions.some(o => o.answer === link.product);

    return includeState && includeProduct;
  });
};

const Training = () => {
  const [filter, setFilter] = useState({ state: '', product: '' });
  const userProfile = useUser();
  const { stateOptions, productOptionMap, productOptions } = useMemo(
    () => cspConfigForSearch(userProfile, 'PolicyData:Transactions:*', 'READ'),
    [userProfile]
  );

  const usersHomeownersLinks = baseCSPFilter(HO3, stateOptions, productOptions);
  const usersFloodLinks = baseCSPFilter(AF3, stateOptions, productOptions);

  const filterLinks = productType => link => {
    if (!filter.state && !filter.product) return link;

    if (!filter.product || filter.product === productType) {
      return !filter.state || !link.state || link.state === filter.state;
    }
  };

  const homeownersLinks = usersHomeownersLinks.filter(
    filterLinks(PRODUCT_TYPES.home)
  );
  const floodLinks = usersFloodLinks.filter(filterLinks(PRODUCT_TYPES.flood));

  return (
    <AppWrapper routeClassName="main training">
      <div className="filter" style={{ width: '100%' }}>
        <Form initialValues={filter} onSubmit={values => setFilter(values)}>
          {({ handleSubmit, values }) => (
            <>
              <Field name="state">
                {({ input, meta }) => (
                  <Select
                    input={input}
                    meta={meta}
                    dataTest="state-filter"
                    placeholder="All"
                    placeholderDisabled={false}
                    answers={stateOptions}
                    label="Filter by State"
                  />
                )}
              </Field>

              <Field name="product">
                {({ input, meta }) => (
                  <Select
                    input={input}
                    meta={meta}
                    dataTest="product-filter"
                    placeholder="All"
                    placeholderDisabled={false}
                    answers={
                      values.state
                        ? productOptionMap[values.state]
                        : productOptions
                    }
                    label="Filter by Product"
                  />
                )}
              </Field>

              <Button onClick={handleSubmit} data-test="set-filter">
                Update&nbsp;
                <i className="fa fa-search" />
              </Button>
            </>
          )}
        </Form>
      </div>
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
              {GENERAL.map(link => (
                <FancyExternalLink key={link.key} {...link} />
              ))}
            </ul>

            {homeownersLinks.length > 0 && (
              <ul className="link-list homeowners-reference-links">
                <h4>
                  <u>TypTap Homeowners Documents</u>
                </h4>
                {homeownersLinks.map(link => (
                  <FancyExternalLink key={link.key} {...link} />
                ))}
              </ul>
            )}

            {floodLinks.length > 0 && (
              <ul className="link-list flood-reference-links">
                <h4>
                  <u>TypTap Flood Documents</u>
                </h4>
                {floodLinks.map(link => (
                  <FancyExternalLink key={link.key} {...link} />
                ))}
              </ul>
            )}
          </section>
        </div>
      </div>
      <Footer />
    </AppWrapper>
  );
};

export default Training;
