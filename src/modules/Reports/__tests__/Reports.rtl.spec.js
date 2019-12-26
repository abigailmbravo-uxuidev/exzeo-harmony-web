import React from 'react';
import { waitForElement } from 'react-testing-library';

import { renderWithForm, mockServiceRunner } from '../../../test-utils';

import Reports from '../Reports';

mockServiceRunner([
  {
    reportId: 'Agency_Activity',
    updatedBy: { user: 'SYSTEM' },
    updatedAt: '2019-03-01T12:05:36.408Z',
    createdBy: { user: 'SYSTEM' },
    createdAt: '2019-03-11T13:39:26.291Z',
    metadata: {},
    parameters: {
      name: 'Exzeo',
      parameterType: 'agency',
      _id: '5d86650e2c691f40c4d3191d',
      values: ['agency']
    },
    access: {
      _id: '5d86650e2c691f40c4d3191c',
      agency: true
    },
    reportType: 'test',
    name: 'Agency Activity',
    __v: 0
  },
  {
    reportId: 'Book_Of_Business',
    updatedBy: { user: 'SYSTEM' },
    updatedAt: '2019-03-01T12:05:36.408Z',
    createdBy: { user: 'SYSTEM' },
    createdAt: '2019-03-11T13:39:26.291Z',
    metadata: {},
    parameters: {
      name: 'Exzeo',
      parameterType: 'agency',
      _id: '5d86650e2c691f40c4d3191d',
      values: ['agency']
    },
    access: {
      _id: '5d86650e2c691f40c4d3191c',
      agency: true
    },
    reportType: 'agency',
    name: 'Book Of Business',
    __v: 0
  }
]);

const defaultProps = {
  auth: {},
  match: {
    isExact: true,
    params: {},
    path: '/reports',
    url: '/reports'
  }
};

describe('Testing the Reports Page', () => {
  it('Reports Header Testing', async () => {
    const props = {
      ...defaultProps
    };
    const { getByText } = renderWithForm(<Reports {...props} />);
    const header = getByText('Reports');

    await waitForElement(() => header);

    const iconElement = Object.values(header.childNodes).find(
      node => node.tagName === 'I'
    );
    expect(iconElement.className).toEqual('fa fa-table');
  });

  it('Reports Section 1 Testing', async () => {
    const props = {
      ...defaultProps
    };
    const { getByTestId, getByText } = renderWithForm(<Reports {...props} />);

    await waitForElement(() => getByText('Agency Activity'));

    expect(getByTestId('Agency_Activity_title')).toHaveTextContent(
      /Agency Activity/
    );
    expect(getByTestId('Agency_Activity_run_report')).toHaveTextContent(
      /RUN REPORT/
    );

    const download = getByTestId('Agency_Activity_download');
    expect(download.className).toEqual('fa fa-file-excel-o');
  });

  it('Reports Section 2 Testing', async () => {
    const props = {
      ...defaultProps
    };
    const { getByTestId, getByText } = renderWithForm(<Reports {...props} />);

    await waitForElement(() => getByText('Book Of Business'));

    expect(getByTestId('Book_Of_Business_title')).toHaveTextContent(
      /Book Of Business/
    );
    expect(getByTestId('Book_Of_Business_run_report')).toHaveTextContent(
      /RUN REPORT/
    );

    const download = getByTestId('Book_Of_Business_download');
    expect(download.className).toEqual('fa fa-file-excel-o');
  });
});
