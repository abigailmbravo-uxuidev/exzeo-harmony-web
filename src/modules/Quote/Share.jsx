import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button, ModalPortal, FormSpy } from '@exzeo/core-ui';
import { ShareModal } from '@exzeo/core-ui/src/@Harmony';

import { STEP_NAMES } from './constants/workflowNavigation';

const Share = ({
  customHandlers,
  formInstance,
  config: { extendedProperties = {} }
}) => {
  const [showPopup, setPopup] = useState(false);
  const { goToStep, handleSubmit } = customHandlers;
  const { skipNext } = extendedProperties;

  const handleClick = skipNext
    ? () => goToStep(STEP_NAMES.policyholder, true)
    : () => handleSubmit({ noSubmit: true });

  return (
    <React.Fragment>
      <section className="section-instructions" data-test="section-1">
        <div className="title" data-test="Share">
          <i className="fa fa-share-alt" /> Share
        </div>
        <p>
          To SHARE this quote as a PDF via email:
          <FormSpy subscription={{ submitting: true }}>
            {({ submitting }) => (
              <Button
                className={Button.constants.classNames.link}
                onClick={() => setPopup(true)}
                disabled={submitting}
                data-test="share"
              >
                Click Here
              </Button>
            )}
          </FormSpy>
        </p>
      </section>
      <section className="section-instructions" data-test="section-2">
        <div className="title" data-test="Continue">
          <i className="fa fa-arrow-circle-right" /> Continue
        </div>
        <p>To CONTINUE the quote process, you will need the following</p>
        <ul>
          <li>Mortgage information</li>
          <li>Name and email address of additional owners</li>
          <li>
            Name and address of any other additional insured to add to this
            policy
          </li>
        </ul>
        <p>
          When you are prepared to move forward:
          <FormSpy subscription={{ submitting: true }}>
            {({ submitting }) => (
              <Button
                className={Button.constants.classNames.link}
                onClick={handleClick}
                disabled={submitting}
                data-test="submit"
              >
                Click Here
              </Button>
            )}
          </FormSpy>
        </p>
      </section>
      <section className="section-instructions" data-test="section-3">
        <div className="title" data-test="NewQuote">
          <i className="fa fa-quote-left" /> New Quote
        </div>
        <p>
          Your current quote is saved and can be retrieved at any time. To begin
          a new quote:
          <Link className="btn link" to="/search/address">
            Click Here
          </Link>
        </p>
      </section>
      <FormSpy subscription={{ submitting: true }}>
        {({ submitting }) => (
          <React.Fragment>
            <div className="btn-group">
              <Button
                className={Button.constants.classNames.secondary}
                onClick={() => setPopup(true)}
                disabled={submitting}
                data-test="share"
              >
                share
              </Button>
              <Button
                className={Button.constants.classNames.primary}
                onClick={handleClick}
                disabled={submitting}
                data-test="submit"
              >
                next
              </Button>
            </div>
          </React.Fragment>
        )}
      </FormSpy>

      {showPopup && (
        <ModalPortal>
          <ShareModal
            summaryType="agency"
            parentFormInstance={formInstance}
            closeModal={() => setPopup(false)}
          />
        </ModalPortal>
      )}
    </React.Fragment>
  );
};

Share.defaultProps = {
  isLoading: false,
  quote: {},
  customHandlers: {}
};

export default Share;
