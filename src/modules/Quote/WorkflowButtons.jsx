import React from 'react';
import { string, func, bool } from 'prop-types';
import { Button } from '@exzeo/core-ui';

const WorkflowButtons = ({
  disabledPrimary,
  handlePrimaryClick,
  labelPrimary,
  secondaryConfig,
}) => (
  <div className="btn-group">
    <Button
      data-test="button-primary"
      className={Button.constants.classNames.primary}
      onClick={handlePrimaryClick}
      disabled={disabledPrimary}
      label={labelPrimary}
    />
    {secondaryConfig.show &&
      <Button
        data-test="button-secondary"
        className={Button.constants.classNames.secondary}
        onClick={secondaryConfig.handleClick}
        disabled={secondaryConfig.disabled}
        label={secondaryConfig.label}
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
