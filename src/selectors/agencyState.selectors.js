import { createSelector } from 'reselect';

export const getAgents = state => state.agencyState.agents || [];

export const getAgentsList = createSelector(
    [getAgents],
    (agents) => {
      if (!agents || !Array.isArray(agents)) return [];
      return agents.map(o => ({
        label: `${o.firstName} ${o.lastName}`,
        answer: o.agentCode
      }));
    }
  );