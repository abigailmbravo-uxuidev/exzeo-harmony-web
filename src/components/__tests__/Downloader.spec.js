import React from 'react';
import { render } from '../../test-utils';
import { http as axios } from '@exzeo/core-ui';
import MockAdapter from 'axios-mock-adapter';
import Downloader, { downloadFile } from '../Downloader';

const props = {
  fileName: 'testfile',
  fileUrl: 'http://test/test.pdf',
  fileType: 'other'
};

describe('Testing Downloader component', () => {
  it('should test downloader', () => {
    const { getByText } = render(<Downloader {...props} />);
    expect(getByText(/testfile/i));
  });

  it('should test file download', () => {
    const mockAdapter = new MockAdapter(axios);
    const fileName = 'testfile';
    const fileUrl = 'http://test/test.pdf';
    const proxyUrl = `${process.env.REACT_APP_API_URL}/download`;
    const params = { url: fileUrl };
    const errorHandler = err => null;
    const mockImage = new Blob(
      [JSON.stringify([{ result: 'test' }], null, 2)],
      { type: 'octet/stream' }
    );

    window.URL.createObjectURL = url => url;
    mockAdapter
      .onGet(proxyUrl)
      .reply(200, { data: mockImage, statusText: 'error' });

    return downloadFile(fileUrl, fileName, errorHandler).then(result => {
      expect(result).toEqual(true);
    });
  });
});
