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
            id: 1000001,
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
            id: 1000002,
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
            id: 1000003,
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
            id: 1000004,
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
            id: 1000005,
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
            id: 1000006,
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
            id: 1000007,
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
    },
    {
      name: 'property',
      step: {},
      components: [
        {
          id: 200000,
          type: '$SECTION',
          dependencies: [],
          data: {},
          formData: {},
          children: [
            {
              id: 2000003,
              type: '$TITLE',
              dependencies: [],
              data: {
                text: 'Home and Location',
                icon: 'fa fa-map-marker'
              },
              formData: {},
              children: [],
            },
            {
              id: 2000004,
              type: '$ENTITY_DETAILS',
              dependencies: [],
              data: {
                extendedProperties: {
                  className: "home-and-location",
                  details: [
                    { label: 'Year Home Built', items: [{ format: '', path: 'property.yearBuilt'}] },
                    { label: 'Protection Class', items: [{ format: '', path: 'property.protectionClass'}] },
                    { label: 'Dist. to Tidal Waters', items: [{ format: '', path: 'property.distanceToTidalWater'}] },
                    { label: 'Residence Type', items: [{ format: '', path: 'property.residenceType'}] },
                    { label: 'Construction', items: [{ format: '', path: 'property.constructionType'}] },
                    { label: 'BCEG', items: [{ format: '', path: 'property.buildingCodeEffectivenessGrading'}] },
                    { label: 'Dist. to Fire Hydrant', items: [{ format: '', path: 'property.distanceToFireHydrant'}] },
                    { label: 'Square Footage', items: [{ format: '', path: 'property.squareFeet'}] },
                    { label: 'Year Roof Built', items: [{ format: '', path: 'property.yearOfRoof'}] },
                    { label: 'Family Units', items: [{ format: '', path: 'property.familyUnits'}] },
                    { label: 'Dist. to Fire Station', items: [{ format: '', path: 'property.distanceToFireStation'}] },
                    { label: 'Flood Zone', items: [{ format: '', path: 'property.floodZone'}] }
                  ]
                }
              },
              formData: {},
              children: [],
            }
          ],
        },
        {
          id: 200005,
          type: '$SECTION',
          dependencies: [],
          data: {},
          formData: {},
          children: [
            {
              id: 2000006,
              type: '$TITLE',
              dependencies: [],
              data: {
                text: 'Wind Mitigation',
                icon: 'fa fa-flag'
              },
              formData: {},
              children: [],
            },
            {
              id: 2000007,
              type: '$ENTITY_DETAILS',
              dependencies: [],
              data: {
                extendedProperties: {
                  className: "home-and-location",
                  details: [
                    { label: 'Roof Covering', items: [{ format: '', path: 'property.windMitigation.roofCovering'}] },
                    { label: 'Roof Geometry', items: [{ format: '', path: 'property.windMitigation.roofGeometry'}] },
                    { label: 'FBC Wind Speed', items: [{ format: '', path: 'property.windMitigation.floridaBuildingCodeWindSpeed'}] },
                    { label: 'Internal Pressure Design', items: [{ format: '', path: 'property.windMitigation.internalPressureDesign'}] },
                    { label: 'Roof Deck Attachment', items: [{ format: '', path: 'property.windMitigation.roofDeckAttachment'}] },
                    { label: 'Secondary Water Resistance (SWR)', items: [{ format: '', path: 'property.windMitigation.secondaryWaterResistance'}] },
                    { label: 'FBC Wind Speed Design', items: [{ format: '', path: 'property.windMitigation.floridaBuildingCodeWindSpeedDesign'}] },
                    { label: 'Wind Borne Debris Region (WBDR)', items: [{ format: '', path: 'property.windMitigation.windBorneDebrisRegion'}] },
                    { label: 'Roof to Wall Attachment', items: [{ format: '', path: 'property.windMitigation.roofToWallConnection'}] },
                    { label: 'Opening Protection', items: [{ format: '', path: 'property.windMitigation.openingProtection'}] },
                    { label: 'Terrain', items: [{ format: '', path: 'property.windMitigation.terrain'}] },
                    { label: 'Wind Mit Factor', items: [{ format: '', path: 'rating.worksheet.elements.windMitigationFactors.windMitigationDiscount'}] }
                  ]
                }
              },
              formData: {},
              children: [],
            }
          ],
        }
      ]
    }
  ]
};

export default mock;
