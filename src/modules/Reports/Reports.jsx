import React, { useState } from 'react';
import { shape, func } from 'prop-types';
import { Loader } from '@exzeo/core-ui/src';

import AppWrapper from '../../components/AppWrapper';
import ReportModal from './ReportModal';
import ReportCard from './ReportCard';
import { useFetchReports } from './hooks';
import { REPORT_COLUMNS, downloadReport } from './utilities';

const Reports = ({ auth, match, setAppModalError }) => {
  const [report, setReport] = useState(null);
  const [loading, setLoading] = useState(false);

  const { reports } = useFetchReports();

  const downloadReportLink = async reportId => {
    setLoading(true);
    await downloadReport(reportId, setAppModalError);
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
                    openModal={() =>
                      setReport({
                        title: r.name,
                        columns: REPORT_COLUMNS[r.reportId]
                      })
                    }
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
