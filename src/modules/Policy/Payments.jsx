import React, { useMemo } from 'react';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import { OnlinePayment } from '@exzeo/core-ui/src/@Harmony';
import { date } from '@exzeo/core-ui';
import { doesUserHaveAccess } from '../../utilities/userResources';

const amountFormatter = amt =>
  amt ? `$ ${amt.toLocaleString('en', { minimumFractionDigits: 2 })}` : '';

const dateFormatter = cell => `${cell.substring(0, 10)}`;

const getFlattenedPaymentHistory = payments =>
  payments.map(({ amount, ...rest }) => ({
    amount: Number(amount),
    ...rest
  }));

const Payments = ({ initialValues, customHandlers }) => {
  const { companyCode, state, product, summaryLedger } = initialValues;

  const flattenedPaymentHistory = getFlattenedPaymentHistory(
    summaryLedger.payments
  );

  // TODO: Before we make wide use of this logic, we need to refactor Auth, use Providers, and then create a custom hook to be used in this components. Doing it this way now to get the feature out.
  //  then we won't need to pass an "enabled" prop - the OnlinePayment component can be fully responsible for determining if it should be enabled or not.
  const enableOnlinePayments = useMemo(() => {
    const onlinePaymentURI = `${companyCode}:${state}:${product}:OnlinePayments:*`;
    return doesUserHaveAccess(
      customHandlers.userProfile.resources,
      onlinePaymentURI,
      'INSERT'
    );
  }, [customHandlers.userProfile, companyCode, state, product]);

  return (
    <React.Fragment>
      <div className="title payments" data-test="Payments">
        <i className="fa fa-credit-card" />
        &nbsp;Payments&nbsp;
        <OnlinePayment
          batchID={`${date.moment().format('YYYYMMDD')}-AGT`}
          enabled={enableOnlinePayments}
          document={initialValues}
          label="Make Online Payment"
          onPaymentComplete={() =>
            customHandlers.updatePolicy(initialValues.policyNumber)
          }
        />
      </div>
      <div className="table-view">
        <BootstrapTable
          className=""
          data={flattenedPaymentHistory}
          striped
          hover
        >
          <TableHeaderColumn
            isKey
            dataField="date"
            dataFormat={dateFormatter}
            className="date"
            columnClassName="date"
            width="150"
            dataSort
          >
            Date
          </TableHeaderColumn>
          <TableHeaderColumn
            dataField="type"
            className="type"
            columnClassName="type"
            dataSort
            width="150"
          >
            Type
          </TableHeaderColumn>
          <TableHeaderColumn
            dataField="description"
            className="description"
            columnClassName="description"
            dataSort
          >
            Description
          </TableHeaderColumn>
          <TableHeaderColumn
            dataField="amount"
            dataFormat={amountFormatter}
            className="amount"
            columnClassName="amount"
            width="150"
            dataSort
            dataAlign="right"
          >
            Amount
          </TableHeaderColumn>
        </BootstrapTable>
      </div>
      <div className="payments-received">
        <h4>
          Payments Received:{' '}
          {amountFormatter(summaryLedger.cashReceived || '0.00')}
        </h4>
      </div>
    </React.Fragment>
  );
};

export default Payments;
