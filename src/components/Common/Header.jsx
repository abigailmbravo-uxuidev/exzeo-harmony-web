import React from 'react';
import logo from '../../img/TypTap.svg';

const Header = () => (
  <header>
    <div role="banner">
      <button className="btn-icon btn-bars"><i className="fa fa-bars" /></button>
      <div id="logo" className="logo">
        <img src={logo} alt="TypTap Insurance" />
      </div>
      <button className="btn-icon btn-ellipsis-v"><i className="fa fa-ellipsis-v" /></button>
      <nav className="fade-in">
        <a href="https://www.typtap.com">HOME</a>
        <a href="" className="active">AGENTS</a>
        <a href="https://policyholder.typtap.com/login">POLICYHOLDERS</a>
        <a className="link-phone btn" href="tel:+844-289-7968"><i className="fa fa-phone" /><span>844-289-7968</span></a>
      </nav>
    </div>
  </header>
);

export default Header;