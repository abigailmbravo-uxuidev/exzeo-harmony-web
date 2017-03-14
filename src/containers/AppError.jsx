import React from 'react';
import Footer from '../components/common/Footer';

const AppError = () => (

  <div className="error-wrapper" role="article">
    <div className="fade-in">
      <div className="route">
        <div className="error-content" role="article">
          <div className="fade-in">
            <section>
              <div className="fade-in" id="Error">
                <div className="detail-wrapper">
                  <div className="waves"></div>
                  <div className="duckie"></div>
                  <h3 className="section-group-header error"><i className="fa fa-exclamation-triangle"></i> App Error</h3>
                  <div className="header-wrapper">
                    <div>
                      <h4 className="error-message">OH NO! You've flooded the website!</h4>
                      <p>Just kidding, something has gone wrong. Please go the <a href="/">Dashboard</a> and start over.</p>
                    </div>
                  </div>
                  <a className="btn btn-secondary" href="/">Return to Dashboard</a>
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
