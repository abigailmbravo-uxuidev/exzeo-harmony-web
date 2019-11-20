import React from 'react';
import classNames from 'classnames';
import { Button } from '@exzeo/core-ui/src';

const ReportCard = ({ title, details, openModal, handleDownload }) => {
  return (
    <div className={classNames('card report-card', title)}>
      <div className="card-header">{title}</div>
      <div className="card-body">
        <div className="report-details">{details}</div>
        <div className="report-download">
          <Button
            className={Button.constants.classNames.secondary}
            onClick={openModal}
            data-test="run-report"
          >
            Run Report
          </Button>
          <Button
            className={Button.constants.classNames.primary}
            onClick={handleDownload}
            data-test="download-report"
          >
            <i className="fa fa-file-excel-o" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ReportCard;
