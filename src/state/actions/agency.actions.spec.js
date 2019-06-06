import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import sinon from 'sinon';
import * as serviceRunner from '@exzeo/core-ui/src/@Harmony/Domain/Api/serviceRunner';
import * as agencyActions from './agency.actions';
import * as types from './actionTypes';

describe('Test Agency Actions', () => {
  const mockStore = configureStore([]);
  let initialState;
  let store;

  beforeEach(() => {
    initialState = {};
    store = mockStore(initialState);
  });

  it('should call setAgencies', () => {
    const agencies = [{ id: '1234' }, { id: '4321' }];

    const stateObj = [{
      type: types.SET_AGENCIES,
      agencies
    }];

    store.dispatch(agencyActions.setAgencies(agencies));

    expect(store.getActions()).toEqual(stateObj);
  });


  it('should call set agents', () => {
    const agents = [{ id: '1234' }, { id: '4321' }];

    const stateObj = [{
      type: types.SET_AGENTS,
      agents
    }];

    store.dispatch(agencyActions.setAgents(agents));

    expect(store.getActions()).toEqual(stateObj);
  });

  describe('Test agency actions async actions', () => {
    // create sandbox for stubs/mocks/spies
    const sandbox = sinon.sandbox.create();
    const middlewares = [thunk];
    const mockStore = configureStore(middlewares);
    let initialState;
    let store;
    let httpStub;


    beforeEach(() => {
      initialState = {};
      store = mockStore(initialState);
      httpStub = sinon.stub();
      sandbox.stub(serviceRunner, 'callService').callsFake((...args) => httpStub(...args));
    });

    afterEach(() => {
      // restore to original state for next test
      sandbox.restore();
      sandbox.reset();
    });

    it('Should call dispatch on getAgencies', async () => {
      const companyCode = 'HCI';
      const state = 'FL';
      const agencies = [{ id: '1234' }, { id: '4321' }];

      const stateObj = [{
        type: types.SET_AGENCIES,
        agencies
      }];

      httpStub.onCall(0).returns(Promise.resolve({ data: { result: agencies } }));

      await store.dispatch(agencyActions.getAgencies(companyCode, state));

      expect(store.getActions()).toEqual(stateObj);
    });

    it('Should call dispatch on getAgentsByAgencyCode', async () => {
      const agents = [{ agentCode: '1234' }];

      const stateObj = [{
        type: types.SET_AGENTS,
        agents
      }];

      httpStub.onCall(0).returns(Promise.resolve({ data: { result: agents } }));
      await store.dispatch(agencyActions.getAgentsByAgencyCode('1234'));
      expect(store.getActions()).toEqual(stateObj);
    });
  });
});

