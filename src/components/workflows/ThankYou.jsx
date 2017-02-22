import React from 'react';
import Footer from '../common/Footer';

const ThankYou = () => (
        <div className="thanks-content" role="article">
          {/* HARD STOP WORKFLOW ERROR*/}
          <div className="survey-wrapper">
            <div className="contact-message">
              <div className="card card-thanks">
              <div className="card-header image card-header-image-thanks">
                <h4><i className="fa fa-smile-o"></i> Thank You</h4>
              </div>
              <div className="card-block">
                <h4 className="error-message">Please check your email for a link to continue</h4>
                <p>Thanks for choosing TypTap. We have sent all required documents to your client to sign electronically. Upon receiving their signatures you will be notified via email.</p>
                <p>If you have any issues, please contact one of our representatives so they may further assist you.</p>

              </div>
              <div className="contact-methods card-footer">
                <a href="mailto:customerservice@typtap.com"><i className="fa fa-envelope"/> email us</a>
                <a href="tel:8442897968"><i className="fa fa-phone"/> (844) 289-7968</a>
              </div>
            </div>
            </div>
          </div>
          <Footer/>
  </div>
);

export default ThankYou;
