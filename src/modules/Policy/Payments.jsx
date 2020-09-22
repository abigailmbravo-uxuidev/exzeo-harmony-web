import React, { useMemo } from 'react';
import { date as dateUtils, format, BootstrapTable } from '@exzeo/core-ui';
import { OnlinePayment } from '@exzeo/core-ui/src/@Harmony';
import { doesUserHaveAccess } from '../../utilities/userResources';
import { useUser } from '../../context/user-context';

const Payments = ({ initialValues, customHandlers }) => {
  const {
    companyCode,
    state,
    product,
    summaryLedger,
    property
  } = initialValues;
  const { payments } = summaryLedger;

  const userProfile = useUser();

  const enableOnlinePayments = useMemo(() => {
    const onlinePaymentURI = `${companyCode}:${state}:${product}:OnlinePayments:*`;
    return doesUserHaveAccess(
      userProfile.resources,
      onlinePaymentURI,
      'INSERT'
    );
  }, [userProfile, companyCode, state, product]);

  const flattenedPaymentHistory = payments.map(({ amount, ...rest }) => ({
    amount: Number(amount),
    ...rest
  }));

  const formatAmount = amt => (amt ? `${format.toCurrency(amt, 2)}` : '');

  const formatDate = (val, row, rowIndex, timezone) =>
    dateUtils.formattedDate(val, 'MM/DD/YYYY zz', timezone);

  const timezone = property?.timezone ?? 'America/New_York';

  const date = dateUtils.formattedDate(
    dateUtils.moment(),
    'YYYYMMDD',
    timezone
  );
  const columns = [
    {
      headerClasses: 'date',
      classes: 'date',
      dataField: 'date',
      text: 'Date',
      formatter: formatDate,
      formatExtraData: timezone,
      sort: true
    },
    {
      headerClasses: 'type',
      classes: 'type',
      dataField: 'type',
      text: 'Type',
      sort: true
    },
    {
      headerClasses: 'description',
      classes: 'description',
      dataField: 'description',
      text: 'Description',
      sort: true
    },
    {
      headerClasses: 'amount',
      classes: 'amount',
      dataField: 'amount',
      text: 'Amount',
      formatter: formatAmount,
      sort: true,
      align: 'right',
      headerAlign: 'right'
    }
  ];

  return (
    <>
      <div className="title payments" data-test="Payments">
        <i className="fa fa-credit-card" />
        &nbsp;Payments&nbsp;
        {enableOnlinePayments && (
          <OnlinePayment
            batchID={`${date}-AGT`}
            document={initialValues}
            label="Make Online Payment"
            onPaymentComplete={() =>
              customHandlers.updatePolicy(initialValues.policyNumber)
            }
          />
        )}
      </div>
      <BootstrapTable
        keyField="_id"
        data={flattenedPaymentHistory}
        columns={columns}
        noDataIndication="There is no data to display"
        bordered={false}
        striped
        hover
      />
      <div className="payments-received">
        <h4>
          Payments Received:{' '}
          {formatAmount(summaryLedger.cashReceived || '0.00')}
        </h4>
      </div>
    </>
  );
};

export default Payments;
