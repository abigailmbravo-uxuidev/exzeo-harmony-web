import { http, date } from '@exzeo/core-ui/src';
import { REPORT_ENDPOINT } from './constants';

export const dateFormatter = cell => (cell ? `${cell.substring(0, 10)}` : '');
export const amountFormatter = amt =>
  amt ? `$ ${amt.toLocaleString('en', { minimumFractionDigits: 2 })}` : '';

export function downloadReport(reportId, blob) {
  const blobUrl = window.URL.createObjectURL(blob);
  const link = window.document.createElement('a');
  link.href = blobUrl;
  link.download = `${reportId}-${date.formatToUTC()}.csv`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

export async function getReportById(
  reportId,
  minDate = '',
  maxDate = '',
  errorHandler,
  responseType
) {
  const config = {
    method: 'POST',
    url: `${process.env.REACT_APP_API_URL}/svc?getReportById`,
    data: {
      service: 'report-service',
      method: 'GET',
      path: `v1/${REPORT_ENDPOINT[reportId]}?minDate=${minDate}&maxDate=${maxDate}`,
      streamResult: true
    },
    responseType
  };

  const response = await http(config).catch(err => {
    errorHandler(err.message);
  });

  return response.data;
}
