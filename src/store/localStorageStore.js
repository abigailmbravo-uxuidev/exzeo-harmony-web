import LocalStorage from 'localStorage';

export const getItem = (itemKey) => {
  try {
    const serializeState = LocalStorage.getItem(itemKey);
    return JSON.parse(serializeState);
  } catch (err) {
    return undefined;
  }
};

export const setItem = (itemKey, value) => {
  try {
    const serializeState = JSON.stringify(value);
    LocalStorage.setItem(itemKey, serializeState);
  } catch (err) {
    // just ignore
  }
};
