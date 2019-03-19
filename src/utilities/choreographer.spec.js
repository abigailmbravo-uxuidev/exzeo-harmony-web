
import sinon from 'sinon';
import MockAdapter from 'axios-mock-adapter';
import axios from 'axios';

import choreographer from './choreographer';

const MOCK_START_CG_DATA = {
  "modelInstanceId": "3264484",
  "modelName": "quoteModel",
  "activeTask": {
    "metaInfo": {
      "expectedInputs": [
        {
          "dataType": "string",
          "displayText": "Address",
          "name": "address",
          "required": false
        },
        {
          "dataType": "string",
          "displayText": "First Name",
          "name": "firstName",
          "required": false
        },
        {
          "dataType": "string",
          "displayText": "Last Name",
          "name": "lastName",
          "required": false
        },
        {
          "dataType": "string",
          "displayText": "Page Number",
          "name": "pageNumber",
          "required": false
        },
        {
          "dataType": "string",
          "displayText": "Page Size",
          "name": "pageSize",
          "required": false
        },
        {
          "dataType": "string",
          "displayText": "Quote Number",
          "name": "quoteNumber",
          "required": false
        },
        {
          "dataType": "string",
          "displayText": "Search Type",
          "name": "searchType",
          "required": true
        },
        {
          "dataType": "string",
          "displayText": "Sort By",
          "name": "sort",
          "required": false
        },
        {
          "dataType": "string",
          "displayText": "Sort Direction",
          "name": "sortDirection",
          "required": false
        }
      ],
      "taskType": "userTask"
    },
    "name": "search"
  },
  "previousTask": {
    "name": "docuSignUrl",
    "value": "https://api.harmony-ins.com/ds"
  },
  "tasks": {
    "userTasks": [
      "addAdditionalAIs",
      "askAdditionalCustomerData",
      "askAdditionalInsured",
      "askAdditionalInterest",
      "askAdditionalPolicyHolder",
      "askAdditionalQuestions",
      "askBillPayer",
      "askEmail",
      "askMortgagee",
      "askPremiumFinance",
      "askScheduleInspectionDates",
      "askToCustomizeDefaultQuote",
      "askToSearchAgain",
      "askUWAnswers",
      "chooseAddress",
      "chooseQuote",
      "customizeDefaultQuote",
      "editPolicyHolder",
      "editVerify",
      "refreshOnUnderWritingReviewError",
      "search",
      "sendEmailOrContinue",
      "showAssumptions",
      "showCustomizedQuoteAndContinue"
    ],
    "variableTasks": [
      "UWDecision1EndError",
      "UWDecision2EndError",
      "UWDecision3EndError",
      "UWDecision4EndError",
      "UWDecision5EndError",
      "UnderWritingReviewError",
      "buildDeductibles",
      "docuSignUrl",
      "filterDeductibles",
      "filterPolicyHolders",
      "filterPolicyHoldersById",
      "filteredEditPolicyHolder",
      "filteredFirstPolicyHolder",
      "getDocumentsForDocusign",
      "getFirstZipCodeFromArray",
      "getFirstZipCodeFromArrayForPDF",
      "mergeQuoteforUWD1",
      "mergeQuoteforUWD2",
      "mergeQuoteforUWD3",
      "mergeQuoteforUWD4",
      "mergeQuoteforUWD5",
      "prepareEditPolicyHolderArray",
      "prepareFirstPolicyHolderArray",
      "preparePolicyHolders",
      "searchEnd",
      "singleQuote",
      "transactionSpec",
      "uiTasks",
      "underWritingReviewEndError",
      "zipCodeSettingsForPDFTimezone"
    ],
    "modelTasks": [],
    "receiveTasks": [
      "getQuoteApplicationPDFs"
    ],
    "serviceTasks": [
      "UWDecision1",
      "UWDecision2",
      "UWDecision3",
      "UWDecision4",
      "UWDecision5",
      "billingOptions",
      "billingOptionsForQuoteSummary",
      "createQuote",
      "emailQuoteSummaryPDF",
      "generateAgentQuoteSummaryPDF",
      "generateQuoteApplicationPDFs",
      "getActiveAgents",
      "getAgencyDocument",
      "getAgentDocument",
      "getCompanyContactList",
      "getCost",
      "getFinalQuote",
      "getInfoFromCasaclue",
      "getListOfUWQuestions",
      "getQuote",
      "getQuoteApplicationFormsList",
      "getQuoteBeforeAIs",
      "getQuoteBeforeRate",
      "getQuoteForSummary",
      "getQuoteSummaryForm",
      "getQuoteWithAIs",
      "getRate",
      "getRecipients",
      "getZipCodeSettings",
      "getZipCodeSettingsForQuote",
      "notifyDocusignApp",
      "notifyInspectionApp",
      "quote",
      "quoteSchema",
      "retrieveQuote",
      "searchAddress",
      "searchQuote",
      "showFinalQuoteDetail",
      "updateQuoteStateBeforeAssumptions",
      "updateQuoteStateDocusign",
      "updateQuoteStateFatalUWD4",
      "updateQuoteStateReviewUWD4",
      "updateQuoteStateUWD1",
      "updateQuoteStateUWD2",
      "updateQuoteStateUWD3",
      "updateQuoteStateUWD5",
      "updateQuoteWithAdditionalInsurers",
      "updateQuoteWithAdditionalInterests",
      "updateQuoteWithAdditionalPolicyHolder",
      "updateQuoteWithAdditionalQuestions",
      "updateQuoteWithBillPayer",
      "updateQuoteWithCustomerData",
      "updateQuoteWithCustomizedInfo",
      "updateQuoteWithEditPolicyHolder",
      "updateQuoteWithMortgagees",
      "updateQuoteWithPremiumFinance",
      "updateQuoteWithRatesAndCost",
      "updateQuoteWithUWAnswers",
      "updateQuoteWithUWDecision1",
      "updateQuoteWithUWDecision2",
      "updateQuoteWithUWDecision3",
      "updateQuoteWithUWDecision4",
      "updateQuoteWithUWDecision5"
    ]
  },
  "uiQuestions": [],
  "model": {
    "activeTask": {
      "metaInfo": {
        "expectedInputs": [
          {
            "dataType": "string",
            "displayText": "Address",
            "name": "address",
            "required": false
          },
          {
            "dataType": "string",
            "displayText": "First Name",
            "name": "firstName",
            "required": false
          },
          {
            "dataType": "string",
            "displayText": "Last Name",
            "name": "lastName",
            "required": false
          },
          {
            "dataType": "string",
            "displayText": "Page Number",
            "name": "pageNumber",
            "required": false
          },
          {
            "dataType": "string",
            "displayText": "Page Size",
            "name": "pageSize",
            "required": false
          },
          {
            "dataType": "string",
            "displayText": "Quote Number",
            "name": "quoteNumber",
            "required": false
          },
          {
            "dataType": "string",
            "displayText": "Search Type",
            "name": "searchType",
            "required": true
          },
          {
            "dataType": "string",
            "displayText": "Sort By",
            "name": "sort",
            "required": false
          },
          {
            "dataType": "string",
            "displayText": "Sort Direction",
            "name": "sortDirection",
            "required": false
          }
        ],
        "taskType": "userTask"
      },
      "name": "search"
    },
    "completedTasks": [
      "uiTasks",
      "docuSignUrl"
    ],
    "globalVariables": [
      {
        "name": "modelName",
        "value": "quoteModel"
      },
      {
        "name": "completedTasks",
        "value": [
          "docuSignUrl",
          "uiTasks",
          "seqStartEvent"
        ]
      },
      {
        "name": "currentActiveTask",
        "value": "search"
      },
      {
        "name": "lastActiveTask",
        "value": "docuSignUrl"
      }
    ],
    "modelInstanceId": "3264484",
    "modelName": "quoteModel",
    "state": "running",
    "tasks": {
      "userTasks": [
        "addAdditionalAIs",
        "askAdditionalCustomerData",
        "askAdditionalInsured",
        "askAdditionalInterest",
        "askAdditionalPolicyHolder",
        "askAdditionalQuestions",
        "askBillPayer",
        "askEmail",
        "askMortgagee",
        "askPremiumFinance",
        "askScheduleInspectionDates",
        "askToCustomizeDefaultQuote",
        "askToSearchAgain",
        "askUWAnswers",
        "chooseAddress",
        "chooseQuote",
        "customizeDefaultQuote",
        "editPolicyHolder",
        "editVerify",
        "refreshOnUnderWritingReviewError",
        "search",
        "sendEmailOrContinue",
        "showAssumptions",
        "showCustomizedQuoteAndContinue"
      ],
      "variableTasks": [
        "UWDecision1EndError",
        "UWDecision2EndError",
        "UWDecision3EndError",
        "UWDecision4EndError",
        "UWDecision5EndError",
        "UnderWritingReviewError",
        "buildDeductibles",
        "docuSignUrl",
        "filterDeductibles",
        "filterPolicyHolders",
        "filterPolicyHoldersById",
        "filteredEditPolicyHolder",
        "filteredFirstPolicyHolder",
        "getDocumentsForDocusign",
        "getFirstZipCodeFromArray",
        "getFirstZipCodeFromArrayForPDF",
        "mergeQuoteforUWD1",
        "mergeQuoteforUWD2",
        "mergeQuoteforUWD3",
        "mergeQuoteforUWD4",
        "mergeQuoteforUWD5",
        "prepareEditPolicyHolderArray",
        "prepareFirstPolicyHolderArray",
        "preparePolicyHolders",
        "searchEnd",
        "singleQuote",
        "transactionSpec",
        "uiTasks",
        "underWritingReviewEndError",
        "zipCodeSettingsForPDFTimezone"
      ],
      "modelTasks": [],
      "receiveTasks": [
        "getQuoteApplicationPDFs"
      ],
      "serviceTasks": [
        "UWDecision1",
        "UWDecision2",
        "UWDecision3",
        "UWDecision4",
        "UWDecision5",
        "billingOptions",
        "billingOptionsForQuoteSummary",
        "createQuote",
        "emailQuoteSummaryPDF",
        "generateAgentQuoteSummaryPDF",
        "generateQuoteApplicationPDFs",
        "getActiveAgents",
        "getAgencyDocument",
        "getAgentDocument",
        "getCompanyContactList",
        "getCost",
        "getFinalQuote",
        "getInfoFromCasaclue",
        "getListOfUWQuestions",
        "getQuote",
        "getQuoteApplicationFormsList",
        "getQuoteBeforeAIs",
        "getQuoteBeforeRate",
        "getQuoteForSummary",
        "getQuoteSummaryForm",
        "getQuoteWithAIs",
        "getRate",
        "getRecipients",
        "getZipCodeSettings",
        "getZipCodeSettingsForQuote",
        "notifyDocusignApp",
        "notifyInspectionApp",
        "quote",
        "quoteSchema",
        "retrieveQuote",
        "searchAddress",
        "searchQuote",
        "showFinalQuoteDetail",
        "updateQuoteStateBeforeAssumptions",
        "updateQuoteStateDocusign",
        "updateQuoteStateFatalUWD4",
        "updateQuoteStateReviewUWD4",
        "updateQuoteStateUWD1",
        "updateQuoteStateUWD2",
        "updateQuoteStateUWD3",
        "updateQuoteStateUWD5",
        "updateQuoteWithAdditionalInsurers",
        "updateQuoteWithAdditionalInterests",
        "updateQuoteWithAdditionalPolicyHolder",
        "updateQuoteWithAdditionalQuestions",
        "updateQuoteWithBillPayer",
        "updateQuoteWithCustomerData",
        "updateQuoteWithCustomizedInfo",
        "updateQuoteWithEditPolicyHolder",
        "updateQuoteWithMortgagees",
        "updateQuoteWithPremiumFinance",
        "updateQuoteWithRatesAndCost",
        "updateQuoteWithUWAnswers",
        "updateQuoteWithUWDecision1",
        "updateQuoteWithUWDecision2",
        "updateQuoteWithUWDecision3",
        "updateQuoteWithUWDecision4",
        "updateQuoteWithUWDecision5"
      ]
    },
    "variables": [
      {
        "name": "dsUrl",
        "value": "https://api.harmony-ins.com/ds"
      },
      {
        "name": "uiTasks",
        "value": {
          "tasks": [
            {
              "component": "Search",
              "label": "Enter Address",
              "link": "search",
              "name": "search",
              "order": 1
            },
            {
              "data": [
                {
                  "key": "property",
                  "value": "searchAddress"
                }
              ],
              "label": "Property Address",
              "link": "search",
              "name": "chooseAddress",
              "order": 2
            },
            {
              "data": [
                {
                  "key": "quoteSearchResults",
                  "value": "searchQuote"
                }
              ],
              "label": "Property Quote",
              "link": "search",
              "name": "chooseQuote",
              "order": 3
            },
            {
              "component": "Demographics",
              "data": [
                {
                  "key": "questions",
                  "value": "api"
                },
                {
                  "key": "quote",
                  "value": "quote"
                },
                {
                  "fields": [
                    "property.physicalAddress",
                    "property.yearBuilt"
                  ],
                  "key": "quoteDetails",
                  "value": "quote"
                }
              ],
              "label": "Demographics",
              "link": "demographics",
              "name": "askAdditionalCustomerData",
              "order": 4
            },
            {
              "component": "UnderWriting",
              "data": [
                {
                  "key": "quote",
                  "value": "quote"
                },
                {
                  "key": "questions",
                  "value": "getListOfUWQuestions"
                },
                {
                  "fields": [
                    "property.physicalAddress",
                    "property.yearBuilt"
                  ],
                  "key": "quoteDetails",
                  "value": "quote"
                }
              ],
              "label": "UnderWriting Q&A",
              "link": "underwriting",
              "name": "askUWAnswers",
              "order": 5
            },
            {
              "component": "Customize",
              "data": [
                {
                  "key": "quote",
                  "value": "getQuote"
                },
                {
                  "key": "questions",
                  "value": "api"
                },
                {
                  "fields": [
                    "quoteNumber",
                    "property.physicalAddress",
                    "property.yearBuilt",
                    "rating.totalPremium",
                    "coverageLimits.dwelling.amount"
                  ],
                  "key": "quoteDetails",
                  "value": "getQuote"
                }
              ],
              "label": "Customize Quote",
              "link": "customize",
              "name": "askToCustomizeDefaultQuote",
              "order": 6
            },
            {
              "component": "Share",
              "data": [
                {
                  "key": "quote",
                  "value": "getQuote"
                },
                {
                  "key": "questions",
                  "value": "api"
                },
                {
                  "fields": [
                    "quoteNumber",
                    "property.physicalAddress",
                    "property.yearBuilt",
                    "rating.totalPremium",
                    "coverageLimits.dwelling.amount"
                  ],
                  "key": "quoteDetails",
                  "value": "getQuote"
                }
              ],
              "label": "Share Quote",
              "link": "share",
              "name": "sendEmailOrContinue",
              "order": 7
            },
            {
              "component": "AdditionalPolicyHolder",
              "data": [
                {
                  "key": "quote",
                  "value": "getQuote"
                },
                {
                  "key": "questions",
                  "value": "api"
                },
                {
                  "fields": [
                    "quoteNumber",
                    "property.physicalAddress",
                    "property.yearBuilt",
                    "rating.totalPremium",
                    "coverageLimits.dwelling.amount"
                  ],
                  "key": "quoteDetails",
                  "value": "getQuote"
                }
              ],
              "label": "Add Additional Policyholder",
              "link": "additionalpolicyholder",
              "name": "askAdditionalPolicyHolder",
              "order": 8
            },
            {
              "component": "AdditionalInterest",
              "data": [
                {
                  "key": "quote",
                  "value": "getQuote"
                },
                {
                  "key": "questions",
                  "value": "api"
                },
                {
                  "fields": [
                    "quoteNumber",
                    "property.physicalAddress",
                    "property.yearBuilt",
                    "rating.totalPremium",
                    "coverageLimits.dwelling.amount"
                  ],
                  "key": "quoteDetails",
                  "value": "getQuote"
                }
              ],
              "label": "Add Additional Mortgagee",
              "link": "additionalmortgagee",
              "name": "askMortgagee",
              "order": 9
            },
            {
              "component": "AdditionalInterest",
              "data": [
                {
                  "key": "quote",
                  "value": "getQuote"
                },
                {
                  "key": "questions",
                  "value": "api"
                },
                {
                  "fields": [
                    "quoteNumber",
                    "property.physicalAddress",
                    "property.yearBuilt",
                    "rating.totalPremium",
                    "coverageLimits.dwelling.amount"
                  ],
                  "key": "quoteDetails",
                  "value": "getQuote"
                }
              ],
              "label": "Add Additional PremiumFinance",
              "link": "additionalPremiumFinance",
              "name": "askPremiumFinance",
              "order": 10
            },
            {
              "component": "AdditionalInterest",
              "data": [
                {
                  "key": "quote",
                  "value": "getQuote"
                },
                {
                  "key": "questions",
                  "value": "api"
                },
                {
                  "fields": [
                    "quoteNumber",
                    "property.physicalAddress",
                    "property.yearBuilt",
                    "rating.totalPremium",
                    "coverageLimits.dwelling.amount"
                  ],
                  "key": "quoteDetails",
                  "value": "getQuote"
                }
              ],
              "label": "Add Additional Interest",
              "link": "additionalInterest",
              "name": "askAdditionalInterest",
              "order": 11
            },
            {
              "component": "AdditionalInterest",
              "data": [
                {
                  "key": "quote",
                  "value": "getQuote"
                },
                {
                  "key": "questions",
                  "value": "api"
                },
                {
                  "fields": [
                    "quoteNumber",
                    "property.physicalAddress",
                    "property.yearBuilt",
                    "rating.totalPremium",
                    "coverageLimits.dwelling.amount"
                  ],
                  "key": "quoteDetails",
                  "value": "getQuote"
                }
              ],
              "label": "Add Additional Insured",
              "link": "additionalInsured",
              "name": "askAdditionalInsured",
              "order": 12
            },
            {
              "component": "AdditionalInterest",
              "data": [
                {
                  "key": "quote",
                  "value": "getQuote"
                },
                {
                  "key": "questions",
                  "value": "api"
                },
                {
                  "fields": [
                    "quoteNumber",
                    "property.physicalAddress",
                    "property.yearBuilt",
                    "rating.totalPremium",
                    "coverageLimits.dwelling.amount"
                  ],
                  "key": "quoteDetails",
                  "value": "getQuote"
                }
              ],
              "label": "Add Bill Payer",
              "link": "additionalBillPayer",
              "name": "askBillPayer",
              "order": 13
            },
            {
              "component": "Billing",
              "data": [
                {
                  "key": "quote",
                  "value": "getQuote"
                },
                {
                  "key": "questions",
                  "value": "api"
                },
                {
                  "fields": [
                    "quoteNumber",
                    "property.physicalAddress",
                    "property.yearBuilt",
                    "rating.totalPremium",
                    "coverageLimits.dwelling.amount"
                  ],
                  "key": "quoteDetails",
                  "value": "getQuote"
                }
              ],
              "label": "Billing Info",
              "link": "billing",
              "name": "askAdditionalQuestions",
              "order": 14
            },
            {
              "data": [
                {
                  "key": "quote",
                  "value": "getQuote"
                },
                {
                  "key": "questions",
                  "value": "api"
                },
                {
                  "fields": [
                    "quoteNumber",
                    "property.physicalAddress",
                    "property.yearBuilt",
                    "rating.totalPremium",
                    "coverageLimits.dwelling.amount"
                  ],
                  "key": "quoteDetails",
                  "value": "getQuote"
                }
              ],
              "label": "Assumption",
              "link": "assumptions",
              "name": "showAssumptions",
              "order": 15
            },
            {
              "component": "Verify",
              "data": [
                {
                  "key": "quote",
                  "value": "getFinalQuote"
                },
                {
                  "fields": [
                    "quoteNumber",
                    "property.physicalAddress",
                    "property.yearBuilt",
                    "rating.totalPremium",
                    "coverageLimits.dwelling.amount"
                  ],
                  "key": "quoteDetails",
                  "value": "getQuote"
                }
              ],
              "label": "Verify & Write policy",
              "link": "verify",
              "name": "askScheduleInspectionDates",
              "order": 16
            },
            {
              "component": "Share",
              "data": [
                {
                  "key": "underWritingExceptions",
                  "value": "UWDecision1EndError"
                },
                {
                  "fields": [
                    "quoteNumber",
                    "property.physicalAddress"
                  ],
                  "key": "quote",
                  "value": "quote"
                }
              ],
              "link": "error",
              "name": "UWDecision1EndError",
              "order": 17
            },
            {
              "link": "error",
              "name": "UWDecision2EndError",
              "order": 18
            },
            {
              "link": "error",
              "name": "UWDecision3EndError",
              "order": 19
            },
            {
              "link": "error",
              "name": "UWDecision4EndError",
              "order": 20
            },
            {
              "link": "error",
              "name": "UWDecision5EndError",
              "order": 21
            },
            {
              "component": "Share",
              "data": [
                {
                  "key": "underWritingExceptions",
                  "value": "UnderWritingReviewError"
                },
                {
                  "fields": [
                    "quoteNumber",
                    "property.physicalAddress"
                  ],
                  "key": "quote",
                  "value": "quote"
                }
              ],
              "label": "Share Quote",
              "link": "share",
              "name": "refreshOnUnderWritingReviewError",
              "order": 22
            },
            {
              "link": "search/noresults",
              "name": "askToSearchAgain",
              "order": 23
            }
          ]
        }
      },
      {
        "name": "docuSignUrl",
        "value": "https://api.harmony-ins.com/ds"
      }
    ]
  }
};

const MOCK_CG_DATA = {
  activeTask: 'askAdditionalCustomerData',
  variables: [
    {
      name: 'zipCodeSettingsForPDFTimezone',
      value: {
        message: 'success',
        result: [
          {
            _id: '5aea142cdc0509268ca5ce85',
            availableSlots: 191,
            coastal: true,
            companyCode: 'TTIC',
            coverageLimits: {
              dwelling: {
                maxAmount: 750000,
                maxReplacementCostRatio: 1.3,
                minAmount: 125000,
                minReplacementCostRatio: 0.9
              },
              personalLiability: {
                defaultAmount: 300000
              },
              personalProperty: {
                maxAmount: 400000,
                minAmount: 0
              }
            },
            coverageOptions: {
              personalPropertyReplacementCost: {
                defaultAnswer: true
              },
              sinkholePerilCoverage: {
                defaultAnswer: true
              }
            },
            id: '5aea142cdc0509268ca5ce85',
            latitude: 29.78359,
            longitude: -81.26004,
            maxClaims: 1,
            maxEffectiveDate: '2019-06-17T00:00:00-04:00',
            maxNetPremium: 20000,
            maxProtectionClass: 8,
            maxWaitingPeriod: 90,
            maxYearBuilt: 2016,
            minCostPer100: 0.1,
            minEffectiveDate: '2019-03-19T00:00:00-04:00',
            minLossRatio: 1.1,
            minNetPremium: 700,
            minWaitingPeriod: 0,
            minYearBuilt: 1900,
            product: 'HO3',
            state: 'FL',
            suspended: false,
            territories: [
              '533-0',
              '533-71'
            ],
            timezone: 'America/New_York',
            zip: '00005'
          }
        ],
        status: 200,
        timeTookByEndpoint: 5
      }
    },
    {
      name: 'searchQuote',
      value: {
        message: 'success',
        result: {
          currentPage: 1,
          pageSize: 25,
          quotes: [
            {
              _id: '5c9107e3d7bd33000e9ed9b4',
              companyCode: 'TTIC',
              createdAt: '2019-03-19T15:16:51.712Z',
              createdBy: {
                _id: '5c9107e3d7bd33000e9ed9b5',
                userId: 'auth0|594199c30b874417c3157ae1',
                userName: 'ttic-20000'
              },
              effectiveDate: '2019-04-18T04:00:00.000Z',
              policyHolders: [
                {
                  _id: '5c9107eed9fac4000ee7e3eb',
                  electronicDelivery: false,
                  emailAddress: 'exzeoqa@exzeo.com',
                  entityType: 'Person',
                  firstName: 'BATMAN',
                  lastName: 'ROBIN A005',
                  order: 0,
                  primaryPhoneNumber: '7271231234'
                }
              ],
              product: 'HO3',
              property: {
                _id: '5c9107e3d7bd33000e9ed9b7',
                buildingCodeEffectivenessGrading: 99,
                burglarAlarm: false,
                constructionType: 'FRAME',
                distanceToFireHydrant: 307.07,
                distanceToFireStation: 1.18,
                distanceToTidalWater: 4593.6,
                divingBoard: false,
                familyUnits: '1-2',
                fireAlarm: false,
                floodZone: 'A',
                gatedCommunity: false,
                id: '12000000000000005',
                physicalAddress: {
                  _id: '5c9107e3d7bd33000e9ed9b8',
                  address1: '106 TEST ADDRESS',
                  address2: '',
                  city: 'SAINT AUGUSTINE',
                  county: 'SAINT JOHNS',
                  latitude: 29.79695,
                  longitude: -81.29969,
                  state: 'FL',
                  zip: '00005'
                },
                pool: false,
                poolSecured: false,
                protectionClass: 6,
                residenceType: 'SINGLE FAMILY',
                source: 'CasaClue',
                sprinkler: 'N',
                squareFeet: 1858,
                territory: '533-0',
                timezone: 'America/New_York',
                townhouseRowhouse: false,
                trampoline: false,
                windMitigation: {
                  _id: '5c9107e3d7bd33000e9ed9b9',
                  floridaBuildingCodeWindSpeed: 120,
                  floridaBuildingCodeWindSpeedDesign: 120,
                  internalPressureDesign: 'Other',
                  openingProtection: 'Other',
                  roofCovering: 'Other',
                  roofDeckAttachment: 'Other',
                  roofGeometry: 'Other',
                  roofToWallConnection: 'Other',
                  secondaryWaterResistance: 'Other',
                  terrain: 'C',
                  windBorneDebrisRegion: 'Yes'
                },
                yearBuilt: 2015,
                yearOfRoof: null
              },
              quoteNumber: '12-5160825-01',
              quoteState: 'Quote Started',
              rating: {
                totalPremium: 813
              },
              state: 'FL',
              updatedAt: '2019-03-19T15:17:14.363Z',
              updatedBy: {
                _id: '5c9107fad9fac4000ee7e747',
                userId: 'auth0|594199c30b874417c3157ae1',
                userName: 'ttic-20000'
              }
            }
          ],
          sort: 'updatedAt',
          sortDirection: -1,
          totalNumberOfRecords: 1
        },
        status: 200,
        timeTookByEndpoint: 1804
      }
    },
    {
      name: 'searchType',
      value: 'quote'
    },
    {
      name: 'uiTasks',
      value: {
        tasks: [
          {
            component: 'Search',
            label: 'Enter Address',
            link: 'search',
            name: 'search',
            order: 1
          },
          {
            data: [
              {
                key: 'property',
                value: 'searchAddress'
              }
            ],
            label: 'Property Address',
            link: 'search',
            name: 'chooseAddress',
            order: 2
          },
          {
            data: [
              {
                key: 'quoteSearchResults',
                value: 'searchQuote'
              }
            ],
            label: 'Property Quote',
            link: 'search',
            name: 'chooseQuote',
            order: 3
          },
          {
            component: 'Demographics',
            data: [
              {
                key: 'questions',
                value: 'api'
              },
              {
                key: 'quote',
                value: 'quote'
              },
              {
                fields: [
                  'property.physicalAddress',
                  'property.yearBuilt'
                ],
                key: 'quoteDetails',
                value: 'quote'
              }
            ],
            label: 'Demographics',
            link: 'demographics',
            name: 'askAdditionalCustomerData',
            order: 4
          },
          {
            component: 'UnderWriting',
            data: [
              {
                key: 'quote',
                value: 'quote'
              },
              {
                key: 'questions',
                value: 'getListOfUWQuestions'
              },
              {
                fields: [
                  'property.physicalAddress',
                  'property.yearBuilt'
                ],
                key: 'quoteDetails',
                value: 'quote'
              }
            ],
            label: 'UnderWriting Q&A',
            link: 'underwriting',
            name: 'askUWAnswers',
            order: 5
          },
          {
            component: 'Customize',
            data: [
              {
                key: 'quote',
                value: 'getQuote'
              },
              {
                key: 'questions',
                value: 'api'
              },
              {
                fields: [
                  'quoteNumber',
                  'property.physicalAddress',
                  'property.yearBuilt',
                  'rating.totalPremium',
                  'coverageLimits.dwelling.amount'
                ],
                key: 'quoteDetails',
                value: 'getQuote'
              }
            ],
            label: 'Customize Quote',
            link: 'customize',
            name: 'askToCustomizeDefaultQuote',
            order: 6
          },
          {
            component: 'Share',
            data: [
              {
                key: 'quote',
                value: 'getQuote'
              },
              {
                key: 'questions',
                value: 'api'
              },
              {
                fields: [
                  'quoteNumber',
                  'property.physicalAddress',
                  'property.yearBuilt',
                  'rating.totalPremium',
                  'coverageLimits.dwelling.amount'
                ],
                key: 'quoteDetails',
                value: 'getQuote'
              }
            ],
            label: 'Share Quote',
            link: 'share',
            name: 'sendEmailOrContinue',
            order: 7
          },
          {
            component: 'AdditionalPolicyHolder',
            data: [
              {
                key: 'quote',
                value: 'getQuote'
              },
              {
                key: 'questions',
                value: 'api'
              },
              {
                fields: [
                  'quoteNumber',
                  'property.physicalAddress',
                  'property.yearBuilt',
                  'rating.totalPremium',
                  'coverageLimits.dwelling.amount'
                ],
                key: 'quoteDetails',
                value: 'getQuote'
              }
            ],
            label: 'Add Additional Policyholder',
            link: 'additionalpolicyholder',
            name: 'askAdditionalPolicyHolder',
            order: 8
          },
          {
            component: 'AdditionalInterest',
            data: [
              {
                key: 'quote',
                value: 'getQuote'
              },
              {
                key: 'questions',
                value: 'api'
              },
              {
                fields: [
                  'quoteNumber',
                  'property.physicalAddress',
                  'property.yearBuilt',
                  'rating.totalPremium',
                  'coverageLimits.dwelling.amount'
                ],
                key: 'quoteDetails',
                value: 'getQuote'
              }
            ],
            label: 'Add Additional Mortgagee',
            link: 'additionalmortgagee',
            name: 'askMortgagee',
            order: 9
          },
          {
            component: 'AdditionalInterest',
            data: [
              {
                key: 'quote',
                value: 'getQuote'
              },
              {
                key: 'questions',
                value: 'api'
              },
              {
                fields: [
                  'quoteNumber',
                  'property.physicalAddress',
                  'property.yearBuilt',
                  'rating.totalPremium',
                  'coverageLimits.dwelling.amount'
                ],
                key: 'quoteDetails',
                value: 'getQuote'
              }
            ],
            label: 'Add Additional PremiumFinance',
            link: 'additionalPremiumFinance',
            name: 'askPremiumFinance',
            order: 10
          },
          {
            component: 'AdditionalInterest',
            data: [
              {
                key: 'quote',
                value: 'getQuote'
              },
              {
                key: 'questions',
                value: 'api'
              },
              {
                fields: [
                  'quoteNumber',
                  'property.physicalAddress',
                  'property.yearBuilt',
                  'rating.totalPremium',
                  'coverageLimits.dwelling.amount'
                ],
                key: 'quoteDetails',
                value: 'getQuote'
              }
            ],
            label: 'Add Additional Interest',
            link: 'additionalInterest',
            name: 'askAdditionalInterest',
            order: 11
          },
          {
            component: 'AdditionalInterest',
            data: [
              {
                key: 'quote',
                value: 'getQuote'
              },
              {
                key: 'questions',
                value: 'api'
              },
              {
                fields: [
                  'quoteNumber',
                  'property.physicalAddress',
                  'property.yearBuilt',
                  'rating.totalPremium',
                  'coverageLimits.dwelling.amount'
                ],
                key: 'quoteDetails',
                value: 'getQuote'
              }
            ],
            label: 'Add Additional Insured',
            link: 'additionalInsured',
            name: 'askAdditionalInsured',
            order: 12
          },
          {
            component: 'AdditionalInterest',
            data: [
              {
                key: 'quote',
                value: 'getQuote'
              },
              {
                key: 'questions',
                value: 'api'
              },
              {
                fields: [
                  'quoteNumber',
                  'property.physicalAddress',
                  'property.yearBuilt',
                  'rating.totalPremium',
                  'coverageLimits.dwelling.amount'
                ],
                key: 'quoteDetails',
                value: 'getQuote'
              }
            ],
            label: 'Add Bill Payer',
            link: 'additionalBillPayer',
            name: 'askBillPayer',
            order: 13
          },
          {
            component: 'Billing',
            data: [
              {
                key: 'quote',
                value: 'getQuote'
              },
              {
                key: 'questions',
                value: 'api'
              },
              {
                fields: [
                  'quoteNumber',
                  'property.physicalAddress',
                  'property.yearBuilt',
                  'rating.totalPremium',
                  'coverageLimits.dwelling.amount'
                ],
                key: 'quoteDetails',
                value: 'getQuote'
              }
            ],
            label: 'Billing Info',
            link: 'billing',
            name: 'askAdditionalQuestions',
            order: 14
          },
          {
            data: [
              {
                key: 'quote',
                value: 'getQuote'
              },
              {
                key: 'questions',
                value: 'api'
              },
              {
                fields: [
                  'quoteNumber',
                  'property.physicalAddress',
                  'property.yearBuilt',
                  'rating.totalPremium',
                  'coverageLimits.dwelling.amount'
                ],
                key: 'quoteDetails',
                value: 'getQuote'
              }
            ],
            label: 'Assumption',
            link: 'assumptions',
            name: 'showAssumptions',
            order: 15
          },
          {
            component: 'Verify',
            data: [
              {
                key: 'quote',
                value: 'getFinalQuote'
              },
              {
                fields: [
                  'quoteNumber',
                  'property.physicalAddress',
                  'property.yearBuilt',
                  'rating.totalPremium',
                  'coverageLimits.dwelling.amount'
                ],
                key: 'quoteDetails',
                value: 'getQuote'
              }
            ],
            label: 'Verify & Write policy',
            link: 'verify',
            name: 'askScheduleInspectionDates',
            order: 16
          },
          {
            component: 'Share',
            data: [
              {
                key: 'underWritingExceptions',
                value: 'UWDecision1EndError'
              },
              {
                fields: [
                  'quoteNumber',
                  'property.physicalAddress'
                ],
                key: 'quote',
                value: 'quote'
              }
            ],
            link: 'error',
            name: 'UWDecision1EndError',
            order: 17
          },
          {
            link: 'error',
            name: 'UWDecision2EndError',
            order: 18
          },
          {
            link: 'error',
            name: 'UWDecision3EndError',
            order: 19
          },
          {
            link: 'error',
            name: 'UWDecision4EndError',
            order: 20
          },
          {
            link: 'error',
            name: 'UWDecision5EndError',
            order: 21
          },
          {
            component: 'Share',
            data: [
              {
                key: 'underWritingExceptions',
                value: 'UnderWritingReviewError'
              },
              {
                fields: [
                  'quoteNumber',
                  'property.physicalAddress'
                ],
                key: 'quote',
                value: 'quote'
              }
            ],
            label: 'Share Quote',
            link: 'share',
            name: 'refreshOnUnderWritingReviewError',
            order: 22
          },
          {
            link: 'search/noresults',
            name: 'askToSearchAgain',
            order: 23
          }
        ]
      }
    },
    {
      name: 'docuSignUrl',
      value: 'https://api.harmony-ins.com/ds'
    },
    {
      name: 'getZipCodeSettingsForQuote',
      value: {
        message: 'success',
        result: [
          {
            _id: '5aea142cdc0509268ca5ce85',
            availableSlots: 191,
            coastal: true,
            companyCode: 'TTIC',
            coverageLimits: {
              dwelling: {
                maxAmount: 750000,
                maxReplacementCostRatio: 1.3,
                minAmount: 125000,
                minReplacementCostRatio: 0.9
              },
              personalLiability: {
                defaultAmount: 300000
              },
              personalProperty: {
                maxAmount: 400000,
                minAmount: 0
              }
            },
            coverageOptions: {
              personalPropertyReplacementCost: {
                defaultAnswer: true
              },
              sinkholePerilCoverage: {
                defaultAnswer: true
              }
            },
            id: '5aea142cdc0509268ca5ce85',
            latitude: 29.78359,
            longitude: -81.26004,
            maxClaims: 1,
            maxEffectiveDate: '2019-06-17T00:00:00-04:00',
            maxNetPremium: 20000,
            maxProtectionClass: 8,
            maxWaitingPeriod: 90,
            maxYearBuilt: 2016,
            minCostPer100: 0.1,
            minEffectiveDate: '2019-03-19T00:00:00-04:00',
            minLossRatio: 1.1,
            minNetPremium: 700,
            minWaitingPeriod: 0,
            minYearBuilt: 1900,
            product: 'HO3',
            state: 'FL',
            suspended: false,
            territories: [
              '533-0',
              '533-71'
            ],
            timezone: 'America/New_York',
            zip: '00005'
          }
        ],
        status: 200,
        timeTookByEndpoint: 5
      }
    },
    {
      name: 'chooseQuote',
      value: {
        quoteId: '5c9107e3d7bd33000e9ed9b4'
      }
    },
    {
      name: 'quoteNumber',
      value: '12-5160825-01'
    },
    {
      name: 'quoteId',
      value: '5c9107e3d7bd33000e9ed9b4'
    },
    {
      name: 'quoteSchema',
      value: {
        message: 'success',
        result: {
          groups: {
            coverage: {
              label: 'Coverage Info'
            },
            mailingbilling: {
              label: 'Mailing/Billing Info'
            },
            underwriting: {
              label: 'Underwriting Info'
            }
          },
          properties: {
            _id: {
              group: 'coverage'
            },
            agencyCode: {
              group: 'coverage'
            },
            agentCode: {
              group: 'coverage'
            },
            billPlan: {
              group: 'mailingbilling'
            },
            billToId: {
              group: 'mailingbilling'
            },
            billToType: {
              group: 'mailingbilling'
            },
            companyCode: {
              group: 'coverage'
            },
            coverageLimits: {
              group: 'coverage',
              minProperties: 1
            },
            coverageOptions: {
              group: 'coverage',
              minProperties: 1
            },
            deductibles: {
              group: 'coverage',
              minProperties: 1
            },
            effectiveDate: {
              group: 'coverage'
            },
            endDate: {
              group: 'coverage'
            },
            policyHolderMailingAddress: {
              group: 'mailingbilling',
              minProperties: 1
            },
            policyHolders: {
              group: 'coverage',
              minItems: 1
            },
            product: {
              group: 'coverage'
            },
            property: {
              group: 'coverage',
              minProperties: 1
            },
            quoteNumber: {
              group: 'coverage'
            },
            rating: {
              group: 'underwriting',
              minProperties: 1
            },
            state: {
              group: 'coverage'
            },
            underwritingAnswers: {
              group: 'underwriting',
              minProperties: 1
            }
          },
          required: [
            'underwritingAnswers',
            'billPlan',
            'billToId',
            'quoteNumber',
            'policyHolders',
            'endDate',
            'state',
            '_id',
            'agencyCode',
            'coverageLimits',
            'companyCode',
            'policyHolderMailingAddress',
            'coverageOptions',
            'deductibles',
            'rating',
            'effectiveDate',
            'property',
            'agentCode',
            'product'
          ],
          type: 'object'
        },
        status: 200,
        timeTookByEndpoint: 17
      }
    },
    {
      name: 'retrieveQuote',
      value: {
        message: 'success',
        result: {
          __v: 0,
          _id: '5c9107e3d7bd33000e9ed9b4',
          additionalInterests: [],
          agencyCode: 20000,
          agentCode: 60000,
          billToId: '',
          billToType: 'Policyholder',
          companyCode: 'TTIC',
          cost: {
            totalCost: 140,
            worksheet: {
              calculatedFields: {
                adminExp: 125,
                catExp: 0,
                coverageAFactor: 0.977,
                hurricaneTEFactor: 310.99,
                nonCatExp: 15,
                retentionExp: 0
              },
              inputFields: {
                aopDeductible: 1000,
                companyCode: 'TTIC',
                constructionType: 'F',
                coverageA: 227000,
                coverageB: 4540,
                coverageC: 56750,
                coverageD: 22700,
                currentYear: '2018',
                hurricaneDeductible: 2,
                openingProtection: 'C',
                product: 'HO3',
                replacementCost: true,
                roofGeometry: 'Other',
                sinkholeDeductible: 10,
                state: 'FL',
                version: '201801',
                yearBuilt: 2012,
                zip: '00005'
              },
              lookupFields: {
                baseCost: 125,
                baseCoverageA: 250000,
                claimCost: 1500,
                hurricaneConstructionTypeFactor: 1.316403,
                hurricaneDeductibleFactor: 1,
                hurricaneOpeningProtectionFactor: 1,
                hurricaneRetentionMult: 1.463338,
                hurricaneRoofShapeFactor: 1,
                hurricaneYearBuiltFactor: 0.304789,
                maxCoverageA: 750000,
                minCoverageA: 150000,
                nonCatConstructionLossCost: 15
              }
            }
          },
          coverageLimits: {
            _id: '5c9107e3d7bd33000e9ed9ba',
            dwelling: {
              _id: '5c9107e3d7bd33000e9ed9bb',
              amount: 227000,
              displayText: 'Dwelling',
              format: 'Currency',
              letterDesignation: 'A',
              maxAmount: 295000,
              minAmount: 204000
            },
            lossOfUse: {
              _id: '5c9107e3d7bd33000e9ed9be',
              amount: 22700,
              displayText: 'Loss of Use',
              format: 'Currency',
              letterDesignation: 'D'
            },
            medicalPayments: {
              _id: '5c9107e3d7bd33000e9ed9c0',
              amount: 2000,
              displayText: 'Medical Payments',
              format: 'Currency',
              letterDesignation: 'F'
            },
            moldLiability: {
              _id: '5c9107e3d7bd33000e9ed9c3',
              amount: 50000,
              displayText: 'Mold Liability',
              format: 'Currency'
            },
            moldProperty: {
              _id: '5c9107e3d7bd33000e9ed9c2',
              amount: 10000,
              displayText: 'Mold Property',
              format: 'Currency'
            },
            ordinanceOrLaw: {
              _id: '5c9107e3d7bd33000e9ed9c1',
              amount: 25,
              displayText: 'Ordinance or Law',
              format: 'Percentage',
              ofCoverageLimit: 'dwelling'
            },
            otherStructures: {
              _id: '5c9107e3d7bd33000e9ed9bc',
              amount: 4540,
              displayText: 'Other Structures',
              format: 'Currency',
              letterDesignation: 'B'
            },
            personalLiability: {
              _id: '5c9107e3d7bd33000e9ed9bf',
              amount: 300000,
              displayText: 'Personal Liability',
              format: 'Currency',
              letterDesignation: 'E'
            },
            personalProperty: {
              _id: '5c9107e3d7bd33000e9ed9bd',
              amount: 56750,
              displayText: 'Personal Property',
              format: 'Currency',
              letterDesignation: 'C'
            }
          },
          coverageOptions: {
            liabilityIncidentalOccupancies: {
              answer: false,
              displayText: 'Liability Permitted Incidental Occupancies'
            },
            personalPropertyReplacementCost: {
              answer: true,
              displayText: 'Personal Property Replacement Cost'
            },
            propertyIncidentalOccupanciesMainDwelling: {
              answer: false,
              displayText: 'Property Permitted Incidental Occupancies Main Dwelling'
            },
            propertyIncidentalOccupanciesOtherStructures: {
              answer: false,
              displayText: 'Property Permitted Incidental Occupancies Other Structures'
            },
            sinkholePerilCoverage: {
              answer: true,
              displayText: 'Sinkhole Peril Coverage'
            }
          },
          createdAt: '2019-03-19T15:16:51.712Z',
          createdBy: {
            _id: '5c9107e3d7bd33000e9ed9b5',
            userId: 'auth0|594199c30b874417c3157ae1',
            userName: 'ttic-20000'
          },
          deductibles: {
            allOtherPerils: {
              amount: 1000,
              displayText: 'All Other Perils',
              format: 'Currency'
            },
            hurricane: {
              amount: 2,
              calculatedAmount: 4540,
              displayText: 'Hurricane',
              format: 'Percentage',
              ofCoverageLimit: 'dwelling'
            },
            sinkhole: {
              amount: 10,
              calculatedAmount: 22700,
              displayText: 'Sinkhole',
              format: 'Percentage',
              ofCoverageLimit: 'dwelling'
            }
          },
          effectiveDate: '2019-04-18T04:00:00.000Z',
          endDate: '2020-04-18T04:00:00.000Z',
          policyHolders: [
            {
              _id: '5c9107eed9fac4000ee7e3eb',
              electronicDelivery: false,
              emailAddress: 'exzeoqa@exzeo.com',
              entityType: 'Person',
              firstName: 'BATMAN',
              lastName: 'ROBIN A005',
              order: 0,
              primaryPhoneNumber: '7271231234'
            }
          ],
          product: 'HO3',
          property: {
            _id: '5c9107e3d7bd33000e9ed9b7',
            buildingCodeEffectivenessGrading: 99,
            burglarAlarm: false,
            constructionType: 'FRAME',
            distanceToFireHydrant: 307.07,
            distanceToFireStation: 1.18,
            distanceToTidalWater: 4593.6,
            divingBoard: false,
            familyUnits: '1-2',
            fireAlarm: false,
            floodZone: 'A',
            gatedCommunity: false,
            id: '12000000000000005',
            physicalAddress: {
              _id: '5c9107e3d7bd33000e9ed9b8',
              address1: '106 TEST ADDRESS',
              address2: '',
              city: 'SAINT AUGUSTINE',
              county: 'SAINT JOHNS',
              latitude: 29.79695,
              longitude: -81.29969,
              state: 'FL',
              zip: '00005'
            },
            pool: false,
            poolSecured: false,
            protectionClass: 6,
            residenceType: 'SINGLE FAMILY',
            source: 'CasaClue',
            sprinkler: 'N',
            squareFeet: 1858,
            territory: '533-0',
            timezone: 'America/New_York',
            townhouseRowhouse: false,
            trampoline: false,
            windMitigation: {
              _id: '5c9107e3d7bd33000e9ed9b9',
              floridaBuildingCodeWindSpeed: 120,
              floridaBuildingCodeWindSpeedDesign: 120,
              internalPressureDesign: 'Other',
              openingProtection: 'Other',
              roofCovering: 'Other',
              roofDeckAttachment: 'Other',
              roofGeometry: 'Other',
              roofToWallConnection: 'Other',
              secondaryWaterResistance: 'Other',
              terrain: 'C',
              windBorneDebrisRegion: 'Yes'
            },
            yearBuilt: 2015,
            yearOfRoof: null
          },
          quoteNumber: '12-5160825-01',
          quoteState: 'Quote Started',
          rating: {
            _id: '5c9107f9d7bd33000e9edfa5',
            engineCode: 'HO3ByPeril',
            netPremium: 786,
            rateCode: 201704,
            totalFees: 27,
            totalPremium: 813,
            worksheet: {
              additionalCoverages: {
                increasedLiabilityMoldFungiLimit: 0,
                increasedPersonalLiabilityLimit: 22,
                increasedPropertyMoldFungiLimit: 0,
                liabilityIncidentalOccupancies: 0,
                otherStructIncLimits: 0,
                propertyIncidentalOccupancies: 0
              },
              additionalCoveragesSum: 22,
              bcegAdjustment: 2,
              elements: {
                ageOfHomeByYearFactors: {
                  hurricane: 1,
                  otherWind: 1,
                  yearBuilt: 2015
                },
                ageOfHomeFactors: {
                  ageOfHome: 4,
                  allOtherPerils: 1.372,
                  fire: 1.372,
                  liability: 1.372,
                  sinkhole: 1.372,
                  water: 1.372
                },
                baseRates: {
                  allOtherPerils: 153.35,
                  fire: 309.05,
                  hurricane: 613.41,
                  liability: 56.96,
                  otherWind: 22.98,
                  sinkhole: 7.47,
                  water: 516.56
                },
                bcegFactors: {
                  allOtherPerils: 1,
                  fire: 1,
                  grade: 99,
                  hurricane: 1.01,
                  liability: 1,
                  otherWind: 1.01,
                  sinkhole: 1,
                  territoryGroup: 3,
                  water: 1
                },
                burglarAlarmFactors: {
                  allOtherPerils: 1,
                  burglarAlarm: false,
                  fire: 1,
                  hurricane: 1,
                  liability: 1,
                  otherWind: 1,
                  sinkhole: 1,
                  water: 1
                },
                coverageAFactors: {
                  allOtherPerils: 1.761,
                  fire: 1.761,
                  hurricane: 1.761,
                  liability: 1,
                  otherWind: 1.761,
                  sinkhole: 1.761,
                  water: 1.761
                },
                coverageBFactors: {
                  allOtherPerils: 0.97,
                  fire: 0.97,
                  hurricane: 0.97,
                  liability: 1,
                  otherWind: 0.97,
                  sinkhole: 0.97,
                  water: 0.97
                },
                coverageCFactors: {
                  allOtherPerils: 0.925,
                  fire: 0.925,
                  hurricane: 0.85,
                  liability: 1,
                  otherWind: 0.925,
                  sinkhole: 0.925,
                  water: 0.925
                },
                deductibleFactors: {
                  allOtherPerils: 1,
                  allOtherPerilsDeductible: 1000,
                  exWind: false,
                  fire: 1,
                  hurricane: 1,
                  hurricaneDeductible: 2,
                  liability: 1,
                  otherWind: 1,
                  sinkhole: 1,
                  water: 1
                },
                fireAlarmAndSprinklerFactors: {
                  allOtherPerils: 1,
                  fire: 1,
                  fireAlarm: false,
                  hurricane: 1,
                  liability: 1,
                  otherWind: 1,
                  sinkhole: 1,
                  sprinkler: 'N',
                  water: 1
                },
                noPriorInsuranceFactors: {
                  allOtherPerils: 1,
                  fire: 1,
                  hurricane: 1,
                  liability: 1,
                  noPriorInsurance: false,
                  otherWind: 1,
                  sinkhole: 1,
                  water: 1
                },
                ordinanceOrLawFactors: {
                  allOtherPerils: 1,
                  fire: 1,
                  hurricane: 1,
                  liability: 1,
                  ordinanceOrLaw: false,
                  otherWind: 1,
                  sinkhole: 1,
                  water: 1
                },
                protectionClassFactors: {
                  allOtherPerils: 1,
                  constructionCode: 'F',
                  constructionType: 'Frame',
                  fire: 1,
                  hurricane: 1,
                  liability: 1,
                  otherWind: 1,
                  protectionClass: 6,
                  sinkhole: 1,
                  water: 1
                },
                replacementCostFactors: {
                  allOtherPerils: 1.125,
                  fire: 1.125,
                  hurricane: 1.125,
                  liability: 1,
                  otherWind: 1.125,
                  replacementCost: true,
                  sinkhole: 1.125,
                  water: 1.125
                },
                seasonalFactors: {
                  allOtherPerils: 1,
                  fire: 1,
                  hurricane: 1,
                  liability: 1,
                  otherWind: 1,
                  seasonal: false,
                  sinkhole: 1,
                  water: 1
                },
                territoryFactors: {
                  allOtherPerils: 0.228,
                  code: '533-0',
                  fire: 0.228,
                  group: 3,
                  hurricane: 0.757,
                  liability: 0.222,
                  minPremium: 0.003,
                  name: 'SaintJohns,Coastal',
                  otherWind: 0.757,
                  sinkhole: 1.115,
                  water: 0.228
                },
                townRowHouseFactors: {
                  allOtherPerils: 1,
                  fire: 1,
                  hurricane: 1,
                  liability: 1,
                  otherWind: 1,
                  protectionClass: 6,
                  sinkhole: 1,
                  units: '1-2',
                  water: 1
                },
                windMitigationFactors: {
                  allOtherPerils: 1,
                  fire: 1,
                  hurricane: 0.23,
                  liability: 1,
                  otherWind: 0.23,
                  sinkhole: 1,
                  water: 1,
                  windMitigationDiscount: 0.77
                }
              },
              fees: {
                citizensFee: 0,
                empTrustFee: 2,
                fhcfFee: 0,
                figaFee: 0,
                mgaPolicyFee: 25
              },
              minimumPremiumAdjustment: 0,
              netPremium: 786,
              perilPremiums: {
                allOtherPerils: 85,
                fire: 172,
                hurricane: 176,
                liability: 17,
                otherWind: 7,
                sinkhole: 20,
                water: 287
              },
              perilPremiumsSum: 764,
              subtotalPremium: 786,
              totalFees: 27,
              totalPremium: 813
            }
          },
          state: 'FL',
          underwritingAnswers: {
            business: {
              answer: 'No',
              question: 'Is a business conducted on the property?',
              source: 'Customer'
            },
            floodCoverage: {
              answer: 'Yes',
              question: 'Does this property have a separate insurance policy covering flood losses?',
              source: 'Default'
            },
            fourPointUpdates: {
              answer: 'Yes',
              question: 'Has the wiring, plumbing, HVAC, and roof been updated in the last 35 years?',
              source: 'Customer'
            },
            monthsOccupied: {
              answer: '10+',
              question: 'How many months a year does the owner live in the home?',
              source: 'Customer'
            },
            noPriorInsuranceSurcharge: {
              answer: 'No',
              question: 'If not new purchase, please provide proof of prior insurance.',
              source: 'Default'
            },
            previousClaims: {
              answer: 'No claims ever filed',
              question: 'How many claims in the past 5 years?',
              source: 'Customer'
            },
            rented: {
              answer: 'Never',
              question: 'Is the home or any structures on the property ever rented?',
              source: 'Customer'
            }
          },
          underwritingExceptions: [
            {
              _id: '5c9107fad9fac4000ee7e745',
              action: 'Missing Info',
              active: true,
              agentMessage: 'Missing required information to complete quote -  Mailing/Billing Info',
              canOverride: false,
              category: 'Coverages & Deductibles',
              code: '003',
              displayText: 'Missing Info - Mailing/Billing Info',
              fields: [],
              internalMessage: 'Missing required information to complete quote -  Mailing/Billing Info',
              overridden: false,
              overriddenAt: null,
              overriddenBy: {
                _id: '5c9107fad9fac4000ee7e746',
                userId: null,
                userName: null
              }
            }
          ],
          updatedAt: '2019-03-19T15:17:14.363Z',
          updatedBy: {
            _id: '5c9107fad9fac4000ee7e747',
            userId: 'auth0|594199c30b874417c3157ae1',
            userName: 'ttic-20000'
          }
        },
        status: 200,
        timeTookByEndpoint: 46
      }
    },
    {
      name: 'search',
      value: {
        quoteNumber: '12-5160825-01',
        searchType: 'quote'
      }
    },
    {
      name: 'quote',
      value: {
        message: 'success',
        result: {
          __v: 0,
          _id: '5c9107e3d7bd33000e9ed9b4',
          additionalInterests: [],
          agencyCode: 20000,
          agentCode: 60000,
          billToId: '',
          billToType: 'Policyholder',
          companyCode: 'TTIC',
          cost: {
            totalCost: 140,
            worksheet: {
              calculatedFields: {
                adminExp: 125,
                catExp: 0,
                coverageAFactor: 0.977,
                hurricaneTEFactor: 310.99,
                nonCatExp: 15,
                retentionExp: 0
              },
              inputFields: {
                aopDeductible: 1000,
                companyCode: 'TTIC',
                constructionType: 'F',
                coverageA: 227000,
                coverageB: 4540,
                coverageC: 56750,
                coverageD: 22700,
                currentYear: '2018',
                hurricaneDeductible: 2,
                openingProtection: 'C',
                product: 'HO3',
                replacementCost: true,
                roofGeometry: 'Other',
                sinkholeDeductible: 10,
                state: 'FL',
                version: '201801',
                yearBuilt: 2012,
                zip: '00005'
              },
              lookupFields: {
                baseCost: 125,
                baseCoverageA: 250000,
                claimCost: 1500,
                hurricaneConstructionTypeFactor: 1.316403,
                hurricaneDeductibleFactor: 1,
                hurricaneOpeningProtectionFactor: 1,
                hurricaneRetentionMult: 1.463338,
                hurricaneRoofShapeFactor: 1,
                hurricaneYearBuiltFactor: 0.304789,
                maxCoverageA: 750000,
                minCoverageA: 150000,
                nonCatConstructionLossCost: 15
              }
            }
          },
          coverageLimits: {
            _id: '5c9107e3d7bd33000e9ed9ba',
            dwelling: {
              _id: '5c9107e3d7bd33000e9ed9bb',
              amount: 227000,
              displayText: 'Dwelling',
              format: 'Currency',
              letterDesignation: 'A',
              maxAmount: 295000,
              minAmount: 204000
            },
            lossOfUse: {
              _id: '5c9107e3d7bd33000e9ed9be',
              amount: 22700,
              displayText: 'Loss of Use',
              format: 'Currency',
              letterDesignation: 'D'
            },
            medicalPayments: {
              _id: '5c9107e3d7bd33000e9ed9c0',
              amount: 2000,
              displayText: 'Medical Payments',
              format: 'Currency',
              letterDesignation: 'F'
            },
            moldLiability: {
              _id: '5c9107e3d7bd33000e9ed9c3',
              amount: 50000,
              displayText: 'Mold Liability',
              format: 'Currency'
            },
            moldProperty: {
              _id: '5c9107e3d7bd33000e9ed9c2',
              amount: 10000,
              displayText: 'Mold Property',
              format: 'Currency'
            },
            ordinanceOrLaw: {
              _id: '5c9107e3d7bd33000e9ed9c1',
              amount: 25,
              displayText: 'Ordinance or Law',
              format: 'Percentage',
              ofCoverageLimit: 'dwelling'
            },
            otherStructures: {
              _id: '5c9107e3d7bd33000e9ed9bc',
              amount: 4540,
              displayText: 'Other Structures',
              format: 'Currency',
              letterDesignation: 'B'
            },
            personalLiability: {
              _id: '5c9107e3d7bd33000e9ed9bf',
              amount: 300000,
              displayText: 'Personal Liability',
              format: 'Currency',
              letterDesignation: 'E'
            },
            personalProperty: {
              _id: '5c9107e3d7bd33000e9ed9bd',
              amount: 56750,
              displayText: 'Personal Property',
              format: 'Currency',
              letterDesignation: 'C'
            }
          },
          coverageOptions: {
            liabilityIncidentalOccupancies: {
              answer: false,
              displayText: 'Liability Permitted Incidental Occupancies'
            },
            personalPropertyReplacementCost: {
              answer: true,
              displayText: 'Personal Property Replacement Cost'
            },
            propertyIncidentalOccupanciesMainDwelling: {
              answer: false,
              displayText: 'Property Permitted Incidental Occupancies Main Dwelling'
            },
            propertyIncidentalOccupanciesOtherStructures: {
              answer: false,
              displayText: 'Property Permitted Incidental Occupancies Other Structures'
            },
            sinkholePerilCoverage: {
              answer: true,
              displayText: 'Sinkhole Peril Coverage'
            }
          },
          createdAt: '2019-03-19T15:16:51.712Z',
          createdBy: {
            _id: '5c9107e3d7bd33000e9ed9b5',
            userId: 'auth0|594199c30b874417c3157ae1',
            userName: 'ttic-20000'
          },
          deductibles: {
            allOtherPerils: {
              amount: 1000,
              displayText: 'All Other Perils',
              format: 'Currency'
            },
            hurricane: {
              amount: 2,
              calculatedAmount: 4540,
              displayText: 'Hurricane',
              format: 'Percentage',
              ofCoverageLimit: 'dwelling'
            },
            sinkhole: {
              amount: 10,
              calculatedAmount: 22700,
              displayText: 'Sinkhole',
              format: 'Percentage',
              ofCoverageLimit: 'dwelling'
            }
          },
          effectiveDate: '2019-04-18T04:00:00.000Z',
          endDate: '2020-04-18T04:00:00.000Z',
          policyHolders: [
            {
              _id: '5c9107eed9fac4000ee7e3eb',
              electronicDelivery: false,
              emailAddress: 'exzeoqa@exzeo.com',
              entityType: 'Person',
              firstName: 'BATMAN',
              lastName: 'ROBIN A005',
              order: 0,
              primaryPhoneNumber: '7271231234'
            }
          ],
          product: 'HO3',
          property: {
            _id: '5c9107e3d7bd33000e9ed9b7',
            buildingCodeEffectivenessGrading: 99,
            burglarAlarm: false,
            constructionType: 'FRAME',
            distanceToFireHydrant: 307.07,
            distanceToFireStation: 1.18,
            distanceToTidalWater: 4593.6,
            divingBoard: false,
            familyUnits: '1-2',
            fireAlarm: false,
            floodZone: 'A',
            gatedCommunity: false,
            id: '12000000000000005',
            physicalAddress: {
              _id: '5c9107e3d7bd33000e9ed9b8',
              address1: '106 TEST ADDRESS',
              address2: '',
              city: 'SAINT AUGUSTINE',
              county: 'SAINT JOHNS',
              latitude: 29.79695,
              longitude: -81.29969,
              state: 'FL',
              zip: '00005'
            },
            pool: false,
            poolSecured: false,
            protectionClass: 6,
            residenceType: 'SINGLE FAMILY',
            source: 'CasaClue',
            sprinkler: 'N',
            squareFeet: 1858,
            territory: '533-0',
            timezone: 'America/New_York',
            townhouseRowhouse: false,
            trampoline: false,
            windMitigation: {
              _id: '5c9107e3d7bd33000e9ed9b9',
              floridaBuildingCodeWindSpeed: 120,
              floridaBuildingCodeWindSpeedDesign: 120,
              internalPressureDesign: 'Other',
              openingProtection: 'Other',
              roofCovering: 'Other',
              roofDeckAttachment: 'Other',
              roofGeometry: 'Other',
              roofToWallConnection: 'Other',
              secondaryWaterResistance: 'Other',
              terrain: 'C',
              windBorneDebrisRegion: 'Yes'
            },
            yearBuilt: 2015,
            yearOfRoof: null
          },
          quoteNumber: '12-5160825-01',
          quoteState: 'Quote Started',
          rating: {
            _id: '5c9107f9d7bd33000e9edfa5',
            engineCode: 'HO3ByPeril',
            netPremium: 786,
            rateCode: 201704,
            totalFees: 27,
            totalPremium: 813,
            worksheet: {
              additionalCoverages: {
                increasedLiabilityMoldFungiLimit: 0,
                increasedPersonalLiabilityLimit: 22,
                increasedPropertyMoldFungiLimit: 0,
                liabilityIncidentalOccupancies: 0,
                otherStructIncLimits: 0,
                propertyIncidentalOccupancies: 0
              },
              additionalCoveragesSum: 22,
              bcegAdjustment: 2,
              elements: {
                ageOfHomeByYearFactors: {
                  hurricane: 1,
                  otherWind: 1,
                  yearBuilt: 2015
                },
                ageOfHomeFactors: {
                  ageOfHome: 4,
                  allOtherPerils: 1.372,
                  fire: 1.372,
                  liability: 1.372,
                  sinkhole: 1.372,
                  water: 1.372
                },
                baseRates: {
                  allOtherPerils: 153.35,
                  fire: 309.05,
                  hurricane: 613.41,
                  liability: 56.96,
                  otherWind: 22.98,
                  sinkhole: 7.47,
                  water: 516.56
                },
                bcegFactors: {
                  allOtherPerils: 1,
                  fire: 1,
                  grade: 99,
                  hurricane: 1.01,
                  liability: 1,
                  otherWind: 1.01,
                  sinkhole: 1,
                  territoryGroup: 3,
                  water: 1
                },
                burglarAlarmFactors: {
                  allOtherPerils: 1,
                  burglarAlarm: false,
                  fire: 1,
                  hurricane: 1,
                  liability: 1,
                  otherWind: 1,
                  sinkhole: 1,
                  water: 1
                },
                coverageAFactors: {
                  allOtherPerils: 1.761,
                  fire: 1.761,
                  hurricane: 1.761,
                  liability: 1,
                  otherWind: 1.761,
                  sinkhole: 1.761,
                  water: 1.761
                },
                coverageBFactors: {
                  allOtherPerils: 0.97,
                  fire: 0.97,
                  hurricane: 0.97,
                  liability: 1,
                  otherWind: 0.97,
                  sinkhole: 0.97,
                  water: 0.97
                },
                coverageCFactors: {
                  allOtherPerils: 0.925,
                  fire: 0.925,
                  hurricane: 0.85,
                  liability: 1,
                  otherWind: 0.925,
                  sinkhole: 0.925,
                  water: 0.925
                },
                deductibleFactors: {
                  allOtherPerils: 1,
                  allOtherPerilsDeductible: 1000,
                  exWind: false,
                  fire: 1,
                  hurricane: 1,
                  hurricaneDeductible: 2,
                  liability: 1,
                  otherWind: 1,
                  sinkhole: 1,
                  water: 1
                },
                fireAlarmAndSprinklerFactors: {
                  allOtherPerils: 1,
                  fire: 1,
                  fireAlarm: false,
                  hurricane: 1,
                  liability: 1,
                  otherWind: 1,
                  sinkhole: 1,
                  sprinkler: 'N',
                  water: 1
                },
                noPriorInsuranceFactors: {
                  allOtherPerils: 1,
                  fire: 1,
                  hurricane: 1,
                  liability: 1,
                  noPriorInsurance: false,
                  otherWind: 1,
                  sinkhole: 1,
                  water: 1
                },
                ordinanceOrLawFactors: {
                  allOtherPerils: 1,
                  fire: 1,
                  hurricane: 1,
                  liability: 1,
                  ordinanceOrLaw: false,
                  otherWind: 1,
                  sinkhole: 1,
                  water: 1
                },
                protectionClassFactors: {
                  allOtherPerils: 1,
                  constructionCode: 'F',
                  constructionType: 'Frame',
                  fire: 1,
                  hurricane: 1,
                  liability: 1,
                  otherWind: 1,
                  protectionClass: 6,
                  sinkhole: 1,
                  water: 1
                },
                replacementCostFactors: {
                  allOtherPerils: 1.125,
                  fire: 1.125,
                  hurricane: 1.125,
                  liability: 1,
                  otherWind: 1.125,
                  replacementCost: true,
                  sinkhole: 1.125,
                  water: 1.125
                },
                seasonalFactors: {
                  allOtherPerils: 1,
                  fire: 1,
                  hurricane: 1,
                  liability: 1,
                  otherWind: 1,
                  seasonal: false,
                  sinkhole: 1,
                  water: 1
                },
                territoryFactors: {
                  allOtherPerils: 0.228,
                  code: '533-0',
                  fire: 0.228,
                  group: 3,
                  hurricane: 0.757,
                  liability: 0.222,
                  minPremium: 0.003,
                  name: 'SaintJohns,Coastal',
                  otherWind: 0.757,
                  sinkhole: 1.115,
                  water: 0.228
                },
                townRowHouseFactors: {
                  allOtherPerils: 1,
                  fire: 1,
                  hurricane: 1,
                  liability: 1,
                  otherWind: 1,
                  protectionClass: 6,
                  sinkhole: 1,
                  units: '1-2',
                  water: 1
                },
                windMitigationFactors: {
                  allOtherPerils: 1,
                  fire: 1,
                  hurricane: 0.23,
                  liability: 1,
                  otherWind: 0.23,
                  sinkhole: 1,
                  water: 1,
                  windMitigationDiscount: 0.77
                }
              },
              fees: {
                citizensFee: 0,
                empTrustFee: 2,
                fhcfFee: 0,
                figaFee: 0,
                mgaPolicyFee: 25
              },
              minimumPremiumAdjustment: 0,
              netPremium: 786,
              perilPremiums: {
                allOtherPerils: 85,
                fire: 172,
                hurricane: 176,
                liability: 17,
                otherWind: 7,
                sinkhole: 20,
                water: 287
              },
              perilPremiumsSum: 764,
              subtotalPremium: 786,
              totalFees: 27,
              totalPremium: 813
            }
          },
          state: 'FL',
          underwritingAnswers: {
            business: {
              answer: 'No',
              question: 'Is a business conducted on the property?',
              source: 'Customer'
            },
            floodCoverage: {
              answer: 'Yes',
              question: 'Does this property have a separate insurance policy covering flood losses?',
              source: 'Default'
            },
            fourPointUpdates: {
              answer: 'Yes',
              question: 'Has the wiring, plumbing, HVAC, and roof been updated in the last 35 years?',
              source: 'Customer'
            },
            monthsOccupied: {
              answer: '10+',
              question: 'How many months a year does the owner live in the home?',
              source: 'Customer'
            },
            noPriorInsuranceSurcharge: {
              answer: 'No',
              question: 'If not new purchase, please provide proof of prior insurance.',
              source: 'Default'
            },
            previousClaims: {
              answer: 'No claims ever filed',
              question: 'How many claims in the past 5 years?',
              source: 'Customer'
            },
            rented: {
              answer: 'Never',
              question: 'Is the home or any structures on the property ever rented?',
              source: 'Customer'
            }
          },
          underwritingExceptions: [
            {
              _id: '5c9107fad9fac4000ee7e745',
              action: 'Missing Info',
              active: true,
              agentMessage: 'Missing required information to complete quote -  Mailing/Billing Info',
              canOverride: false,
              category: 'Coverages & Deductibles',
              code: '003',
              displayText: 'Missing Info - Mailing/Billing Info',
              fields: [],
              internalMessage: 'Missing required information to complete quote -  Mailing/Billing Info',
              overridden: false,
              overriddenAt: null,
              overriddenBy: {
                _id: '5c9107fad9fac4000ee7e746',
                userId: null,
                userName: null
              }
            }
          ],
          updatedAt: '2019-03-19T15:17:14.363Z',
          updatedBy: {
            _id: '5c9107fad9fac4000ee7e747',
            userId: 'auth0|594199c30b874417c3157ae1',
            userName: 'ttic-20000'
          }
        },
        status: 200,
        timeTookByEndpoint: 27
      }
    },
    {
      name: 'dsUrl',
      value: 'https://api.harmony-ins.com/ds'
    },
    {
      name: 'singleQuote',
      value: {
        message: 'success',
        result: {
          __v: 0,
          _id: '5c9107e3d7bd33000e9ed9b4',
          additionalInterests: [],
          agencyCode: 20000,
          agentCode: 60000,
          billToId: '',
          billToType: 'Policyholder',
          companyCode: 'TTIC',
          cost: {
            totalCost: 140,
            worksheet: {
              calculatedFields: {
                adminExp: 125,
                catExp: 0,
                coverageAFactor: 0.977,
                hurricaneTEFactor: 310.99,
                nonCatExp: 15,
                retentionExp: 0
              },
              inputFields: {
                aopDeductible: 1000,
                companyCode: 'TTIC',
                constructionType: 'F',
                coverageA: 227000,
                coverageB: 4540,
                coverageC: 56750,
                coverageD: 22700,
                currentYear: '2018',
                hurricaneDeductible: 2,
                openingProtection: 'C',
                product: 'HO3',
                replacementCost: true,
                roofGeometry: 'Other',
                sinkholeDeductible: 10,
                state: 'FL',
                version: '201801',
                yearBuilt: 2012,
                zip: '00005'
              },
              lookupFields: {
                baseCost: 125,
                baseCoverageA: 250000,
                claimCost: 1500,
                hurricaneConstructionTypeFactor: 1.316403,
                hurricaneDeductibleFactor: 1,
                hurricaneOpeningProtectionFactor: 1,
                hurricaneRetentionMult: 1.463338,
                hurricaneRoofShapeFactor: 1,
                hurricaneYearBuiltFactor: 0.304789,
                maxCoverageA: 750000,
                minCoverageA: 150000,
                nonCatConstructionLossCost: 15
              }
            }
          },
          coverageLimits: {
            _id: '5c9107e3d7bd33000e9ed9ba',
            dwelling: {
              _id: '5c9107e3d7bd33000e9ed9bb',
              amount: 227000,
              displayText: 'Dwelling',
              format: 'Currency',
              letterDesignation: 'A',
              maxAmount: 295000,
              minAmount: 204000
            },
            lossOfUse: {
              _id: '5c9107e3d7bd33000e9ed9be',
              amount: 22700,
              displayText: 'Loss of Use',
              format: 'Currency',
              letterDesignation: 'D'
            },
            medicalPayments: {
              _id: '5c9107e3d7bd33000e9ed9c0',
              amount: 2000,
              displayText: 'Medical Payments',
              format: 'Currency',
              letterDesignation: 'F'
            },
            moldLiability: {
              _id: '5c9107e3d7bd33000e9ed9c3',
              amount: 50000,
              displayText: 'Mold Liability',
              format: 'Currency'
            },
            moldProperty: {
              _id: '5c9107e3d7bd33000e9ed9c2',
              amount: 10000,
              displayText: 'Mold Property',
              format: 'Currency'
            },
            ordinanceOrLaw: {
              _id: '5c9107e3d7bd33000e9ed9c1',
              amount: 25,
              displayText: 'Ordinance or Law',
              format: 'Percentage',
              ofCoverageLimit: 'dwelling'
            },
            otherStructures: {
              _id: '5c9107e3d7bd33000e9ed9bc',
              amount: 4540,
              displayText: 'Other Structures',
              format: 'Currency',
              letterDesignation: 'B'
            },
            personalLiability: {
              _id: '5c9107e3d7bd33000e9ed9bf',
              amount: 300000,
              displayText: 'Personal Liability',
              format: 'Currency',
              letterDesignation: 'E'
            },
            personalProperty: {
              _id: '5c9107e3d7bd33000e9ed9bd',
              amount: 56750,
              displayText: 'Personal Property',
              format: 'Currency',
              letterDesignation: 'C'
            }
          },
          coverageOptions: {
            liabilityIncidentalOccupancies: {
              answer: false,
              displayText: 'Liability Permitted Incidental Occupancies'
            },
            personalPropertyReplacementCost: {
              answer: true,
              displayText: 'Personal Property Replacement Cost'
            },
            propertyIncidentalOccupanciesMainDwelling: {
              answer: false,
              displayText: 'Property Permitted Incidental Occupancies Main Dwelling'
            },
            propertyIncidentalOccupanciesOtherStructures: {
              answer: false,
              displayText: 'Property Permitted Incidental Occupancies Other Structures'
            },
            sinkholePerilCoverage: {
              answer: true,
              displayText: 'Sinkhole Peril Coverage'
            }
          },
          createdAt: '2019-03-19T15:16:51.712Z',
          createdBy: {
            _id: '5c9107e3d7bd33000e9ed9b5',
            userId: 'auth0|594199c30b874417c3157ae1',
            userName: 'ttic-20000'
          },
          deductibles: {
            allOtherPerils: {
              amount: 1000,
              displayText: 'All Other Perils',
              format: 'Currency'
            },
            hurricane: {
              amount: 2,
              calculatedAmount: 4540,
              displayText: 'Hurricane',
              format: 'Percentage',
              ofCoverageLimit: 'dwelling'
            },
            sinkhole: {
              amount: 10,
              calculatedAmount: 22700,
              displayText: 'Sinkhole',
              format: 'Percentage',
              ofCoverageLimit: 'dwelling'
            }
          },
          effectiveDate: '2019-04-18T04:00:00.000Z',
          endDate: '2020-04-18T04:00:00.000Z',
          policyHolders: [
            {
              _id: '5c9107eed9fac4000ee7e3eb',
              electronicDelivery: false,
              emailAddress: 'exzeoqa@exzeo.com',
              entityType: 'Person',
              firstName: 'BATMAN',
              lastName: 'ROBIN A005',
              order: 0,
              primaryPhoneNumber: '7271231234'
            }
          ],
          product: 'HO3',
          property: {
            _id: '5c9107e3d7bd33000e9ed9b7',
            buildingCodeEffectivenessGrading: 99,
            burglarAlarm: false,
            constructionType: 'FRAME',
            distanceToFireHydrant: 307.07,
            distanceToFireStation: 1.18,
            distanceToTidalWater: 4593.6,
            divingBoard: false,
            familyUnits: '1-2',
            fireAlarm: false,
            floodZone: 'A',
            gatedCommunity: false,
            id: '12000000000000005',
            physicalAddress: {
              _id: '5c9107e3d7bd33000e9ed9b8',
              address1: '106 TEST ADDRESS',
              address2: '',
              city: 'SAINT AUGUSTINE',
              county: 'SAINT JOHNS',
              latitude: 29.79695,
              longitude: -81.29969,
              state: 'FL',
              zip: '00005'
            },
            pool: false,
            poolSecured: false,
            protectionClass: 6,
            residenceType: 'SINGLE FAMILY',
            source: 'CasaClue',
            sprinkler: 'N',
            squareFeet: 1858,
            territory: '533-0',
            timezone: 'America/New_York',
            townhouseRowhouse: false,
            trampoline: false,
            windMitigation: {
              _id: '5c9107e3d7bd33000e9ed9b9',
              floridaBuildingCodeWindSpeed: 120,
              floridaBuildingCodeWindSpeedDesign: 120,
              internalPressureDesign: 'Other',
              openingProtection: 'Other',
              roofCovering: 'Other',
              roofDeckAttachment: 'Other',
              roofGeometry: 'Other',
              roofToWallConnection: 'Other',
              secondaryWaterResistance: 'Other',
              terrain: 'C',
              windBorneDebrisRegion: 'Yes'
            },
            yearBuilt: 2015,
            yearOfRoof: null
          },
          quoteNumber: '12-5160825-01',
          quoteState: 'Quote Started',
          rating: {
            _id: '5c9107f9d7bd33000e9edfa5',
            engineCode: 'HO3ByPeril',
            netPremium: 786,
            rateCode: 201704,
            totalFees: 27,
            totalPremium: 813,
            worksheet: {
              additionalCoverages: {
                increasedLiabilityMoldFungiLimit: 0,
                increasedPersonalLiabilityLimit: 22,
                increasedPropertyMoldFungiLimit: 0,
                liabilityIncidentalOccupancies: 0,
                otherStructIncLimits: 0,
                propertyIncidentalOccupancies: 0
              },
              additionalCoveragesSum: 22,
              bcegAdjustment: 2,
              elements: {
                ageOfHomeByYearFactors: {
                  hurricane: 1,
                  otherWind: 1,
                  yearBuilt: 2015
                },
                ageOfHomeFactors: {
                  ageOfHome: 4,
                  allOtherPerils: 1.372,
                  fire: 1.372,
                  liability: 1.372,
                  sinkhole: 1.372,
                  water: 1.372
                },
                baseRates: {
                  allOtherPerils: 153.35,
                  fire: 309.05,
                  hurricane: 613.41,
                  liability: 56.96,
                  otherWind: 22.98,
                  sinkhole: 7.47,
                  water: 516.56
                },
                bcegFactors: {
                  allOtherPerils: 1,
                  fire: 1,
                  grade: 99,
                  hurricane: 1.01,
                  liability: 1,
                  otherWind: 1.01,
                  sinkhole: 1,
                  territoryGroup: 3,
                  water: 1
                },
                burglarAlarmFactors: {
                  allOtherPerils: 1,
                  burglarAlarm: false,
                  fire: 1,
                  hurricane: 1,
                  liability: 1,
                  otherWind: 1,
                  sinkhole: 1,
                  water: 1
                },
                coverageAFactors: {
                  allOtherPerils: 1.761,
                  fire: 1.761,
                  hurricane: 1.761,
                  liability: 1,
                  otherWind: 1.761,
                  sinkhole: 1.761,
                  water: 1.761
                },
                coverageBFactors: {
                  allOtherPerils: 0.97,
                  fire: 0.97,
                  hurricane: 0.97,
                  liability: 1,
                  otherWind: 0.97,
                  sinkhole: 0.97,
                  water: 0.97
                },
                coverageCFactors: {
                  allOtherPerils: 0.925,
                  fire: 0.925,
                  hurricane: 0.85,
                  liability: 1,
                  otherWind: 0.925,
                  sinkhole: 0.925,
                  water: 0.925
                },
                deductibleFactors: {
                  allOtherPerils: 1,
                  allOtherPerilsDeductible: 1000,
                  exWind: false,
                  fire: 1,
                  hurricane: 1,
                  hurricaneDeductible: 2,
                  liability: 1,
                  otherWind: 1,
                  sinkhole: 1,
                  water: 1
                },
                fireAlarmAndSprinklerFactors: {
                  allOtherPerils: 1,
                  fire: 1,
                  fireAlarm: false,
                  hurricane: 1,
                  liability: 1,
                  otherWind: 1,
                  sinkhole: 1,
                  sprinkler: 'N',
                  water: 1
                },
                noPriorInsuranceFactors: {
                  allOtherPerils: 1,
                  fire: 1,
                  hurricane: 1,
                  liability: 1,
                  noPriorInsurance: false,
                  otherWind: 1,
                  sinkhole: 1,
                  water: 1
                },
                ordinanceOrLawFactors: {
                  allOtherPerils: 1,
                  fire: 1,
                  hurricane: 1,
                  liability: 1,
                  ordinanceOrLaw: false,
                  otherWind: 1,
                  sinkhole: 1,
                  water: 1
                },
                protectionClassFactors: {
                  allOtherPerils: 1,
                  constructionCode: 'F',
                  constructionType: 'Frame',
                  fire: 1,
                  hurricane: 1,
                  liability: 1,
                  otherWind: 1,
                  protectionClass: 6,
                  sinkhole: 1,
                  water: 1
                },
                replacementCostFactors: {
                  allOtherPerils: 1.125,
                  fire: 1.125,
                  hurricane: 1.125,
                  liability: 1,
                  otherWind: 1.125,
                  replacementCost: true,
                  sinkhole: 1.125,
                  water: 1.125
                },
                seasonalFactors: {
                  allOtherPerils: 1,
                  fire: 1,
                  hurricane: 1,
                  liability: 1,
                  otherWind: 1,
                  seasonal: false,
                  sinkhole: 1,
                  water: 1
                },
                territoryFactors: {
                  allOtherPerils: 0.228,
                  code: '533-0',
                  fire: 0.228,
                  group: 3,
                  hurricane: 0.757,
                  liability: 0.222,
                  minPremium: 0.003,
                  name: 'SaintJohns,Coastal',
                  otherWind: 0.757,
                  sinkhole: 1.115,
                  water: 0.228
                },
                townRowHouseFactors: {
                  allOtherPerils: 1,
                  fire: 1,
                  hurricane: 1,
                  liability: 1,
                  otherWind: 1,
                  protectionClass: 6,
                  sinkhole: 1,
                  units: '1-2',
                  water: 1
                },
                windMitigationFactors: {
                  allOtherPerils: 1,
                  fire: 1,
                  hurricane: 0.23,
                  liability: 1,
                  otherWind: 0.23,
                  sinkhole: 1,
                  water: 1,
                  windMitigationDiscount: 0.77
                }
              },
              fees: {
                citizensFee: 0,
                empTrustFee: 2,
                fhcfFee: 0,
                figaFee: 0,
                mgaPolicyFee: 25
              },
              minimumPremiumAdjustment: 0,
              netPremium: 786,
              perilPremiums: {
                allOtherPerils: 85,
                fire: 172,
                hurricane: 176,
                liability: 17,
                otherWind: 7,
                sinkhole: 20,
                water: 287
              },
              perilPremiumsSum: 764,
              subtotalPremium: 786,
              totalFees: 27,
              totalPremium: 813
            }
          },
          state: 'FL',
          underwritingAnswers: {
            business: {
              answer: 'No',
              question: 'Is a business conducted on the property?',
              source: 'Customer'
            },
            floodCoverage: {
              answer: 'Yes',
              question: 'Does this property have a separate insurance policy covering flood losses?',
              source: 'Default'
            },
            fourPointUpdates: {
              answer: 'Yes',
              question: 'Has the wiring, plumbing, HVAC, and roof been updated in the last 35 years?',
              source: 'Customer'
            },
            monthsOccupied: {
              answer: '10+',
              question: 'How many months a year does the owner live in the home?',
              source: 'Customer'
            },
            noPriorInsuranceSurcharge: {
              answer: 'No',
              question: 'If not new purchase, please provide proof of prior insurance.',
              source: 'Default'
            },
            previousClaims: {
              answer: 'No claims ever filed',
              question: 'How many claims in the past 5 years?',
              source: 'Customer'
            },
            rented: {
              answer: 'Never',
              question: 'Is the home or any structures on the property ever rented?',
              source: 'Customer'
            }
          },
          underwritingExceptions: [
            {
              _id: '5c9107fad9fac4000ee7e745',
              action: 'Missing Info',
              active: true,
              agentMessage: 'Missing required information to complete quote -  Mailing/Billing Info',
              canOverride: false,
              category: 'Coverages & Deductibles',
              code: '003',
              displayText: 'Missing Info - Mailing/Billing Info',
              fields: [],
              internalMessage: 'Missing required information to complete quote -  Mailing/Billing Info',
              overridden: false,
              overriddenAt: null,
              overriddenBy: {
                _id: '5c9107fad9fac4000ee7e746',
                userId: null,
                userName: null
              }
            }
          ],
          updatedAt: '2019-03-19T15:17:14.363Z',
          updatedBy: {
            _id: '5c9107fad9fac4000ee7e747',
            userId: 'auth0|594199c30b874417c3157ae1',
            userName: 'ttic-20000'
          }
        },
        status: 200,
        timeTookByEndpoint: 46
      }
    },
    {
      name: 'getActiveAgents',
      value: {
        message: 'Successful',
        result: [
          {
            _id: '5b97e6a6968a4b75eea82592',
            agencyCode: 20000,
            agentCode: 60000,
            agentOfRecord: true,
            appointed: true,
            companyCode: 'TTIC',
            createdAt: '2016-02-03T14:44:06.183Z',
            createdBy: 'LOAD',
            emailAddress: 'test@typtap.com',
            faxNumber: '',
            firstName: 'WALLY',
            lastName: 'WAGONER',
            licenseNumber: 'W180087',
            mailingAddress: {
              address1: '3001 S.E. MARICAMP ROAD',
              address2: '',
              city: 'OCALA',
              state: 'FL',
              zip: '34471'
            },
            physicalAddress: {
              address1: '3001 S.E. MARICAMP ROAD',
              city: 'OCALA',
              state: 'FL',
              zip: '34471'
            },
            primaryPhoneNumber: '3525099008',
            secondaryPhoneNumber: null,
            state: 'FL',
            status: 'Active',
            updatedAt: '2019-02-28T16:30:38.384Z',
            updatedBy: 'tticcsr'
          }
        ],
        status: 200,
        timeTookByEndpoint: 59
      }
    },
    {
      name: 'getFirstZipCodeFromArrayForPDF',
      value: {
        _id: '5aea142cdc0509268ca5ce85',
        availableSlots: 191,
        coastal: true,
        companyCode: 'TTIC',
        coverageLimits: {
          dwelling: {
            maxAmount: 750000,
            maxReplacementCostRatio: 1.3,
            minAmount: 125000,
            minReplacementCostRatio: 0.9
          },
          personalLiability: {
            defaultAmount: 300000
          },
          personalProperty: {
            maxAmount: 400000,
            minAmount: 0
          }
        },
        coverageOptions: {
          personalPropertyReplacementCost: {
            defaultAnswer: true
          },
          sinkholePerilCoverage: {
            defaultAnswer: true
          }
        },
        id: '5aea142cdc0509268ca5ce85',
        latitude: 29.78359,
        longitude: -81.26004,
        maxClaims: 1,
        maxEffectiveDate: '2019-06-17T00:00:00-04:00',
        maxNetPremium: 20000,
        maxProtectionClass: 8,
        maxWaitingPeriod: 90,
        maxYearBuilt: 2016,
        minCostPer100: 0.1,
        minEffectiveDate: '2019-03-19T00:00:00-04:00',
        minLossRatio: 1.1,
        minNetPremium: 700,
        minWaitingPeriod: 0,
        minYearBuilt: 1900,
        product: 'HO3',
        state: 'FL',
        suspended: false,
        territories: [
          '533-0',
          '533-71'
        ],
        timezone: 'America/New_York',
        zip: '00005'
      }
    },
    {
      name: 'transactionSpec',
      value: {
        transactionSpec: {
          groups: {
            coverage: {
              label: 'Coverage Info'
            },
            mailingbilling: {
              label: 'Mailing/Billing Info'
            },
            underwriting: {
              label: 'Underwriting Info'
            }
          },
          properties: {
            _id: {
              group: 'coverage'
            },
            agencyCode: {
              group: 'coverage'
            },
            agentCode: {
              group: 'coverage'
            },
            billPlan: {
              group: 'mailingbilling'
            },
            billToId: {
              group: 'mailingbilling'
            },
            billToType: {
              group: 'mailingbilling'
            },
            companyCode: {
              group: 'coverage'
            },
            coverageLimits: {
              group: 'coverage',
              minProperties: 1
            },
            coverageOptions: {
              group: 'coverage',
              minProperties: 1
            },
            deductibles: {
              group: 'coverage',
              minProperties: 1
            },
            effectiveDate: {
              group: 'coverage'
            },
            endDate: {
              group: 'coverage'
            },
            policyHolderMailingAddress: {
              group: 'mailingbilling',
              minProperties: 1
            },
            policyHolders: {
              group: 'coverage',
              minItems: 1
            },
            product: {
              group: 'coverage'
            },
            property: {
              group: 'coverage',
              minProperties: 1
            },
            quoteNumber: {
              group: 'coverage'
            },
            rating: {
              group: 'underwriting',
              minProperties: 1
            },
            state: {
              group: 'coverage'
            },
            underwritingAnswers: {
              group: 'underwriting',
              minProperties: 1
            }
          },
          required: [
            'underwritingAnswers',
            'billPlan',
            'billToId',
            'quoteNumber',
            'policyHolders',
            'endDate',
            'state',
            '_id',
            'agencyCode',
            'coverageLimits',
            'companyCode',
            'policyHolderMailingAddress',
            'coverageOptions',
            'deductibles',
            'rating',
            'effectiveDate',
            'property',
            'agentCode',
            'product'
          ],
          type: 'object'
        }
      }
    }
  ],
  workflowId: '3264484',
  completedTasks: [
    'uiTasks',
    'docuSignUrl',
    'search',
    'searchQuote',
    'chooseQuote',
    'retrieveQuote',
    'getZipCodeSettingsForQuote',
    'singleQuote',
    'quoteSchema',
    'transactionSpec',
    'zipCodeSettingsForPDFTimezone',
    'getFirstZipCodeFromArrayForPDF',
    'quote',
    'getActiveAgents'
  ],
  underwritingExceptions: [],
  uiQuestions: [
    {
      _id: '5bbba314ec85020015b7dd87',
      __v: 0,
      order: 1,
      name: 'primaryPolicyHolder',
      question: 'Primary Policyholder',
      answerType: 'heading',
      answers: [],
      group: [
        'primaryPolicyHolder'
      ],
      models: [
        'quote'
      ],
      product: [
        'HO3'
      ],
      state: [
        'FL'
      ],
      companyId: [
        'TTIC'
      ],
      steps: [
        'askAdditionalCustomerData'
      ],
      validations: []
    },
    {
      _id: '5bbba313ec85020015b7dd15',
      __v: 0,
      name: 'FirstName',
      defaultValueLocation: 'policyHolders[0].firstName',
      question: 'First Name',
      answerType: 'text',
      order: 2,
      answers: [],
      group: [
        'primaryPolicyHolder'
      ],
      models: [
        'quote'
      ],
      product: [
        'HO3'
      ],
      state: [
        'FL'
      ],
      companyId: [
        'TTIC'
      ],
      steps: [
        'askAdditionalCustomerData'
      ],
      validations: [
        'required',
        'maxLength255',
        'onlyAlphaNumeric'
      ]
    },
    {
      _id: '5bbba314ec85020015b7dd45',
      __v: 0,
      defaultValueLocation: 'policyHolders[0].lastName',
      name: 'LastName',
      question: 'Last Name',
      answerType: 'text',
      order: 3,
      answers: [],
      group: [
        'primaryPolicyHolder'
      ],
      models: [
        'quote'
      ],
      product: [
        'HO3'
      ],
      state: [
        'FL'
      ],
      companyId: [
        'TTIC'
      ],
      steps: [
        'askAdditionalCustomerData'
      ],
      validations: [
        'required',
        'maxLength255',
        'onlyAlphaNumeric'
      ]
    },
    {
      _id: '5bbba314ec85020015b7dd3c',
      __v: 0,
      name: 'EmailAddress',
      defaultValueLocation: 'policyHolders[0].emailAddress',
      question: 'Email Address',
      answerType: 'text',
      order: 4,
      answers: [],
      group: [
        'primaryPolicyHolder'
      ],
      models: [
        'quote'
      ],
      product: [
        'HO3'
      ],
      state: [
        'FL'
      ],
      companyId: [
        'TTIC'
      ],
      steps: [
        'askAdditionalCustomerData'
      ],
      validations: [
        'email',
        'maxLength255'
      ]
    },
    {
      _id: '5bbba314ec85020015b7dd4a',
      __v: 0,
      name: 'phoneNumber',
      styleName: 'phoneNumber',
      defaultValueLocation: 'policyHolders[0].primaryPhoneNumber',
      question: 'Contact Phone',
      answerType: 'phone',
      order: 5,
      answers: [],
      group: [
        'primaryPolicyHolder'
      ],
      models: [
        'quote'
      ],
      product: [
        'HO3'
      ],
      state: [
        'FL'
      ],
      companyId: [
        'TTIC'
      ],
      steps: [
        'askAdditionalCustomerData'
      ],
      validations: [
        'required',
        'phone'
      ]
    },
    {
      _id: '5bbba314ec85020015b7ddd5',
      __v: 0,
      answerType: 'bool',
      hidden: true,
      defaultValueLocation: 'policyHolders[0].electronicDelivery',
      order: 6,
      question: 'Deliver all policy documents electronically to Policyholder?',
      styleName: 'isAdditional',
      name: 'electronicDelivery',
      answers: [],
      group: [
        'primaryPolicyholder'
      ],
      models: [
        'quote'
      ],
      product: [
        'HO3'
      ],
      state: [
        'FL'
      ],
      companyId: [
        'TTIC'
      ],
      steps: [
        'askAdditionalCustomerData'
      ],
      validations: []
    },
    {
      _id: '5bbba314ec85020015b7dd5d',
      __v: 0,
      answerType: 'bool',
      order: 7,
      question: 'Do you want to add an additional Policyholder?',
      styleName: 'isAdditional',
      name: 'isAdditional',
      answers: [],
      group: [
        'secondaryPolicyHolder'
      ],
      models: [
        'quote'
      ],
      product: [
        'HO3'
      ],
      state: [
        'FL'
      ],
      companyId: [
        'TTIC'
      ],
      steps: [
        'askAdditionalCustomerData'
      ],
      validations: []
    },
    {
      _id: '5bbba314ec85020015b7ddb5',
      __v: 0,
      order: 8,
      name: 'secondaryPolicyHolder',
      question: 'Secondary Policyholder',
      answerType: 'heading',
      conditional: {
        display: [
          {
            parent: 'isAdditional',
            trigger: true,
            operator: 'equal',
            type: 'remove'
          }
        ]
      },
      answers: [],
      group: [
        'secondaryPolicyHolder'
      ],
      models: [
        'quote'
      ],
      product: [
        'HO3'
      ],
      state: [
        'FL'
      ],
      companyId: [
        'TTIC'
      ],
      steps: [
        'askAdditionalCustomerData'
      ],
      validations: []
    },
    {
      _id: '5bbba314ec85020015b7ddc8',
      __v: 0,
      name: 'FirstName2',
      defaultValueLocation: 'policyHolders[1].firstName',
      question: 'First Name',
      answerType: 'text',
      order: 9,
      conditional: {
        display: [
          {
            parent: 'isAdditional',
            trigger: true,
            operator: 'equal',
            type: 'remove'
          }
        ]
      },
      answers: [],
      group: [
        'secondaryPolicyHolder'
      ],
      models: [
        'quote'
      ],
      product: [
        'HO3'
      ],
      state: [
        'FL'
      ],
      companyId: [
        'TTIC'
      ],
      steps: [
        'askAdditionalCustomerData'
      ],
      validations: [
        'required',
        'maxLength255',
        'onlyAlphaNumeric'
      ]
    },
    {
      _id: '5bbba314ec85020015b7ddb6',
      __v: 0,
      defaultValueLocation: 'policyHolders[1].lastName',
      name: 'LastName2',
      question: 'Last Name',
      answerType: 'text',
      order: 10,
      conditional: {
        display: [
          {
            parent: 'isAdditional',
            trigger: true,
            operator: 'equal',
            type: 'remove'
          }
        ]
      },
      answers: [],
      group: [
        'secondaryPolicyHolder'
      ],
      models: [
        'quote'
      ],
      product: [
        'HO3'
      ],
      state: [
        'FL'
      ],
      companyId: [
        'TTIC'
      ],
      steps: [
        'askAdditionalCustomerData'
      ],
      validations: [
        'required',
        'maxLength255',
        'onlyAlphaNumeric'
      ]
    },
    {
      _id: '5bbba314ec85020015b7dd6c',
      __v: 0,
      name: 'EmailAddress2',
      defaultValueLocation: 'policyHolders[1].emailAddress',
      question: 'Email Address',
      answerType: 'text',
      order: 11,
      conditional: {
        display: [
          {
            parent: 'isAdditional',
            trigger: true,
            operator: 'equal',
            type: 'remove'
          }
        ]
      },
      answers: [],
      group: [
        'secondaryPolicyHolder'
      ],
      models: [
        'quote'
      ],
      product: [
        'HO3'
      ],
      state: [
        'FL'
      ],
      companyId: [
        'TTIC'
      ],
      steps: [
        'askAdditionalCustomerData'
      ],
      validations: [
        'email',
        'maxLength255'
      ]
    },
    {
      _id: '5bbba314ec85020015b7ddc9',
      __v: 0,
      name: 'phoneNumber2',
      styleName: 'phoneNumber2',
      defaultValueLocation: 'policyHolders[1].primaryPhoneNumber',
      question: 'Policyholder Contact Phone',
      answerType: 'phone',
      order: 12,
      conditional: {
        display: [
          {
            parent: 'isAdditional',
            trigger: true,
            operator: 'equal',
            type: 'remove'
          }
        ]
      },
      answers: [],
      group: [
        'secondaryPolicyHolder'
      ],
      models: [
        'quote'
      ],
      product: [
        'HO3'
      ],
      state: [
        'FL'
      ],
      companyId: [
        'TTIC'
      ],
      steps: [
        'askAdditionalCustomerData'
      ],
      validations: [
        'required',
        'phone'
      ]
    },
    {
      _id: '5bbba314ec85020015b7dda3',
      __v: 0,
      order: 13,
      name: 'policyHolderDetails',
      question: 'Policy Details',
      answerType: 'heading',
      answers: [],
      group: [
        'policyHolderDetails'
      ],
      models: [
        'quote'
      ],
      product: [
        'HO3'
      ],
      state: [
        'FL'
      ],
      companyId: [
        'TTIC'
      ],
      steps: [
        'askAdditionalCustomerData'
      ],
      validations: []
    },
    {
      _id: '5bbba314ec85020015b7dd52',
      __v: 0,
      name: 'effectiveDate',
      defaultValueLocation: 'effectiveDate',
      question: 'Effective Date',
      answerType: 'date',
      order: 15,
      answers: [],
      group: [
        'policyHolderDetails'
      ],
      models: [
        'quote'
      ],
      product: [
        'HO3'
      ],
      state: [
        'FL'
      ],
      companyId: [
        'TTIC'
      ],
      steps: [
        'askAdditionalCustomerData'
      ],
      validations: [
        'required',
        'date',
        'dateCheck'
      ]
    }
  ],
  underwritingQuestions: [],
  isHardStop: false
};

describe('Choreographer tests', () => {

  let sandbox = null;

  beforeEach(() => {
    sandbox = sinon.sandbox.create();
  })

  afterEach(() => {
    sandbox.restore()
  })

  describe('test createQuote', () => {
    
    it('called once', () => {

      // var result = sinon.spy(choreographer, 'createQuote');
      // choreographer.createQuote('123 Main St', '12345', 'FL');
      // expect(result).toEqual('')
      // sinon.assert.calledOnce(result);
      // sinon.assert.calledWith(result, '123 Main St', '12345', 'FL');

      const modelName = 'quoteModel';
      const data = { dsUrl: `${process.env.REACT_APP_API_URL}/ds` }

      const mockAdapter = new MockAdapter(axios);

      const axiosOptions = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        url: `${process.env.REACT_APP_API_URL}/cg/start?${modelName}`,
        data: { 
          modelName,
          data
        }
      };
  
      mockAdapter.onPost(axiosOptions.url, axiosOptions.data).reply(200, {
        data: MOCK_START_CG_DATA
      });

      choreographer.createQuote('123 Main St', '12345', 'FL');
    });
  });
});
