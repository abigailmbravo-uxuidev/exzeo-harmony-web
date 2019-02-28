import React, { useState } from 'react';
import { AssumptionsMessage } from '@exzeo/core-ui/src/@Harmony';
import { Switch, Button, noop } from '@exzeo/core-ui';

export const Assumptions = ({ customHandlers }) => {
  const [confirmed, setConfirmed] = useState(false);

  const input = {
    name: 'confirmAssumptions',
    value: confirmed,
    onChange: (value) => setConfirmed(value),
    onFocus: noop,
    onBlur: noop,
  };

  return (
    <React.Fragment>
      <AssumptionsMessage />
      <Switch
        input={input}
        label="Confirmed"
        styleName="switch"
        customClass="confirm"
        dataTest="confirm-assumptions"
        segmented
      />
      <div className="btn-group">
      <Button
        className={Button.constants.classNames.primary}
        disabled={!confirmed}
        onClick={() => customHandlers.handleSubmit({})}
        label="next"
        data-test="submit"
      />
      </div>
    </React.Fragment>
  );
};

export default Assumptions;
