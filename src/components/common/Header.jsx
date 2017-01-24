import React from 'react';
import logo from '../../img/TypTap.svg';

const Header = () => (
  <header>
    <div role="banner">
      <div id="logo" className="logo">
        <img src={logo} alt="TypTap Insurance" />
      </div>

      <nav>
        <a href="https://www.typtap.com">HOME</a>
        <a href="https://www.typtap.com" className="active">AGENTS</a>
        <a href="https://www.typtap.com">POLICYHOLDERS</a>
        <a className="link-phone" href="tel:+844-289-7968"><i className="fa fa-phone" /> (844) 289-7968</a>
      </nav>
    </div>
  </header>
);

export default Header;
