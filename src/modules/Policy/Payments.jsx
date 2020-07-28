import React, { useMemo } from 'react';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import { OnlinePayment } from '@exzeo/core-ui/src/@Harmony';
import { date, format } from '@exzeo/core-ui';
import { doesUserHaveAccess } from '../../utilities/userResources';
import { useUser } from '../../context/user-context';

const amountFormatter = amt => (amt ? `${format.toCurrency(amt, 2)}` : '');

const getFlattenedPaymentHistory = payments =>
  payments.map(({ amount, ...rest }) => ({
    amount: Number(amount),
    ...rest
  }));

const Payments = ({ initialValues, customHandlers }) => {
  const { companyCode, state, product, summaryLedger } = initialValues;
  const userProfile = useUser();

  const flattenedPaymentHistory = getFlattenedPaymentHistory(
    summaryLedger.payments
  );
  const enableOnlinePayments = useMemo(() => {
    const onlinePaymentURI = `${companyCode}:${state}:${product}:OnlinePayments:*`;
    return doesUserHaveAccess(
      userProfile.resources,
      onlinePaymentURI,
      'INSERT'
    );
  }, [userProfile, companyCode, state, product]);

  return (
    <React.Fragment>
      <div className="title payments" data-test="Payments">
        <i className="fa fa-credit-card" />
        &nbsp;Payments&nbsp;
        {enableOnlinePayments && (
          <OnlinePayment
            batchID={`${date.moment().format('YYYYMMDD')}-AGT`}
            document={initialValues}
            label="Make Online Payment"
            onPaymentComplete={() =>
              customHandlers.updatePolicy(initialValues.policyNumber)
            }
          />
        )}
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
            dataFormat={x => date.formattedDate(x, 'MM/DD/YYYY zz')}
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
            width="200"
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
