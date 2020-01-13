import React from 'react';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';

const amountFormatter = amt =>
  amt ? `$ ${amt.toLocaleString('en', { minimumFractionDigits: 2 })}` : '';
const dateFormatter = cell => `${cell.substring(0, 10)}`;

const Payments = ({ initialValues }) => {
  const {
    billing: { payments, cashReceived }
  } = initialValues;
  const flattenedPaymentHistory = payments.map(({ amount, ...rest }) => ({
    amount: Number(amount),
    ...rest
  }));

  return (
    <React.Fragment>
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
        <h4>Payments Received: {amountFormatter(cashReceived)}</h4>
      </div>
    </React.Fragment>
  );
};

export default Payments;
