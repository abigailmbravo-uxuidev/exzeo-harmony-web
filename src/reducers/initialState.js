import {
  Map
} from 'immutable';

export default {
  user: {
    profile: {},
    isAuthenticated: false,
    token: ''
  },
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
