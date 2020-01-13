import React from 'react';
import PropTypes from 'prop-types';
import {
  Loader,
  Date,
  Button,
  validation,
  Form,
  Field,
  composeValidators,
  Modal,
  date
} from '@exzeo/core-ui';
import ReportTable from './ReportTable';

const validateDateRange = validation.isDateRange(
  date
    .toUTC()
    .subtract('days', 90)
    .format(date.FORMATS.SECONDARY),
  date.toUTC().format(date.FORMATS.SECONDARY)
);
const ReportModal = ({
  handleRefresh,
  handleCancel,
  handleDownload,
  report
}) => (
  <Modal
    className="report-modal"
    size="modal-xl"
    header={
      <h4 className="title">
        <i data-test="modal-icon" className="fa fa-calendar" />
        &nbsp;<span data-test="modal-title">{report.title}</span>
      </h4>
    }
  >
    <Form
      onSubmit={handleRefresh}
      subscription={{ submitting: true }}
      render={({ handleSubmit, submitting }) => (
        <form onSubmit={handleSubmit}>
          {submitting && <Loader />}
          <div className="card-block">
            <div className="date-range-wrapper">
              {report.minDate && report.maxDate && (
                <React.Fragment>
                  <Field
                    name="minDate"
                    component={Date}
                    className="date"
                    label="From"
                    validate={composeValidators([
                      validation.isRequired,
                      validateDateRange
                    ])}
                    dataTest="from"
                  />

                  <Field
                    name="maxDate"
                    component={Date}
                    label="To"
                    validate={composeValidators([
                      validation.isRequired,
                      validateDateRange
                    ])}
                    dataTest="to"
                  />
                </React.Fragment>
              )}
              <Button
                disabled={submitting}
                type="submit"
                className={Button.constants.classNames.primary}
                data-test="modal-submit"
              >
                <i className="fa fa-refresh" />
              </Button>
            </div>
            <ReportTable columns={report.columns} reportData={report.data} />
          </div>
          <div className="card-footer">
            <Button
              className={Button.constants.classNames.secondary}
              onClick={handleCancel}
              data-test="modal-cancel"
            >
              Cancel
            </Button>
            <a data-test="download-csv" href="#" onClick={handleDownload}>
              Download as CSV
            </a>
          </div>
        </form>
      )}
    />
  </Modal>
);

ReportModal.propTypes = {
  handleCancel: PropTypes.func,
  onSubmit: PropTypes.func
};

export default ReportModal;
