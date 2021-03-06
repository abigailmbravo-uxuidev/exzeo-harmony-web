import React from 'react';

import {
  render,
  wait,
  waitForElement,
  fireEvent,
  mockServiceRunner,
  defaultInitialState,
  defaultAuth
} from '../../../test-utils';

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
    details: 'Some Agency Activity detail Text',
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
    details: 'Some BOB detail Text',
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
  },
  errorHandler: x => x
};

describe('Testing the Reports Page', () => {
  Object.defineProperty(window, 'URL', {
    configurable: true
  });

  window.URL = {
    createObjectURL: jest.fn()
  };

  it('Reports Header and Nav Link Testing Testing', async () => {
    const auth = {
      ...defaultAuth,
      profile: {
        ...defaultAuth.profile,
        agencyReportsEnabled: true
      }
    };

    const props = {
      ...defaultProps
    };

    const { getByText, getByTestId } = render(<Reports {...props} />, {
      auth,
      route: '/reports'
    });
    const header = getByText('Reports');

    const navReportLink = getByTestId('nav-reports');

    expect(navReportLink).toHaveTextContent(/REPORTS/);

    await waitForElement(() => header);

    const iconElement = Object.values(header.childNodes).find(
      node => node.tagName === 'I'
    );
    expect(iconElement.className).toEqual('fa fa-table');
  });

  it('No Report Nav Link if agencyReportsEnabled is false ', async () => {
    const auth = {
      ...defaultAuth,
      profile: {
        ...defaultAuth.profile,
        agencyReportsEnabled: false
      }
    };

    const props = {
      ...defaultProps
    };
    const { getByText } = render(<Reports {...props} />, {
      auth
    });

    await wait(() => {
      expect(getByText(/REPORTS/).parentNode).toHaveAttribute;
    });
  });

  it('Reports Section 2 Testing', async () => {
    const auth = {
      ...defaultAuth,
      profile: {
        ...defaultAuth.profile,
        agencyReportsEnabled: true
      }
    };

    const props = {
      ...defaultProps
    };
    const { getByTestId, getByText } = render(<Reports {...props} />, {
      auth
    });

    await waitForElement(() => getByText('Book Of Business'));

    expect(getByTestId('Book_Of_Business_title')).toHaveTextContent(
      /Book Of Business/
    );

    expect(getByTestId('Book_Of_Business_details')).toHaveTextContent(
      /Some BOB detail Text/
    );

    const download = getByTestId('Book_Of_Business_download_report');

    await wait(() => expect(fireEvent.click(download)).toEqual(true));
  });
});
