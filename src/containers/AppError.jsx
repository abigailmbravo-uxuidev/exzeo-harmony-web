import React from 'react';
import Footer from '../components/common/Footer';

const AppError = () => (

  <div className="error-wraper" role="article">
    <div className="fade-in">
      <div className="route">
        <div className="error-content" role="article">
          <div className="fade-in">
            <section>
              <div className="fade-in" id="Error">
                <div className="detail-wrapper">
                  <h3 className="section-group-header error"><i className="fa fa-exclamation-triangle"></i> App Error</h3>
                  <div className="header-wrapper">
                    <div>
                      <h4 className="error-message">Something went wrong!</h4>
                      <p>We apologize, something has gone wrong. Please start over.</p>
                    </div>
                  </div>
                  <div className="waves"></div>
                </div>
              </div>
            </section>
          </div>
          <Footer/>
        </div>
      </div>
    </div>
  </div>
);

export default AppError;
