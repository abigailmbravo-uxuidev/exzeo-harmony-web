/* eslint-disable */
const mock = {
  "header": {
    "hideDetailSummary": true,
    "fields": [
      { "value": "quoteNumber" },
      { "value": "propertyAddress", "component": "Section", "label": "Address" },
      { "value": "yearBuilt" },
      { "value": "constructionType" },
      {
        "value": "coverageLimits.dwelling.amount",
        "label": "Coverage A",
        "format": "currency",
        "alternateFormat": {}
      },
      { "value": "premium", "component": "PremiumSection"}
    ]
  },
  pages: [
  ]
};

export default mock;
