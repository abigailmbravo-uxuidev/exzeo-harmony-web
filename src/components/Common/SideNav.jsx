import React from 'react';
import { NavLink } from 'react-router-dom';
import classNames from 'classnames';


const agentLinks = [
  {
    link: '/',
    label: 'DASHBOARD',
    styleName: 'agent-dashboard',
    exact: true
  },
  {
    link: '/quote/searchAddress',
    label: 'QUOTE',
    styleName: 'quote label'
  },
  {
    link: '/policy',
    label: 'POLICY',
    styleName: 'policy label'
  },
  {
    link: '/training',
    label: 'HELPFUL INFO',
    styleName: 'training label'
  }
];

const SideNav = ({ params }) => (
  <nav className="site-nav">
    <ul>
      {agentLinks.map((agentLink, index) => (
        <li key={index}>
          <NavLink exact={agentLink.exact} className={classNames(agentLink.styleName, { 'policy-detail': params.policyNumber })} to={agentLink.link} activeClassName="active">
            <i className="fa" />
            <span>{agentLink.label}</span>
          </NavLink>
        </li>
      ))}
    </ul>
  </nav>
);

export default SideNav;
