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
    },
    {
      name: 'coverage',
      step: {},
      components: [
        {
          id: 300000,
          type: '$SECTION',
          dependencies: [],
          data: {},
          formData: {},
          children: [
            {
              id: 3000003,
              type: '$TITLE',
              dependencies: [],
              data: {
                text: 'Coverage Limits',
                icon: 'fa fa-line-chart'
              },
              formData: {},
              children: [],
            },
            {
              id: 3000004,
              type: '$ENTITY_DETAILS',
              dependencies: [],
              data: {
                extendedProperties: {
                  className: "coverage",
                  details: [
                    { label: 'A. Dwelling', items: [{ format: '', path: 'coverageLimits.dwelling.amount'}] },
                    { label: 'B. Other Structures', items: [{ format: 'currency', path: 'coverageLimits.otherStructures.amount'}] },
                    { label: 'C. Personal Property', items: [{ format: 'currency', path: 'coverageLimits.personalProperty.amount'}] },
                    { label: 'D. Loss of Use', items: [{ format: 'currency', path: 'coverageLimits.lossOfUse.amount'}] },
                    { label: 'E. Personal Liability', items: [{ format: 'currency', path: 'coverageLimits.personalLiability.amount'}] },
                    { label: 'F. Medical Payments', items: [{ format: 'currency', path: 'coverageLimits.medicalPayments.amount'}] },
                    { label: 'Personal Propery Replacement Cost', items: [{ format: 'bool', path: 'coverageLimits.personalPropertyReplacementCost.answer'}] },
                    { label: 'Mold Property', items: [{ format: 'currency', path: 'coverageLimits.moldProperty.amount'}] },
                    { label: 'Mold Liability', items: [{ format: 'currency', path: 'coverageLimits.moldLiability.amount'}] },
                    { label: 'Ordinance or Law', items: [{ format: 'percent', path: 'coverageLimits.ordinanceOrLaw.amount'}] },
                    { label: 'All other Perils Deductible', items: [{ format: 'currency', path: 'deductibles.allOtherPerils.amount'}] },
                    { label: 'Hurricane Deductible', items: [{ format: 'currency', path: 'deductibles.hurricane.calculatedAmount'}] },
                    { label: 'Sinkhole Deductible', items: [{ format: 'currency', path: 'deductibles.sinkhole.calculatedAmount'}] },
                  ]
                }
              },
              formData: {},
              children: [],
            }
          ],
        },
        {
          id: 300005,
          type: '$SECTION',
          dependencies: [],
          data: {},
          formData: {},
          children: [
            {
              id: 3000006,
              type: '$TITLE',
              dependencies: [],
              data: {
                text: 'Discount / Surcharge',
                icon: 'fa fa-shopping-cart'
              },
              formData: {},
              children: [],
            },
            {
              id: 3000007,
              type: '$ENTITY_DETAILS',
              dependencies: [],
              data: {
                extendedProperties: {
                  className: "discount-surcharge",
                  details: [
                    { label: 'Townhouse/Rowhouse', items: [{ format: 'bool', path: 'property.townhouseRowhouse'}] },
                    { label: 'Property Ever Rented', items: [{ format: '', path: 'underwritingAnswers.rented.answer'}] },
                    { label: 'Seasonally Occupied', items: [{ format: '', path: 'underwritingAnswers.monthsOccupied.answer'}] },
                    { label: 'No Prior Insurance', items: [{ format: '', path: 'underwritingAnswers.noPriorInsuranceSurcharge.answer'}] },
                    { label: 'Burgular Alarm', items: [{ format: 'bool', path: 'property.burgularAlarm'}] },
                    { label: 'Fire Alarm', items: [{ format: 'bool', path: 'property.fireAlarm'}] },
                    { label: 'Sprinkler', items: [{ format: '', path: 'property.sprinkler'}] },
                    { label: 'Wind Mit Factor', items: [{ format: '', path: 'rating.worksheet.elements.windMitigationFactors.windMitigationDiscount'}] }
                  ]
                }
              },
              formData: {},
              children: [],
            }
          ],
        },
        {
          id: 300008,
          type: '$SECTION',
          dependencies: [],
          data: {},
          formData: {},
          children: [
            {
              id: 3000009,
              type: '$TITLE',
              dependencies: [],
              data: {
                text: 'Deductible',
                icon: 'fa fa-long-arrow-down'
              },
              formData: {},
              children: [],
            },
            {
              id: 3000010,
              type: '$ENTITY_DETAILS',
              dependencies: [],
              data: {
                extendedProperties: {
                  className: "deductible",
                  details: [
                    { label: 'All other Perils', items: [{ format: 'currency', path: 'deductibles.allOtherPerils.amount'}] },
                    { label: 'Hurricane Deductible', items: [{ format: 'percent', path: 'deductibles.hurricane.amount'}] },
                    { label: 'Sinkhole Deductible', items: [{ format: 'percent', path: 'deductibles.sinkhole.amount'}] },
                  ]
                }
              },
              formData: {},
              children: [],
            }
          ],
        }
      ]
    },
    {
      name: 'billing',
      step: {},
      components: [
        {
          id: 400000,
          type: '$SECTION',
          dependencies: [],
          data: {},
          formData: {},
          children: [
            {
              id: 4000006,
              type: '$TITLE',
              dependencies: [],
              data: {
                text: 'Premium',
                icon: 'fa fa-area-chart'
              },
              formData: {},
              children: [],
            },
            {
              id: 4000007,
              type: '$ENTITY_DETAILS',
              dependencies: [],
              data: {
                extendedProperties: {
                  className: "home-and-location",
                  details: [
                    { label: 'Current Premium', items: [{ format: 'currency', path: 'billing.currentPremium'}] },
                    { label: 'Initial Premium', items: [{ format: 'currency', path: 'billing.initialPremium'}] },
                    { label: 'Balance Due', items: [{ format: 'currency', path: 'billing.balance.$numberDecimal'}] }
                  ]
                }
              },
              formData: {},
              children: [],
            },
            {
              id: 4000008,
              type: '$CUSTOM',
              dependencies: [],
              data: {
                component: '$POLICY_BILLING',
              },
              formData: {},
              children: [],
            },
          ]
        },
        {
          id: 400009,
          type: '$SECTION',
          dependencies: [],
          data: {},
          formData: {},
          children: [
            {
              id: 4000010,
              type: '$TITLE',
              dependencies: [],
              data: {
                text: 'Payments',
                icon: 'fa fa-credit-card'
              },
              formData: {},
              children: [],
            },{
              id: 4000011,
              type: '$CUSTOM',
              dependencies: [],
              data: {
                component: '$POLICY_PAYMENTS',
              },
              formData: {},
              children: [],
            },
          ]
        },
      ]
    }
  ]
};

export default mock;
