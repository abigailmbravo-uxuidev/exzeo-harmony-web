import { date } from '@exzeo/core-ui/src';
import * as serviceRunner from '@exzeo/core-ui/src/@Harmony/Domain/Api/serviceRunner';

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
  try {
    const config = {
      service: 'report-service',
      method: 'GET',
      path: `v1/${REPORT_ENDPOINT[reportId]}?minDate=${minDate}&maxDate=${maxDate}`,
      streamResult: true
    };
    const headers = { 'Content-Type': 'text/csv; charset=utf-8' };
    const response = await serviceRunner.callService(
      config,
      'getReportById',
      headers,
      responseType
    );
    return response.data;
  } catch (ex) {
    return errorHandler(ex.message);
  }
}
