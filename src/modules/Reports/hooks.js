import { useState, useEffect } from 'react';

import * as serviceRunner from '@exzeo/core-ui/src/@Harmony/Domain/Api/serviceRunner';

export const useFetchReports = () => {
  const [reports, setReports] = useState([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const getReports = async () => {
      try {
        setLoaded(false);
        const config = {
          exchangeName: 'harmony',
          routingKey: 'harmony.report.listReport',
          data: {}
        };

        const response = await serviceRunner.callService(config, 'listReport');
        setReports(response.data.result);
      } catch (error) {
        console.error('Error fetching reports: ', error);
      } finally {
        setLoaded(true);
      }
    };
    // Call function, could use IFEE but that's sorta gross
    getReports();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { reports, loaded };
};
