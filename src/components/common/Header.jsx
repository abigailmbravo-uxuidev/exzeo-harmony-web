import React from 'react';
import logo from '../../img/TypTap.svg';

const Header = () => (
  <header>
    <div role="banner">
      <div id="logo" className="logo">
        <img src={logo} alt="TypTap Insurance" />
      </div>
      <button className="btn-icon btn-ellipsis-v"><i className="fa fa-ellipsis-v"></i></button>
      <nav>
        <a href="https://www.typtap.com">HOME</a>
        <a href="" className="active">AGENTS</a>
        <a href="https://www.typtap.com">POLICYHOLDERS</a>
        <a className="link-phone btn" href="tel:+844-289-7968"><i className="fa fa-phone" /><span>844-289-7968</span></a>
      </nav>
    </div>
  </header>
);

export default Header;
