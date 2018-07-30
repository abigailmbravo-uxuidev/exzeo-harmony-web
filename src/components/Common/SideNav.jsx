import React from 'react';
import { NavLink } from 'react-router-dom';

// Example of a possible schema
/**
 * {
 *  link,
 *  label,
 *  styleName,
 *  exact,
 *  outside
 * }
 */
const agentLinks = [{
  link: '/',
  label: 'DASHBOARD',
  styleName: 'agent-dashboard',
  exact: true
},
/* FLOOD QUOTE WILL BE ADDED PHASE 2*/
// {
//   label: 'FLOOD QUOTE',
//   styleName: 'agent-flood label',
//   outside: true,
//   formName: 'floodQuoteForm'
// },
  {
    link: '/quote',
    label: 'HO3 QUOTE',
    styleName: 'agent-homeowners label'
  },
  {
    link: '/policySearch',
    label: 'HO3 POLICY',
    styleName: 'agent-homeowners label'
  }];

const formSubmitFloodQuote = () => {
  document.getElementsByName('formSubmitFloodQuote')[0].click();
};

const SideNav = () => (
  <nav className="site-nav">
    <ul>
      {agentLinks && agentLinks.length > 0 && agentLinks.map((agentLink, index) => (
        agentLink.outside ?
          <li key={index}>
            {agentLink.formName ?
              <a className={agentLink.styleName} href="#floodQuote" onClick={() => formSubmitFloodQuote()}>
                <i className="fa" />
                <span>{agentLink.label}</span>
              </a> :
              <a className={agentLink.styleName} href={agentLink.link}>
                <i className="fa" />
                <span>{agentLink.label}</span>
              </a>
            }
          </li> :
          <li key={index}>
            <NavLink exact={agentLink.exact} className={agentLink.styleName} to={agentLink.link} activeClassName="active">
              <i className="fa" />
              <span>{agentLink.label}</span>
            </NavLink>
          </li>
      ))}
    </ul>
    <button name="formSubmitFloodQuote" type="submit" form="floodQuoteForm" style={{ display: 'none' }} />
  </nav>
);

// TODO: Needs to be connected to wherever it's gonnna get nav links from
export default SideNav;
