/* eslint-disable */
const mock = {
  "header": {
    hideDetailSummary: true,
    showEffectiveDateButton: false,
    showReinstateButton: false,
    fields: [
      { value: 'policyHolder', component: 'Section', label: 'Policyholder' },
      { value: 'mailingAddress', component: 'Section' },
      { value: 'propertyAddress', component: 'Section' },
      { value: 'county', label: 'Property County' },
      { value: 'policyNumber' },
      { value: 'effectiveDate' },
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
              icon: 'fa fa-vcard-o'
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
            id: 1,
            type: '$TITLE',
            dependencies: [
              { path: 'policyHolders[1]', value: true }
            ],
            data: {
              text: 'PolicyHolder 2',
              icon: 'fa fa-vcard-o'
            },
            formData: {},
            children: [],
          },
          {
            id: 2,
            type: '$ENTITY_DETAILS',
            dependencies: [
              { path: 'policyHolders[1]', value: true }
            ],
            data: {
              extendedProperties: {
                className: "row-items",
                details: [
                  { label: 'Policyholder Name', items: [{ format: 'name', path: 'policyHolders[1]'}] },
                  { label: 'Phone', items: [{ format: 'phone', path: 'policyHolders[1].primaryPhoneNumber'}]},
                  { label: 'Email', items: [{ format: '', path: 'policyHolders[1].emailAddress'}]},
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
                    { optional: true, format: '', path: 'policyHolderMailingAddress.address2'},
                    { format: 'cityStateZip', path: 'policyHolderMailingAddress'}
                  ]
                }]
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
              icon: 'fa fa-vcard-o'
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
                  { label: 'Agent Name', items: [{ format: 'name', optionKey: 'agents', compareField: 'agentCode', valuePath: 'agentCode'}] },
                  { label: 'Phone', items: [{ format: 'phone', optionKey: 'agents', compareField: 'agentCode', valuePath: 'agentCode', selectField: 'primaryPhoneNumber'}] },
                  { label: 'Email', items: [{ format: '', optionKey: 'agents', compareField: 'agentCode', valuePath: 'agentCode', selectField: 'emailAddress'}] },
                  { label: 'Mailing Address', items: [
                    { format: '', optionKey: 'agents', compareField: 'agentCode', valuePath: 'agentCode', selectField: 'mailingAddress.address1'},
                    { format: '', optionKey: 'agents', compareField: 'agentCode', valuePath: 'agentCode', selectField: 'mailingAddress.address2'},
                    { format: 'cityStateZip', optionKey: 'agents', compareField: 'agentCode', valuePath: 'agentCode', selectField: 'mailingAddress'}

                ] },
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
