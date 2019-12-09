import React from 'react';
import PropTypes from 'prop-types';
import {
  Loader,
  Date,
  Button,
  validation,
  Form,
  Field,
  composeValidators
} from '@exzeo/core-ui';
import ReportTable from './ReportTable';

const ReportModal = ({
  handleRefresh,
  handleCancel,
  handleDownload,
  report
}) => (
  <div className="report-modal modal active" role="article">
    <div className="survey-wrapper">
      <div className="contact-message">
        <Form
          onSubmit={handleRefresh}
          subscription={{ submitting: true }}
          render={({ handleSubmit, submitting }) => (
            <form onSubmit={handleSubmit}>
              <div className="card">
                {submitting && <Loader />}
                <div className="fade-in" id="Report">
                  <div className="card-header" data-test="modal-header">
                    <h4>
                      <i className="fa fa-table" /> {report.title}
                    </h4>
                    <Field
                      name="from"
                      component={Date}
                      label="From"
                      validate={composeValidators([
                        validation.isRequired,
                        validation.isDate
                      ])}
                      dataTest="from"
                    />

                    <Field
                      name="to"
                      component={Date}
                      label="To"
                      validate={composeValidators([
                        validation.isRequired,
                        validation.isDate
                      ])}
                      dataTest="to"
                    />
                    <Button
                      className={Button.constants.classNames.primary}
                      onClick={handleRefresh}
                      disabled={submitting}
                      data-test="modal-submit"
                    >
                      Refresh
                    </Button>
                  </div>
                  <div className="card-block">
                      <ReportTable columns={report.columns} reportData={[]} />
                  </div>
                  <div className="card-footer">
                    <Button
                      className={Button.constants.classNames.secondary}
                      onClick={handleCancel}
                      data-test="modal-cancel"
                    >
                      Cancel
                    </Button>
                    <a
                      data-test="download-csv"
                      href="#"
                      onClick={handleDownload}
                    >
                      Download as CSV
                    </a>
                  </div>
                </div>
              </div>
            </form>
          )}
        />
      </div>
    </div>
  </div>
);

ReportModal.propTypes = {
  handleCancel: PropTypes.func,
  onSubmit: PropTypes.func
};

export default ReportModal;
