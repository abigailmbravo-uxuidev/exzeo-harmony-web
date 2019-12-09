import { useState, useEffect } from 'react';

import * as serviceRunner from '@exzeo/core-ui/src/@Harmony/Domain/Api/serviceRunner';

export const useFetchReports = () => {
  const [reports, setReports] = useState([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const getReports = async () => {
      setLoaded(false);
      try {
        // const config = {
        //   exchangeName: 'harmony',
        //   routingKey: 'harmony.report.listReport',
        //   data: {}
        // };

        //  const response = await serviceRunner.callService(config, 'listReport');
        //  console.log(response);
        //  setReports(response.data);
        setReports([
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
        return true;
      } catch (error) {
        console.error('Error fetching reports: ', error);
      }
      setLoaded(true);
    };
    // Call function, could use IFEE but that's sorta gross
    getReports();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { reports, loaded };
};
