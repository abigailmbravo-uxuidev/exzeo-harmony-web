import React, { PropTypes } from 'react';
import logo from '../../img/TypTap.svg';

const sideBarLinks = [{
  link: 'https://www.typtap.com',
  label: 'HOME'
}, {
  link: '',
  label: 'AGENTS'
}, {
  link: 'https://policyholder.typtap.com/login',
  label: 'POLICYHOLDERS'
}, {
  className: 'link-phone btn',
  link: 'tel:+844-289-7968',
  label: '844-289-7968'
}];

const Header = ({ toggleHeader, toggle, active }) => (
  <header className={active ? 'blur' : ''}>
    <div role="banner">
      <button className="btn-icon btn-bars" onClick={toggleHeader}><i className="fa fa-bars" /></button>
      <div id="logo" className="logo">
        <img src={logo} alt="TypTap Insurance" />
      </div>
      <button className="btn-icon btn-ellipsis-v"><i
        className="fa fa-ellipsis-v"
        onClick={toggle}
      /></button>
      <nav className={active ? 'active' : ''}>
        {sideBarLinks && sideBarLinks.length > 0 && sideBarLinks.map(sideBarLink => (
          <a key={sideBarLink.label} className={sideBarLink.className} href={sideBarLink.link}>{sideBarLink.label}</a>
              ))}
      </nav>
      <div className={active ? 'nav-modal active' : 'nav-modal'} onClick={toggle} />
    </div>
  </header>
);

Header.propTypes = {
  toggle: PropTypes.func,
  toggleHeader: PropTypes.func,
  active: PropTypes.bool
};

export default Header;
