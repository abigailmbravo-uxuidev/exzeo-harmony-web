import React from 'react';
import { Button } from '@exzeo/core-ui';

const WorkflowButtons = ({
  submitting,
  labelPrimary,
  currentStep,
  labelSecondary,
  handleSecondaryClick,
  showSecondaryButton,
}) => (
  <div className="btn-group">
    {showSecondaryButton &&
      <Button
        baseClass={Button.constants.classNames.secondary}
        onClick={handleSecondaryClick}
        label={labelSecondary}
      />
    }
    <Button
      type="submit"
      className={Button.constants.classNames.primary}
      disabled={submitting}
      label={labelPrimary}
    />
  </div>
);


export default WorkflowButtons;
