import React, { useState } from 'react';
import { shape, func } from 'prop-types';

import AppWrapper from '../../components/AppWrapper';
import ReportModal from './ReportModal';
import ReportCard from './ReportCard';
import { useFetchReports } from './hooks';
import { REPORT_COLUMNS, REPORT_TYPES, downloadReport } from './utilities';
import { Loader } from '@exzeo/core-ui/src';

const Reports = ({ auth, match }) => {
  const [report, setReport] = useState(null);
  const [loading, setLoading] = useState(false);

  const { reports } = useFetchReports();

  const downloadReportLink = async reportId => {
    setLoading(true);
    await downloadReport(reportId);
    setLoading(false);
  };

  return (
    <AppWrapper auth={auth} match={match} routeClassName="main training">
      {loading && <Loader />}
      <div className="scroll">
        <div className="detail-wrapper">
          <section className="reference">
            <h2 className="title">
              <i className="fa fa-table" />
              &nbsp;Reports
            </h2>
            <ul className="link-list reference-links">
              {reports &&
                reports.map(r => (
                  <ReportCard
                    reportId={r.reportId}
                    key={r.reportId}
                    title={r.name}
                    details={r.details || ''}
                    disableDownloadLink={
                      r.reportId !== REPORT_TYPES.bookOfBusiness
                    }
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
