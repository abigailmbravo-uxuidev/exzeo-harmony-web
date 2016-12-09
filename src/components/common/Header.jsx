import React from 'react';
import logo from '../../img/TypTap.svg';

const Header = () => {
    return (
    <header>
        <div role="banner">
                <div id="logo" className="logo">
                        <img src={logo} alt="TypTap Insurance" />
                </div>
                <h1>Agency App</h1>
                <nav>
                        <a href="https://www.typtap.com"><i className="fa fa-globe"></i> Typtap.com</a>
                        <a class="link-phone" href="tel:+844-289-7968"><i className="fa fa-phone"></i> (844) 289-7968</a>
                </nav>
                <a href=""><i className="fa fa-user-circle-o"></i> firstName lastName</a>
        </div>
    </header>
    );
};

export default Header;
