import * as types from './../actions/actionTypes';
import initialState from './initialState';

export default function completedTasksReducer(state = initialState.completedTasks, action) {
  switch (action.type) {

    case types.COMPLETED_TASKS_SET:
      return { ...state, ...action.completedTasks };
    default:
      return state;
  }
}
