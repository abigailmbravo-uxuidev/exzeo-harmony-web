import React from 'react';
import PropTypes from 'prop-types';

import { Button } from '@exzeo/core-ui';

const ScheduleDate = ({ handleSubmit, handleCancel, submitting, entity, companyName, productDescription, redirectToHome, selectedAgent }) => (
  <div className="modal schedule-date-modal" data-test="schedule-date-modal">
    <div className="survey-wrapper">
      <div className="card card-schedule-date">
        <div className="card-header"><h4><i className="fa fa-envelope"/> Send Application</h4>
        </div>
        <div className="card-block">
          <h3>Congratulations</h3>
          <p>You have successfully completed a {companyName} {productDescription} Quote.</p>
          <p>With this information, we will generate the {productDescription} Application, and e-mail it to:</p>
          <ul>
            <li>{`${entity.policyHolders[0].firstName} ${entity.policyHolders[0].lastName} (${entity.policyHolders[0].emailAddress})`}</li>
            {entity.policyHolders.length > 1 &&
            <li>{`${entity.policyHolders[1].firstName} ${entity.policyHolders[1].lastName} (${entity.policyHolders[1].emailAddress})`}</li>}
            <li>A copy will also be sent to you ({selectedAgent.emailAddress})</li>
          </ul>
          <p>Once all electronic signatures have been received, the policy will automatically be bound and the policy
            documents will be emailed to you and to the policyholder.</p>
          <p>NOTE: All signatures must be completed within 10 days, or the application will expire.</p>
          <p>Once you send, no changes can be made to this quote.</p>
        </div>
        <div className="card-footer">
          <Button
            className={Button.constants.classNames.secondary}
            onClick={handleCancel}
            disabled={submitting}
            data-test="modal-edit">Edit Quote
          </Button>
          <Button
            className={Button.constants.classNames.secondary}
            onClick={redirectToHome}
            disabled={submitting}
            data-test="modal-save">Save Quote, Continue Later
          </Button>
          <Button
            className={Button.constants.classNames.primary}
            onClick={handleSubmit}
            disabled={submitting}
            data-test="modal-submit">Send Application
          </Button>
        </div>
      </div>
    </div>
  </div>
);

ScheduleDate.defaultProps = {
  submitting: false,
  entity: {
    policyHolders: []
  },
  selectedAgent: {}
};

ScheduleDate.propTypes = {
  handleSubmit: PropTypes.func,
  redictToHome: PropTypes.func,
  submitting: PropTypes.bool,
  entity: PropTypes.object,
  productDescription: PropTypes.string,
  companyName: PropTypes.string,
  selectedAgent: PropTypes.object
};

export default ScheduleDate;
