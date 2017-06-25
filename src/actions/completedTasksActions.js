import * as types from './actionTypes';

// these actions are to allow the composite controls to communicate when their models are complete
// this communication allows the workflow to move to the next step

export const setCompletedTasks = (completedTasks) => {
  const stateObj = {
    type: types.COMPLETED_TASKS_SET,
    completedTasks
  };
  return stateObj;
};

// thunk if needed
export const dispatchCompletedTasks = completedTasks => dispatch => dispatch(setCompletedTasks(completedTasks));
