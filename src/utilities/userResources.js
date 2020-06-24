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

export const getMatchingResources = (resources = [], uri, right) => {
  return resources.filter(resource => {
    if (process.env.NODE_ENV !== 'production') {
      if (!!resource.conditions) {
        // As we use this more and more, every way we can slim down the resources array will help with perf.
        throw new Error(
          'Please filter out legacy resources in store when user logs in'
        );
      }
    }

    return resource.right === right && resource.uri.includes(uri);
  });
};

export const doesUserHaveAccess = (resources = [], uri, right) => {
  const matchingResources = getMatchingResources(resources, uri, right);

  return matchingResources.length > 0;
};

export const cspConfigForSearch = (userProfile = {}, uri, right) => {
  const userResources = getMatchingResources(userProfile.resources, uri, right);

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
