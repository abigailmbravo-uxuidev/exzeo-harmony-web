import React from 'react';
import { Button } from '@exzeo/core-ui/src';

const ReportCard = ({
  reportId,
  title,
  details,
  openModal,
  handleDownload
}) => {
  return (
    <li>
      <a href="#">
        <div className="link-details">
          <h5 data-test={`${reportId}_title`}>{title}</h5>
          <p data-test={`${reportId}_details`}>{details}</p>
        </div>
        <Button
          className={Button.constants.classNames.secondary}
          onClick={openModal}
          data-test={`${reportId}_run_report`}
        >
          RUN REPORT
        </Button>
        <div className="link-icon">
          <span className="fa-file-excel-o" />
        </div>
      </a>
    </li>
  );
};

export default ReportCard;
