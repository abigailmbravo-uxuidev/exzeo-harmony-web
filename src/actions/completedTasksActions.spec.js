import configureStore from 'redux-mock-store';
import * as types from './actionTypes';
import * as completedTasksActions from './completedTasksActions';

const middlewares = [];
const mockStore = configureStore(middlewares);
describe('Completed Task Actions', () => {
  it('should call setCompletedTasks', () => {
    const initialState = {};
    const store = mockStore(initialState);

    const completedTasks = ['task1', 'task2'];

    const stateObj = [{
      type: types.COMPLETED_TASKS_SET,
      completedTasks
    }];

    store.dispatch(completedTasksActions.setCompletedTasks(completedTasks));

    expect(store.getActions()).toEqual(stateObj);
  });

  it('should call dispatchCompletedTasks', () => {
    const initialState = {};
    const store = mockStore(initialState);

    const completedTasks = ['task1', 'task2'];

    const stateObj = [{
      type: types.COMPLETED_TASKS_SET,
      completedTasks
    }];
    completedTasksActions.dispatchCompletedTasks(completedTasks)(store.dispatch);

    expect(store.getActions()).toEqual(stateObj);
  });
});
