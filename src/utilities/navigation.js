import React from 'react';
import classNames from 'classnames';

export const getNavLinks = (
  params,
  enableQuote,
  enableRetrieve,
  enableReports
) => {
  return [
    {
      key: 'home',
      to: '/',
      className: 'agent-dashboard',
      exact: true,
      icon: <i className="fa" />,
      label: <span>DASHBOARD</span>
    },
    {
      key: 'searchAddress',
      to: enableQuote ? '/search/address' : '#',
      isActive: (match, location) => location.pathname === '/search/address',
      className: classNames('new-quote label', {
        disabled: !enableQuote
      }),
      icon: <i className="fa" />,
      label: <span>NEW QUOTE</span>
    },
    {
      key: 'searchQuotes',
      to: enableRetrieve ? '/search/retrieve' : '#',
      isActive: (match, location) => location.pathname === '/search/retrieve',
      className: classNames('quote label', {
        disabled: !enableRetrieve,
        'quote-detail': params.quoteNumber
      }),
      icon: <i className="fa" />,
      label: <span>QUOTES</span>
    },
    {
      key: 'policy',
      to: '/search/policy',
      className: classNames('policy label', {
        'policy-detail': params.policyNumber
      }),
      icon: <i className="fa" />,
      label: <span>POLICIES</span>
    },
    {
      key: 'reports',
      to: '/reports',
      className: 'reports label',
      hidden: !enableReports,
      icon: <i className="fa" />,
      label: <span>REPORTS</span>
    },
    {
      key: 'contacts',
      to: '/contacts',
      className: 'contacts label',
      icon: <i className="fa" />,
      label: <span>CONTACTS</span>
    },
    {
      key: 'training',
      to: '/training',
      className: 'training label',
      icon: <i className="fa" />,
      label: <span>HELPFUL INFO</span>
    }
  ];
};
