import React from 'react';
import { Button } from '@exzeo/core-ui';

import ScheduleDate from './ScheduleDate';


export class Verify extends React.Component {

  sendApplicationSubmit = async (data) => {
    const { customHandlers } = this.props;
    customHandlers.handleSubmit({ shouldSendApplication: true, ...data });
    customHandlers.setEmailPopup(false);
    customHandlers.history.replace('thankYou');

  };

  redirectToNewQuote = () => {
    this.props.customHandlers.history.replace('/');
  };

  render() {
    const {
      submitting,
      formValues,
      config,
      customHandlers: {
        setShowSendApplicationPopup,
        getState,
      },
    } = this.props;

    const { showSendApplicationPopup } = getState();

    const {productDescription, companyName } = config.extendedProperties;
    return (
      <React.Fragment>
        Verify
       
        <div className="btn-group">
          <Button
            className={Button.constants.classNames.primary}
            onClick={setShowSendApplicationPopup}
            disabled={submitting}
            data-test="submit"
          >next</Button>
        </div>
         {showSendApplicationPopup &&
          <ScheduleDate
            entity={formValues}
            productDescription={productDescription}
            companyName={companyName}
            onSubmit={this.sendApplicationSubmit}
            redirectToNewQuote={this.redirectToNewQuote}
            handleCancel={() => setShowSendApplicationPopup(false)}
          />
         }
      </React.Fragment>
    );
  }
}

Verify.defaultProps = {
  submitting: false,
  quote: {},
  customHandlers: {}
};

export default Verify;
