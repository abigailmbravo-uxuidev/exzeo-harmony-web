import React from 'react';
import configureStore from 'redux-mock-store';
import { propTypes } from 'redux-form';
import { shallow } from 'enzyme';

import { SearchResults } from './SearchResults';

const middlewares = [];
const mockStore = configureStore(middlewares);

it('should test props for SearchResults address', () => {
  const initialState = {
    cg: {
      bb: {
        data: {
          previousTask: {
            name: 'searchAddress',
            value: {
              result: {
                IndexResult: [
                  {
                    id: '120955882646A1E36',
                    source: 'casaclue',
                    residenceType: 'N/A',
                    physicalAddress: {
                      city: 'ORLANDO',
                      latitude: '28.614350',
                      zip: '32810',
                      state: 'FL',
                      address2: '',
                      longitude: '-81.393340',
                      county: 'ORANGE',
                      address1: '234 AMADOR CIR'
                    }
                  }
                ]
              }
            }
          },
          modelInstanceId: '123',
          model: {},
          uiQuestions: []
        }
      }
    },
    appState: {
      modelName: 'bb'
    }
  };
  const store = mockStore(initialState);
  const props = {
    tasks: {
      bb: {
        data: {
          activeTask: {
            name: ''
          },
          previousTask: {
            name: 'searchAddress',
            value: {
              result: {
                IndexResult: [
                  {
                    id: '120955882646A1E36',
                    source: 'casaclue',
                    residenceType: 'N/A',
                    physicalAddress: {
                      city: 'ORLANDO',
                      latitude: '28.614350',
                      zip: '32810',
                      state: 'FL',
                      address2: '',
                      longitude: '-81.393340',
                      county: 'ORANGE',
                      address1: '234 AMADOR CIR'
                    }
                  }
                ]
              }
            }
          },
          modelInstanceId: '123',
          model: {},
          uiQuestions: []
        }
      }
    },
    fieldQuestions: [],
    quoteData: {},
    dispatch: store.dispatch,
    appState: {
      modelName: 'bb',
      data: {
        submitting: false
      }
    }
  };
  const wrapper = shallow(<SearchResults store={store} {...props} />);
  expect(wrapper);
});

it('should test props for SearchResults quote', () => {
  const initialState = {
    cg: {
      bb: {
        data: {
          previousTask: {
            name: 'searchQuote',
            value: {
              result: {
                quotes: [
                  {
                    property: {
                      physicalAddress: {
                        address1: '1000 Poplar Ave',
                        address2: null,
                        city: 'Tampa',
                        state: 'FL',
                        county: 'Hillsborough',
                        zip: '33607',
                        latitude: 28.0959571,
                        longitude: -82.5380074
                      }
                    },
                    _id: '',
                    policyHolders: []
                  }
                ]
              }
            }
          },
          activeTask: {
            name: 'chooseQuote',
            value: {
              result: {}
            }
          },
          modelInstanceId: '123',
          model: {},
          uiQuestions: []
        }
      }
    },
    appState: {
      modelName: 'bb'
    }
  };
  const store = mockStore(initialState);
  const props = {
    handleNewTab(address, prop) {},
    tasks: { ...initialState.cg },
    fieldQuestions: [],
    quoteData: {},
    dispatch: store.dispatch,
    appState: {
      modelName: 'bb',
      data: {
        submitting: false
      }
    },
    ...propTypes
  };
  SearchResults(props);
});

it('should test props for SearchResults policy', () => {
  const initialState = {
    search: {
      searchType: 'policy'
    },
    appState: {
      modelName: 'bb'
    }
  };
  const store = mockStore(initialState);
  const props = {
    search: {
      searchType: 'policy'
    },
    handleNewTab(address, prop) {},
    tasks: { ...initialState.cg },
    fieldQuestions: [],
    policyResults: {
      policies: [
        {
          property: { physicalAddress: {} },
          policyHolders: [{ firstName: '', lastName: '' }]
        }
      ]
    },
    dispatch: store.dispatch,
    appState: {
      modelName: 'bb',
      data: {
        submitting: false
      }
    },
    ...propTypes
  };
  SearchResults(props);
});
