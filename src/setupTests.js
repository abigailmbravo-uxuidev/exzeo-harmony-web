import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

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

export default localStorageMock
