import React from 'react';
import { Button } from '@exzeo/core-ui/src';
import { REPORT_ENDPOINT } from './constants';

const ReportCard = ({
  reportId,
  title,
  details,
  openModal,
  handleDownload
}) => {
  if (!REPORT_ENDPOINT[reportId]) return null;

  return (
    <li>
      <div className="link-wrapper">
        <div className="link-details">
          <h5 data-test={`${reportId}_title`}>{title}</h5>
          <p data-test={`${reportId}_details`}>{details}</p>
        </div>
        <Button
          disabled={!REPORT_ENDPOINT[reportId]}
          className={Button.constants.classNames.primary}
          onClick={handleDownload}
          data-test={`${reportId}_download_report`}
        >
          DOWNLOAD REPORT
        </Button>
      </div>
    </li>
  );
};

export default ReportCard;
