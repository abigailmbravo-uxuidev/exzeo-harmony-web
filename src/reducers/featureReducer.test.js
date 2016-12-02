import { Map } from 'immutable';
import feature from './featureReducer';

const state = new Map();

describe('featureReducer', () => {
  it('should exist', () => {
    expect(feature).to.exist;
  });

  it('should return a default', () => {
    const result = feature(state, {});
    expect(result).to.equal(state);
  });

  it('should set ld-started state', () => {
    const result = feature(state, { type: 'INITIALIZELD' });
    expect(result.get('ld-started')).to.be.true;
  });

  it('should turn a feature on', () => {
    const result = feature(state, {
      type: 'TOGGLE_FEATURE',
      feature: {
        featureName: 'Waffles',
        value: 'Are Tasty',
      },
    });
    expect(result.get('Waffles')).to.equal('Are Tasty');
  });
});
