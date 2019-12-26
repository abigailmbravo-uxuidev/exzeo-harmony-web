import React, { useState } from 'react';
import { shape, func } from 'prop-types';

import AppWrapper from '../../components/AppWrapper';
import ReportModal from './ReportModal';
import ReportCard from './ReportCard';
import { useFetchReports } from './hooks';
import { REPORT_COLUMNS, downloadReport } from './utilities';

const Reports = ({ auth, match }) => {
  const [report, setReport] = useState(null);

  const { reports } = useFetchReports();

  return (
    <AppWrapper auth={auth} match={match} routeClassName="main training">
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
                    openModal={() =>
                      setReport({
                        title: r.name,
                        columns: REPORT_COLUMNS[r.reportId]
                      })
                    }
                    handleDownload={downloadReport}
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
