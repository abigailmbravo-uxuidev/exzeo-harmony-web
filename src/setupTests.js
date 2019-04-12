import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import 'react-testing-library/cleanup-after-each';
import { configure as reactTestingConfigure } from 'react-testing-library';

configure({ adapter: new Adapter() });
reactTestingConfigure({ testIdAttribute: 'data-test' });

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
