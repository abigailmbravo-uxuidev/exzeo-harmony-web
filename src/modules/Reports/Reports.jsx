import React, { useState } from 'react';
import { func } from 'prop-types';
import { Loader } from '@exzeo/core-ui';
import csv2json from 'csvjson-csv2json';

import AppWrapper from '../../components/AppWrapper';
import ReportModal from './ReportModal';
import ReportCard from './ReportCard';
import { useFetchReports } from './hooks';
import { downloadReport, getReportById } from './utilities';
import { REPORT_COLUMNS } from './constants';

const Reports = ({ errorHandler }) => {
  const [report, setReport] = useState({});
  const [loading, setLoading] = useState(false);
  const { reports, loaded } = useFetchReports();

  const runReport = async (selectedReport, minDate, maxDate) => {
    setLoading(true);
    const reportData = await getReportById(
      selectedReport.reportId,
      minDate,
      maxDate,
      errorHandler
    );
    const data = csv2json(reportData);
    setReport({
      selectedReport: selectedReport,
      title: selectedReport.name,
      columns: REPORT_COLUMNS[selectedReport.reportId],
      data,
      minDate,
      maxDate
    });
    setLoading(false);
  };

  const downloadReportLink = async reportId => {
    setLoading(true);
    const reportData = await getReportById(
      reportId,
      report.minDate,
      report.maxDate,
      errorHandler,
      'blob'
    );
    downloadReport(reportId, reportData);
    setLoading(false);
  };

  const refreshReport = async data => {
    await runReport(
      report.selectedReport,
      data.minDate,
      data.maxDate,
      errorHandler
    );
  };

  return (
    <AppWrapper routeClassName="main reports">
      {(loading || !loaded) && <Loader />}
      <div className="scroll">
        <div className="detail-wrapper">
          <section className="reports">
            <h2 className="title">
              <i className="fa fa-table" />
              &nbsp;Reports
            </h2>
            <ul className="link-list reports-links">
              {reports &&
                reports.map(r => (
                  <ReportCard
                    reportId={r.reportId}
                    key={r.reportId}
                    title={r.name}
                    details={r.details || ''}
                    openModal={() => runReport(r)}
                    handleDownload={() => downloadReportLink(r.reportId)}
                  />
                ))}
            </ul>
          </section>
        </div>
      </div>
      {report.selectedReport && (
        <ReportModal
          report={report}
          handleCancel={() => setReport({})}
          handleRefresh={refreshReport}
          handleDownload={() =>
            downloadReportLink(report.selectedReport.reportId)
          }
        />
      )}
    </AppWrapper>
  );
};

Reports.propTypes = {
  errorHandler: func.isRequired
};

export default Reports;
