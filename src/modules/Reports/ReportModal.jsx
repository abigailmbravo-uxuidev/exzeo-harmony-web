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

const dateRange = validation.isDateRange(
  date
    .toUTC()
    .subtract(90, 'days')
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
    className={''}
    size="modal-xl"
    header={() => (
      <h4 className="title">
        <i data-test="modal-icon" className="fa fa-calendar" />
        &nbsp;{report.title}
      </h4>
    )}
  >
    <Form
      initialValues={{
        minDate: date.formattedDate(
          date.toUTC().subtract(90, 'days'),
          date.FORMATS.SECONDARY
        ),
        maxDate: date.formattedDate(undefined, date.FORMATS.SECONDARY)
      }}
      onSubmit={handleRefresh}
      subscription={{ submitting: true }}
      render={({ handleSubmit, submitting }) => (
        <form onSubmit={handleSubmit}>
          {submitting && <Loader />}
          <div>
            <Field
              name="minDate"
              component={Date}
              label="From"
              validate={composeValidators([
                validation.isRequired,
                validation.isDate,
                dateRange
              ])}
              dataTest="from"
            />

            <Field
              name="maxDate"
              component={Date}
              label="To"
              validate={composeValidators([
                validation.isRequired,
                validation.isDate,
                dateRange
              ])}
              dataTest="to"
            />
            <Button
              disabled={submitting}
              type="submit"
              className={Button.constants.classNames.primary}
              data-test="modal-submit"
            >
              Refresh
            </Button>
          </div>
          <div className="card-block">
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
