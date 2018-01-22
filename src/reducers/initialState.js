import {
  Map
} from 'immutable';

export default {
  search: new Map({}),
  workflowData: {},
  policyState: {
    policyNumber: null,
    update: false
  },
  service: {},
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
  error: {},
  authState: {
    userProfile: null
  }
};
