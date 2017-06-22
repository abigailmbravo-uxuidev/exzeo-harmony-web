import {
  Map
} from 'immutable';

export default {
  search: new Map({}),
  workflowData: {},
  completedTasks: [],
  appState: {
    data: {
      submitting: false,
      updateWorkflowDetails: false
    }
  },
  navigation: {
    location: null
  },
  error: {}
};
