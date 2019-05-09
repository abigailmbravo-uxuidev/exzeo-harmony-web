import * as types from './actionTypes';

describe('ActionTypes', () => {
  it('should contain the action types', () => {
    expect(types.AUTHENTICATING).toEqual('AUTHENTICATING');
    expect(types.AUTHENTICATED).toEqual('AUTHENTICATED');
    expect(types.AUTHENTICATE_ERROR).toEqual('AUTHENTICATE_ERROR');
    // expect(types.DETAILS_SET).toEqual('DETAILS_SET');
    // expect(types.DETAILS_GET).toEqual('DETAILS_GET');
    expect(types.APPSTATE_SET).toEqual('APPSTATE_SET');
    expect(types.APPSTATE_ERROR).toEqual('APPSTATE_ERROR');
    expect(types.APP_ERROR).toEqual('APP_ERROR');
    expect(types.APP_ERROR_CLEAR).toEqual('APP_ERROR_CLEAR');
    expect(types.COMPLETED_TASKS_SET).toEqual('COMPLETED_TASKS_SET');
  });
});