import classNames from 'classnames';

export const getNavLinks = (params, enableQuote, enableRetrieve) => {
  const quoteClasses = enableRetrieve ? 'quote label' : 'quote label disabled';

  return [
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
      to: enableQuote ? '/search/address' : '#',
      label: 'NEW QUOTE',
      styleName: enableQuote ? 'new-quote label' : 'new-quote label disabled',
      hasIcon: true
    },
    {
      key: 'searchQuotes',
      to: enableRetrieve ? '/search/retrieve' : '#',
      label: 'QUOTES',
      styleName: classNames(quoteClasses, {
        'quote-detail': params.quoteNumber
      }),
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
};
