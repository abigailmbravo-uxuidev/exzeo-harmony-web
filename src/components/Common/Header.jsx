import React from 'react';
import PropTypes from 'prop-types';
import logo from '../../img/TypTap.svg';

const LINKS = [
  {
    className: 'link-phone btn',
    to: 'tel:844-289-7968',
    label: '844-289-7968'
  }
];

const Header = ({ toggleSideNav }) => (
  <header>
    <div role="banner">
      <button className="btn-icon btn-bars" onClick={toggleSideNav}>
        <i className="fa fa-bars" />
      </button>
      <a id="logo" className="logo" href="/">
        <img src={logo} alt="TypTap Insurance" />
      </a>
      <nav>
        {LINKS.map(link => (
          <a key={link.label} className={link.className} href={link.to}>
            {link.label}
          </a>
        ))}
      </nav>
    </div>
  </header>
);

Header.propTypes = {
  toggleSideNav: PropTypes.func.isRequired
};

export default Header;
