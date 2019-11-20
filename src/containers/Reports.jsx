import React, { useState } from 'react';
import { shape, func } from 'prop-types';

import AppWrapper from '../components/AppWrapper';
import ReportCard from 'components/ReportCard';
import ReportModal from './ReportModal';

const Reports = ({ auth, match }) => {
  const [report, setReport] = useState(null);

  return (
    <AppWrapper auth={auth} match={match} routeClassName="main reports">
      <div className="scroll">
        <div className="detail-wrapper">
          <section className="reports">
            <h2 className="title">
              <i className="fa fa-table" />
              &nbsp;Reports
            </h2>
            {/* TODO: Get reports from endpoint in the reports-service */}
            <ReportCard
              title="Agency Activity"
              details="Report details..."
              openModal={() => setReport({ title: 'Agency Activity' })}
              handleDownload={x => x}
            />
            <ReportCard
              title="Book of Business"
              details="Report details..."
              openModal={() => setReport({ title: 'Book of Business' })}
              handleDownload={x => x}
            />
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
