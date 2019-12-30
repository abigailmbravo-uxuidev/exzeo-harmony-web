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
  Modal
} from '@exzeo/core-ui';
import ReportTable from './ReportTable';

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
      onSubmit={handleRefresh}
      subscription={{ submitting: true }}
      render={({ handleSubmit, submitting }) => (
        <form onSubmit={handleSubmit}>
          {submitting && <Loader />}
          <div>
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
