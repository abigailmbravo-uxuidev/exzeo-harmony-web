import classNames from 'classnames';

export const getNavLinks = ({ params }) => [
  {
    key: 'home',
    to: '/',
    label: 'DASHBOARD',
    styleName: 'agent-dashboard',
    hasIcon: true,
    exact: true
  },
  {
    key: 'searchAddress',
    to: '/search/address',
    label: 'NEW QUOTE',
    styleName: 'new-quote label',
    hasIcon: true
  },
  {
    key: 'searchQuotes',
    to: '/search/retrieve',
    label: 'QUOTES',
    styleName: 'quote label',
    hasIcon: true
  },
  {
    key: 'policy',
    to: '/policy',
    label: 'POLICY',
    styleName: classNames('policy label', {
      'policy-detail': params.policyNumber
    }),
    hasIcon: true
  },
  {
    key: 'contacts',
    to: '/contacts',
    label: 'CONTACTS',
    styleName: 'contacts label',
    hasIcon: true
  },
  {
    key: 'training',
    to: '/training',
    label: 'HELPFUL INFO',
    styleName: 'training label',
    hasIcon: true
  }
];
