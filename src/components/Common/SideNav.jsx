import React from 'react';
import { shape, string } from 'prop-types';
import classNames from 'classnames';
import { SideNavigation } from '@exzeo/core-ui/src/@Harmony';


const getNavLinks = ({ params }) => [
  {
    key: '1',
    to: '/',
    label: 'DASHBOARD',
    styleName: 'agent-dashboard',
    hasIcon: true,
    exact: true,
  },
  {
    key: '2',
    to: '/search/address',
    label: 'QUOTE',
    styleName: 'quote label',
    hasIcon: true,
  },
  {
    key: '3',
    to: '/policy',
    label: 'POLICY',
    styleName: classNames('policy label', { 'policy-detail': params.policyNumber }),
    hasIcon: true,
  },
  {
    key: '4',
    to: '/training',
    label: 'HELPFUL INFO',
    styleName: 'training label',
    hasIcon: true,
  }
];

const SideNav = ({ params }) => (
  <nav className="site-nav">
    <SideNavigation navLinks={getNavLinks({ params })} />
  </nav>
);

SideNav.propTypes = {
  params: shape({
    policyNumber: string
  }).isRequired,
};

export default SideNav;
