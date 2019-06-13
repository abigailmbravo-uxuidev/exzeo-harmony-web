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
    {
      name: 'policyHolder',
      step: {},
      components: [
      {
        id: 100000,
        type: '$SECTION',
        dependencies: [],
        data: {},
        formData: {},
        children: [
          {
            id: 1,
            type: '$TITLE',
            dependencies: [],
            data: {
              text: 'PolicyHolder 1',
              icon: 'fa fa-user-circle'
            },
            formData: {},
            children: [],
          },
          {
            id: 2,
            type: '$ENTITY_DETAILS',
            dependencies: [],
            data: {
              extendedProperties: {
                className: "row-items",
                details: [
                  { label: 'Policyholder Name', items: [{ format: 'name', path: 'policyHolders[0]'}] },
                  { label: 'Phone', items: [{ format: 'phone', path: 'policyHolders[0].primaryPhoneNumber'}]},
                  { label: 'Email', items: [{ format: '', path: 'policyHolders[0].emailAddress'}]},
                ]
              }
            },
            formData: {},
            children: [],
          },
          {
            id: 3,
            type: '$ENTITY_DETAILS',
            dependencies: [],
            data: {
              extendedProperties: {
                className: "row-items",
                details: [
                  { label: 'Mailing Address',
                  items: [
                    { format: '', path: 'policyHolderMailingAddress.address1'},
                    { optional: true, format: '', path: 'policyHolderMailingAddress.address2'}
                  ]
                },
                { label: 'City/State/Zip', items: [{ format: 'cityStateZip', path: 'policyHolderMailingAddress'}]}
                ]
              }
            },
            formData: {},
            children: [],
          },
          {
            id: 4,
            type: '$TITLE',
            dependencies: [],
            data: {
              text: 'Agent',
              icon: 'fa fa-user-circle'
            },
            formData: {},
            children: [],
          },
          {
            id: 5,
            type: '$ENTITY_DETAILS',
            dependencies: [],
            data: {
              extendedProperties: {
                className: "row-items",
                details: [
                  { label: 'Agent Name', items: [{ format: '', optionKey: 'agents', compareField: 'answer', valuePath: 'agentCode', selectField: 'label'}] }
                ]
              }
            },
            formData: {},
            children: [],
          }
        ],
      }]
    }
  ]
};

export default mock;
