import * as types from './../actions/actionTypes';
import initialState from './initialState';
import completedTasksReducer from './completedTasksReducer';

describe('Completed Tasks Reducer', () => {
  it('should call ompleted Tasks', () => {
    const state = initialState.completedTasks;
    const inputProps = { };
    const action = {
      type: types.COMPLETED_TASKS_SET,
      completedTasks: {}
    };

    expect(completedTasksReducer(state, action)).toEqual(inputProps);
  });
});
