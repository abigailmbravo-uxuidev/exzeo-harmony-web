import React, { useState } from 'react';
import { shape, func } from 'prop-types';

import AppWrapper from '../../components/AppWrapper';
import ReportModal from './ReportModal';
import ReportCard from './ReportCard';
import { useFetchReports } from './hooks';

const dateFormatter = cell => `${cell.substring(0, 10)}`;
const amountFormatter = amt =>
  amt ? `$ ${amt.toLocaleString('en', { minimumFractionDigits: 2 })}` : '';
3;
const Reports = ({ auth, match }) => {
  const [report, setReport] = useState(null);

  const { reports } = useFetchReports();

  const agencyActivityColumns = [
    { title: 'Agency Activity' },
    { title: 'Policy Number', isKey: true },
    { title: 'Product' },
    { title: 'Created Date', format: dateFormatter },
    { title: 'Effective Date', format: dateFormatter },
    { title: 'PolicyHolder' },
    { title: 'Address' }
  ];
  const bookOfBusinessColumns = [
    { title: 'textbox10' },
    { title: 'Policy Number', isKey: true },
    { title: 'PolicyHolder' },
    { title: 'Product' },
    { title: 'Mailing Address' },
    { title: 'Property Address' },
    { title: 'Effective Date', format: dateFormatter },
    { title: 'Cancel Date', format: dateFormatter },
    { title: 'Total Premium', format: amountFormatter },
    { title: 'Policy Status' },
    { title: 'Billing Status' }
  ];

  const REPORT_COLUMNS = {
    Agency_Activity: agencyActivityColumns,
    Book_Of_Business: bookOfBusinessColumns
  };

  return (
    <AppWrapper auth={auth} match={match} routeClassName="main training">
      <div className="scroll">
        <div className="detail-wrapper">
          <section className="reference">
            <h2 className="title">
              <i className="fa fa-table" />
              &nbsp;Reports
            </h2>
            {/* TODO: Get reports from endpoint in the reports-service */}
            <ul className="link-list reference-links">
              {reports &&
                reports.map(r => (
                  <ReportCard
                    key={r.reportId}
                    title={r.name}
                    details={r.details}
                    openModal={() =>
                      setReport({
                        title: r.name,
                        columns: REPORT_COLUMNS[r.reportId]
                      })
                    }
                    handleDownload={x => x}
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
