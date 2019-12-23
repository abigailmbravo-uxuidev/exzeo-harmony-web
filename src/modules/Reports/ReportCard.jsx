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
          <Button
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
      </a>
    </li>
  );
};

export default ReportCard;
