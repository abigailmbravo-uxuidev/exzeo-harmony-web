import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import 'jest-dom/extend-expect';
import 'react-testing-library/cleanup-after-each';
import { configure as reactTestingConfigure } from 'react-testing-library';

configure({ adapter: new Adapter() });
reactTestingConfigure({ testIdAttribute: 'data-test' });

// TODO: Upgrade to react-dom@16.9 and then remove this
const originalError = console.error;
beforeAll(() => {
  console.error = (...args) => {
    if (/Warning.*not wrapped in act/.test(args[0])) {
      return;
    }
    originalError.call(console, ...args);
  };
});

afterAll(() => {
  console.error = originalError;
});
//

const localStorageMock = {
  setItem(key, value) {
    // eslint-disable-next-line no-undef
    storage[key] = String(value) || '';
  },
  getItem(key) {
    // eslint-disable-next-line no-undef
    return key in storage ? String(storage[key]) : null;
  },
  removeItem(key) {
    // eslint-disable-next-line no-undef
    storage[key] = null;
  }
};

global.localStorage = localStorageMock;

export default localStorageMock;
