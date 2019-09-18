import classNames from 'classnames';

export const getNavLinks = (params, status) => [
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
    to: status === 'Active' ? '/search/address' : '#',
    label: 'NEW QUOTE',
    styleName:
      status === 'Active' ? 'new-quote label' : 'new-quote label diabled',
    hasIcon: true
  },
  {
    key: 'searchQuotes',
    to: status === 'Active' || status === 'Pending' ? '/search/retrieve' : '#',
    label: 'QUOTES',
    styleName:
      status === 'Active' || status === 'Pending'
        ? 'quote label'
        : 'quote label diabled',
    hasIcon: true
  },
  {
    key: 'policy',
    to: '/policy',
    label: 'POLICIES',
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
