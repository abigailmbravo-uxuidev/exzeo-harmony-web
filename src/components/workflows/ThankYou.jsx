import React from 'react';
import Footer from '../common/Footer';

const ThankYou = () => (
        <div className="workflow-content">
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
                <p>Thanks for choosing TypTap. We have sent your client all required documents to sign electronically. Once we receive their signature, we will notify you via email.</p>
                <p>If you have any issues, please contact one of our representatives to further assist you.</p>
                <div><a href="../" className="btn btn-primary">Start New Quote</a></div>
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
  </div>
);

export default ThankYou;
