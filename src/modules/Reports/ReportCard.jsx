import React from 'react';
import { Button } from '@exzeo/core-ui/src';
import { REPORT_ENDPOINT } from './utilities';

const ReportCard = ({
  reportId,
  title,
  details,
  openModal,
  handleDownload
}) => {
  return (
    <li>
      <div className="link-wrapper">
        <div className="link-details">
          <h5 data-test={`${reportId}_title`}>{title}</h5>
          <p data-test={`${reportId}_details`}>{details}</p>
        </div>
        <Button
          disabled
          className={Button.constants.classNames.secondary}
          onClick={openModal}
          data-test={`${reportId}_run_report`}
        >
          RUN REPORT
        </Button>
        <div className="link-icon">
          <Button
            disabled={!REPORT_ENDPOINT[reportId]}
            className={Button.constants.classNames.icon}
            onClick={handleDownload}
            data-test={`${reportId}_download_report`}
          >
            <i
              data-test={`${reportId}_download`}
              className="fa fa-file-excel-o"
            />
          </Button>
        </div>
      </div>
    </li>
  );
};

export default ReportCard;
