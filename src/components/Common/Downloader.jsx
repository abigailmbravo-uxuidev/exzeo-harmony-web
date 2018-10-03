import React from 'react';
import axios from 'axios';
import { format } from '@exzeo/core-ui';

const { toFileName } = format;

export const downloadFile = (fileUrl, fileName, errorHandler) => {
  const proxyUrl = `${process.env.REACT_APP_API_URL}/download`;
  const params = { url: fileUrl };

  return axios.get(proxyUrl, { responseType: 'blob', params })
    .then((response) => {
      if (window.navigator && window.navigator.msSaveOrOpenBlob) {
        window.navigator.msSaveOrOpenBlob(response.data, fileName);
        return true;
      } else {
        const blobUrl = window.URL.createObjectURL(response.data);
        const link = window.document.createElement('a');
        link.href = blobUrl;
        link.download = fileName;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        return true;
      }
    })
    .catch(err => errorHandler({ message: err.response.statusText }));
};

const Downloader = (props) => {
  const { fileName, fileUrl, errorHandler } = props;
  return (
    <div className="btn btn-link" onClick={() => downloadFile(fileUrl, fileName, errorHandler)}>{ toFileName(fileName) }</div>
  );
};

export default Downloader;
