import * as serviceRunner from '@exzeo/core-ui/src/@Harmony/Domain/Api/serviceRunner';
//
const jestResolve = (result, error) =>
  jest.fn(() =>
    error ? Promise.reject(result) : Promise.resolve({ data: { result } })
  );

const jestResolveArray = (results = []) => {
  const jestFunc = jest.fn();
  results.forEach(r => {
    jestFunc.mockReturnValueOnce(
      r.error ? Promise.reject(r) : Promise.resolve(r)
    );
  });

  return jestFunc;
};

export const mockServiceRunner = (result, error) => {
  serviceRunner.callService = jestResolve(result, error);
};

export const mockServiceRunnerMultiple = result => {
  serviceRunner.callService = jestResolveArray(result);
};

export const mockQuestions = (result, error) => {
  serviceRunner.callQuestions = jestResolve({ data: { result } }, error);
};
