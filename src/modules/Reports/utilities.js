import { date } from '@exzeo/core-ui/src';
import * as serviceRunner from '@exzeo/core-ui/src/@Harmony/Domain/Api/serviceRunner';

import { REPORT_ENDPOINT } from './constants';

export const dateFormatter = cell => (cell ? `${cell.substring(0, 10)}` : '');
export const amountFormatter = amt =>
  amt ? `$ ${amt.toLocaleString('en', { minimumFractionDigits: 2 })}` : '';

export function downloadReport(reportId, blob) {
  const fileName = `${reportId}-${date.formatToUTC()}.csv`;
  // IE doesn't allow using a blob object directly as link href
  if (window.navigator && window.navigator.msSaveOrOpenBlob) {
    window.navigator.msSaveBlob(blob, fileName);
  }
  const data = window.URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = data;
  link.download = fileName;
  setTimeout(() => {
    link.click();
    // Firefox, necessary delay before revoking the ObjectURL
    window.URL.revokeObjectURL(data);
  }, 100);
}

export async function getReportById(
  reportId,
  minDate = '',
  maxDate = '',
  errorHandler,
  responseType
) {
  try {
    const config = {
      service: 'report-service',
      method: 'GET',
      path: `v1/${REPORT_ENDPOINT[reportId]}?minDate=${minDate}&maxDate=${maxDate}`,
      streamResult: true
    };
    const response = await serviceRunner.callService(config, 'getReportById', {
      responseType
    });
    return response.data;
  } catch (ex) {
    return errorHandler(ex.message);
  }
}
