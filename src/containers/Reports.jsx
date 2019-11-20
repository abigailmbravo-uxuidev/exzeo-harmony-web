import React from 'react';
import { shape, func } from 'prop-types';

import AppWrapper from '../components/AppWrapper';
import ReportCard from 'components/ReportCard';

const Reports = ({ auth, match }) => (
  <AppWrapper auth={auth} match={match} routeClassName="main reports">
    <div className="scroll">
      <div className="detail-wrapper">
        <section className="reports">
          <h2 className="title">
            <i className="fa fa-table" />
            &nbsp;Reports
          </h2>
          {/* TODO: Get reports from endpoint in the reports-service */}
          <ReportCard title="Agency Activity" details="Report details..." />
          <ReportCard title="Book of Business" details="Report details..." />
        </section>
      </div>
    </div>
  </AppWrapper>
);

Reports.propTypes = {
  auth: shape({ logout: func }),
  match: shape({ params: shape({}) })
};

export default Reports;
