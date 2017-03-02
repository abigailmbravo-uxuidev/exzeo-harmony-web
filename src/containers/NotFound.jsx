import React from 'react';
import Footer from '../components/common/Footer';

const NotFound = () => (

  <div className="error-wraper" role="article">
    <div className="fade-in">
      <div className="route">
        <div className="error-content" role="article">
          <div className="fade-in">
            <section>
              <div className="fade-in" id="Error">
                <div className="detail-wrapper">
                  <h3 className="section-group-header error"><i className="fa fa-exclamation-triangle"></i> 404 Page not Found</h3>
                  <div className="header-wrapper">
                    <div>
                      <h4 className="error-message">Something went wrong!</h4>
                      <p>We apologize, the page you're looking for does not exist in our site.</p>
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

export default NotFound;
