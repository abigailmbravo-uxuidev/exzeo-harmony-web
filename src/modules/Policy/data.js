import * as serviceRunner from '@exzeo/core-ui/src/@Harmony/Domain/Api/serviceRunner';

export async function fetchPolicyDocuments(policyNumber, returnUrl, setError) {
  try {
    const config = {
      service: 'file-index',
      method: 'GET',
      path: `v1/fileindex/${policyNumber}`
    };
    const { data } = await serviceRunner.callService(config, returnUrl);
    return data;
  } catch (error) {
    setError(error.message);
  }
}
