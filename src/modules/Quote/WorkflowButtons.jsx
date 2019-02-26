import React from 'react';
import { string, func, bool } from 'prop-types';
import { Button } from '@exzeo/core-ui';

const WorkflowButtons = ({
  disabledPrimary,
  disabledSecondary,
  handlePrimaryClick,
  handleSecondaryClick,
  labelPrimary,
  labelSecondary,
  showSecondary,
}) => (
  <div className="btn-group">
    <Button
      data-test="button-primary"
      className={Button.constants.classNames.primary}
      onClick={handlePrimaryClick}
      disabled={disabledPrimary}
      label={labelPrimary}
    />
    {showSecondary &&
      <Button
        data-test="button-secondary"
        className={Button.constants.classNames.secondary}
        onClick={handleSecondaryClick}
        disabled={disabledSecondary}
        label={labelSecondary}
      />
    }
  </div>
);

WorkflowButtons.propTypes = {
  labelPrimary: string.isRequired,
  handlePrimaryClick: func.isRequired,
  disabledPrimary: bool,
  disabledSecondary: bool,
  handleSecondaryClick: func,
  labelSecondary: string,
  showSecondary: bool,
};

export default WorkflowButtons;
