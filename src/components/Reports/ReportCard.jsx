import React from 'react';
import { Button } from '@exzeo/core-ui/src';

const ReportCard = ({ title, details, openModal, handleDownload }) => {
  return (
    <li>
      <a href="#">
        <div className="link-details">
          <h5>{title}</h5>
          <p>{details}</p>
        </div>
        <Button
          className={Button.constants.classNames.secondary}
          onClick={openModal}
          data-test="run-report"
        >
          Run Report
        </Button>
        <div className="link-icon">
          <span className="fa-file-excel-o" />
        </div>
      </a>
    </li>
  );
};

export default ReportCard;
