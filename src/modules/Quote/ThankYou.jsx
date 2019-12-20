import React from 'react';
import PropTypes from 'prop-types';

import { PRODUCT_DISPLAY_NAMES } from './constants/quote';

const ThankYou = ({ footer, product }) => {
  const productName = PRODUCT_DISPLAY_NAMES[product] || '';

  return (
    <div className="route-content">
      <div id="thanks" data-test="thanks">
        <div className="scroll">
          <div className="detail-wrapper form-group" role="article">
            <div className="detail-group">
              <h3 className="section-group-header">Congrats!</h3>
              <h4 className="error-message">
                You have completed the online application for a TypTap{' '}
                {productName} Policy.
              </h4>
              <ul>
                <li>
                  Policyholder 1 will be receiving an e-mail (to the e-mail
                  address you provided), containing the required documents to
                  sign electronically. Once policyholder 1 has signed, the
                  documents will then be routed to any other additional
                  policyholders for their signature.
                </li>
                <li>
                  A copy of the application packet will also be sent to your
                  e-mail address (the one we have on file for you).
                </li>
                <li>
                  Once all policyholders have signed, the policy will be issued.
                </li>
                <li>
                  Signatures on the application must be complete within 10 days
                  to create the policy, otherwise the application will expire,
                  and you will be required to complete a new application.
                </li>
                <li>
                  Once the policy is issued, a copy of the full policy packet
                  will be e-mailed to the primary insured. You will be carbon
                  copied on the full policy packet e-mail.
                </li>
              </ul>
              <p>
                Thank you for your business! If you have any questions or
                concerns, please contact us.
              </p>
            </div>
          </div>
          <div className="workflow-steps">
            <a href="/" className="btn btn-primary">
              Return to Dashboard
            </a>
          </div>
          {footer}
        </div>
      </div>
    </div>
  );
};

ThankYou.propTypes = {
  footer: PropTypes.element,
  product: PropTypes.oneOf(Object.keys(PRODUCT_DISPLAY_NAMES))
};

export default ThankYou;
