import configureStore from 'redux-mock-store';
import nock from 'nock';

import * as types from './actionTypes';
import * as cgActions from './cgActions';

const middlewares = [];
const mockStore = configureStore(middlewares);
describe('CG Actions', () => {
  it('should call start', () => {
    const initialState = {};
    const store = mockStore(initialState);

    const inputProps = {
      modelName: 'bb',
      workflowId: '123'
    }
    const newWorkflowData = {};
    newWorkflowData[inputProps.modelName] = {};
    newWorkflowData[inputProps.modelName].data = inputProps.workflowId;

    const stateObj = [{
      type: types.CG_START,
      workflowData: newWorkflowData
    }];

    store.dispatch(cgActions.start(inputProps.modelName, inputProps.workflowId));

    expect(store.getActions()).toEqual(stateObj);
  });

  it('should call complete', () => {
    const initialState = {};
    const store = mockStore(initialState);

    const inputProps = {
      modelName: 'bb',
      workflowId: '123'
    }
    const newWorkflowData = {};
    newWorkflowData[inputProps.modelName] = {};
    newWorkflowData[inputProps.modelName].data = inputProps.workflowId;

    const stateObj = [{
      type: types.CG_COMPLETE,
      workflowData: newWorkflowData
    }];

    store.dispatch(cgActions.complete(inputProps.modelName, inputProps.workflowId));

    expect(store.getActions()).toEqual(stateObj);
  });

  // it('should call start workflow thunk', () => {
  //   const data = {
  //     modelName: 'bb',
  //     data: {
  //       bb: '123'
  //     }
  //   };

  //   const axiosOptions = {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json'
  //     },
  //     url: `${process.env.REACT_APP_API_URL}`,
  //     data
  //   };

  //   console.log('sdfsdfsdfsdfsdfsdf', axiosOptions);
  //   nock(axiosOptions.url)
  //     .post('/cg/start', axiosOptions.data)
  //     .reply(200, { data: { modelInstanceId: '1234' } });

  //   const initialState = {};
  //   const store = mockStore(initialState);

  //   const inputProps = {
  //     modelName: 'bb',
  //     workflowId: '123'
  //   }

  //   const newWorkflowData = {};
  //   newWorkflowData[inputProps.modelName] = {};
  //   newWorkflowData[inputProps.modelName].data = inputProps.workflowId;

  //   const stateObj = [{
  //     type: types.APP_ERROR_CLEAR,
  //     error: {}
  //   }, {
  //     type: types.CG_START,
  //     workflowData: newWorkflowData
  //   }];

  //   cgActions.startWorkflow(data.modelName, data.data, false)(store.dispatch)
  //     .then(() => {
  //       expect(store.getActions()).toEqual(stateObj);
  //     })
  //     .catch(err => {
  //       expect(err).toBeNull();
  //     })

  // });
});
