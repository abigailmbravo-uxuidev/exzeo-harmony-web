import { defaultMemoize } from 'reselect';

export const userResources = defaultMemoize((userProfile = {}, agency = {}) => {
  const isInternal =
    userProfile.userType?.toLowerCase() === 'internal' || false;
  const status = agency.status || null;

  const enableReports = userProfile.profile?.agencyReportsEnabled;
  const enableQuote = status === 'Active' || isInternal;
  const enableRetrieve =
    status === 'Active' || status === 'Pending' || isInternal;

  return {
    enableReports,
    enableQuote,
    enableRetrieve
  };
});

export const PRODUCT_DISPLAY_NAMES = {
  AF3: 'Flood',
  HO3: 'HO3'
};

export const STATE_OPTIONS = {
  FL: { answer: 'FL', label: 'FL' },
  SC: { answer: 'SC', label: 'SC' },
  NJ: { answer: 'NJ', label: 'NJ' }
};

export const PRODUCT_OPTIONS = {
  HO3: { answer: 'HO3', label: PRODUCT_DISPLAY_NAMES.HO3 },
  AF3: { answer: 'AF3', label: PRODUCT_DISPLAY_NAMES.AF3 }
};

export const cspConfigForSearch = (userProfile = {}, uri) => {
  const userResources = (userProfile.resources || []).filter(resource => {
    return (
      !resource.conditions &&
      resource.right === 'READ' &&
      resource.uri.includes(uri)
    );
  });

  const companyCodeMap = {};
  const stateOptions = [];
  const productOptions = [];
  const productOptionMap = {};

  userResources.forEach(resource => {
    const [companyCode, state, product] = resource.uri.split(':');
    // we need to pass companyCode to server when creating a quote
    const resourceKey = `${state}:${product}`;
    companyCodeMap[resourceKey] = companyCode;

    if (!stateOptions.find(o => o.answer === state)) {
      stateOptions.push(STATE_OPTIONS[state]);
    }
    if (!productOptions.find(o => o.answer === product)) {
      productOptions.push(PRODUCT_OPTIONS[product]);
    }
    if (!productOptionMap[state]) {
      productOptionMap[state] = [];
    }
    if (!productOptionMap[state].find(option => option.answer === product)) {
      productOptionMap[state].push(PRODUCT_OPTIONS[product]);
    }
  });

  return {
    companyCodeMap,
    stateOptions,
    productOptions,
    productOptionMap
  };
};
