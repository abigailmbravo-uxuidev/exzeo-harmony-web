import { useState, useEffect } from 'react';

import * as serviceRunner from '@exzeo/core-ui/src/@Harmony/Domain/Api/serviceRunner';

export const useFetchReports = () => {
  const [reports, setReports] = useState([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const getReports = async () => {
      setLoaded(false);
      try {
        const config = {
          exchangeName: 'harmony',
          routingKey: 'harmony.report.listReport',
          data: {}
        };

        const response = await serviceRunner.callService(config, 'listReport');
        setReports(response.data.result);
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
