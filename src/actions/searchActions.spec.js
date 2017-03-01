import * as actions from './searchActions';
import * as types from './actionTypes';

describe('searchActions', () => {
  it('should create an action of set search config', () => {
    const config = 'config';
    const expectedAction = {
      type: types.SET_SEARCH_CONFIG,
      config
    };

    expect(actions.setSearchConfig(config)).to.deep.equal(expectedAction);
  });

  it('should create an action of clear search config', () => {
    const expectedAction = {
      type: types.CLEAR_SEARCH_CONFIG
    };

    expect(actions.clearSearchConfig()).to.deep.equal(expectedAction);
  });
});
