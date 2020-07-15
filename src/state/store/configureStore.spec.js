import configureStore from './configureStore';

describe('configure store', () => {
  it('should initialize store', () => {
    process.env.NODE_ENV = 'production';
    const newStore = configureStore();
    expect(newStore);
  });
});
