import * as actions from './featureActions';
import * as types from './actionTypes';

describe('featureActions', () => {
  it('should create an action of toggle feature', () => {
    const feature = 'chance';
    const expectedAction = {
      type: types.TOGGLE_FEATURE,
      feature
    };

    expect(actions.toggleFeature(feature)).to.deep.equal(expectedAction);
  });

  it('should create an action of initialze ld', () => {
    const expectedAction = {
      type: types.INITIALIZELD
    };

    expect(actions.initializeLDSuccess()).to.deep.equal(expectedAction);
  });
});
