import { useEffect, useState } from 'react';
import { fetchPolicyDocuments } from './data';

export const useFetchPolicyDocuments = (policyNumber, setError) => {
  const [policyDocuments, setPolicyDocuments] = useState();

  useEffect(() => {
    const getPolicyDocuments = async () => {
      const { result } = await fetchPolicyDocuments(
        policyNumber,
        'getPolicyDocuments',
        setError
      );
      setPolicyDocuments(result);
    };
    getPolicyDocuments();
  }, [policyNumber, setError]);

  return { policyDocuments };
};
