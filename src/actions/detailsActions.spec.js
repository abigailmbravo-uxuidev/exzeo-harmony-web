import * as actions from './detailsActions';
import * as types from './actionTypes';

describe('detailsActions', () => {
  it('should create an action of set details', () => {
    const details = 'noop';
    const expectedAction = {
      type: types.SET_DETAILS,
      details
    };

    expect(actions.setDetails(details)).to.deep.equal(expectedAction);
  });

  it('should create an action of get details', () => {
    const expectedAction = {
      type: types.GET_DETAILS
    };

    expect(actions.getDetails()).to.deep.equal(expectedAction);
  });
});
