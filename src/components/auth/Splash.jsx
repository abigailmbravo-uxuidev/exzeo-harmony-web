import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import logoHarmony from '../../img/logo.svg';
import BoolInput from '../common/form/BoolInput'

const Splash = ({ splashScreen, loginMessage }) => {
  if (splashScreen) {
    return (
      <div className="splash" role="article">
        <div className="fade-in">
          <img src={logoHarmony} width="120px" height="120px" alt="harmony-logo" />
          <small>Powered by</small>
          <small>PROJECT HARMONY</small>
          <h2>Welcome to</h2>
          <h1>Project {window.appConfig.appTitle}</h1>
          {loginMessage ? <h3>Please <Link to="/login">login</Link> to continue!</h3> : null}
        </div>
      </div>


      // <div className="workflow" role="article">
      //   <div className="fade-in">
      //           <div className="workflow-content">
      //                   <section>
      //                   <form className="fade-in " id="survey" novalidate="">
      //                           <div className="form-group survey-wrapper">
      //
      //                                   <section className="display-element demographics">
      //                                   <h3>Quote details</h3>
      //
      //                                     <dl>
      //                                       <div>
      //                                         <dt>Quote Number</dt>
      //                                         <dd>TT-12345678-01</dd>
      //                                       </div>
      //                                     </dl>
      //                                     <dl>
      //                                       <div>
      //                                         <dt>Property address</dt>
      //                                         <dd>1234 South Main Street</dd>
      //                                       </div>
      //                                     </dl>
      //                                     <dl>
      //                                       <div>
      //                                         <dt>Annual premium</dt>
      //                                         <dd>$123456</dd>
      //                                       </div>
      //                                     </dl>
      //
      //
      //
      //                                   {/*BoolInput component with addition of class: "verification"*/}
      //                                   <div className="form-group switch  verification">
      //                                     <label htmlFor="test">Confirmed
      //                                       <input
      //                                         type="checkbox"
      //                                         name="test"
      //                                         checked={false}
      //                                       />
      //                                       <div className="switch-div" />
      //                                       {/*needed to add a span element for marker icon*/}
      //                                       <span></span>
      //                                     </label>
      //                                   </div>
      //
      //
      //                                   </section>
      //
      //
      //                                   <section className="display-element demographics">
      //                                   <h3>Demographics</h3>
      //
      //                                     <dl>
      //                                       <div>
      //                                         <dt>Policyholder first name</dt>
      //                                         <dd>John</dd>
      //                                       </div>
      //                                     </dl>
      //                                     <dl>
      //                                       <div>
      //                                         <dt>Policyholder last name</dt>
      //                                         <dd>Doe</dd>
      //                                       </div>
      //                                     </dl>
      //                                     <dl>
      //                                       <div>
      //                                         <dt>Email address</dt>
      //                                         <dd>john.doe@gmail.com</dd>
      //                                       </div>
      //                                     </dl>
      //
      //
      //
      //                                   {/*BoolInput component with addition of class: "verification"*/}
      //                                   <div className="form-group switch  verification">
      //                                     <label htmlFor="test">Confirmed
      //                                       <input
      //                                         type="checkbox"
      //                                         name="test"
      //                                         checked={false}
      //                                       />
      //                                       <div className="switch-div" />
      //                                       {/*needed to add a span element for marker icon*/}
      //                                       <span></span>
      //                                     </label>
      //                                   </div>
      //
      //
      //                                   </section>
      //
      //                           </div>
      //                           <div className="workflow-steps">
      //                           <button className="btn btn-primary" type="submit" form="survey">next</button></div>
      //                           <footer><div role="banner">
      //                                   <small>©2017 TypTap Management Company. All rights reserved.</small></div>
      //                           </footer>
      //                   </form>
      //           </section>
      //           </div>
      //   </div>
      // </div>
    );
  }
  return <h3>Project | Harmony</h3>;
};

Splash.propTypes = {
  splashScreen: PropTypes.bool,
  loginMessage: PropTypes.bool,
};

Splash.displayName = 'Splash';

const mapStateToProps = state => ({
  splashScreen: state.features.get('splash-screen'),
  loginMessage: state.features.get('login-message'),
});

export default connect(mapStateToProps)(Splash);
