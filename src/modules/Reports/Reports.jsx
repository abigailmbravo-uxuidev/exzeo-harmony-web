import React, { useState } from 'react';
import { shape, func } from 'prop-types';
import { Loader } from '@exzeo/core-ui/src';
import csv2json from 'csvjson-csv2json';

import AppWrapper from '../../components/AppWrapper';
import ReportModal from './ReportModal';
import ReportCard from './ReportCard';
import { useFetchReports } from './hooks';
import { REPORT_COLUMNS, downloadReport, getReportById } from './utilities';

const Reports = ({ auth, match, setAppModalError }) => {
  const [report, setReport] = useState(null);
  const [loading, setLoading] = useState(false);

  const { reports } = useFetchReports();

  const runReport = async report => {
    setLoading(true);
    const reportData = await getReportById(report.reportId, setAppModalError);
    const data = csv2json(reportData);
    setReport({
      title: report.name,
      columns: REPORT_COLUMNS[report.reportId],
      data
    });
    setLoading(false);
  };

  const downloadReportLink = async reportId => {
    setLoading(true);
    const reportData = await getReportById(reportId, setAppModalError, 'blob');
    downloadReport(reportId, reportData);
    setLoading(false);
  };

  return (
    <AppWrapper auth={auth} match={match} routeClassName="main reports">
      {loading && <Loader />}
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
      {report && (
        <ReportModal
          report={report}
          handleCancel={() => setReport(null)}
          handleRefresh={x => x}
          handleDownload={x => x}
        />
      )}
    </AppWrapper>
  );
};

Reports.propTypes = {
  auth: shape({ logout: func }),
  match: shape({ params: shape({}) })
};

export default Reports;
