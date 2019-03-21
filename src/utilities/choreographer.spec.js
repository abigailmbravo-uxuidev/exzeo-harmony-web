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

const MOCK_COMPLETE_SEARCH_CG_DATA = {
  "modelInstanceId": "3290730",
  "modelName": "quoteModel",
  "activeTask": {
    "metaInfo": {
      "expectedInputs": [
        {
          "dataType": "string",
          "displayText": "Quote Id",
          "name": "quoteId",
          "required": true
        }
      ],
      "taskType": "userTask"
    },
    "name": "chooseQuote"
  },
  "previousTask": {
    "name": "searchQuote",
    "value": {
      "message": "success",
      "result": {
        "currentPage": 1,
        "pageSize": 25,
        "quotes": [
          {
            "_id": "5c912720d9fac4000ee85156",
            "companyCode": "TTIC",
            "createdAt": "2019-03-19T17:30:08.076Z",
            "createdBy": {
              "_id": "5c912720d9fac4000ee85157",
              "userId": "auth0|594199c30b874417c3157ae1",
              "userName": "ttic-20000"
            },
            "effectiveDate": "2019-04-03T04:00:00.000Z",
            "policyHolders": [
              {
                "_id": "5c91272ad9fac4000ee85184",
                "electronicDelivery": false,
                "emailAddress": "exzeoqa@exzeo.com",
                "entityType": "Person",
                "firstName": "BATMAN",
                "lastName": "ROBIN A003",
                "order": 0,
                "primaryPhoneNumber": "7271231234"
              }
            ],
            "product": "HO3",
            "property": {
              "_id": "5c912720d9fac4000ee85159",
              "buildingCodeEffectivenessGrading": 99,
              "burglarAlarm": false,
              "constructionType": "FRAME",
              "distanceToFireStation": 2.1,
              "distanceToTidalWater": 2164.8,
              "divingBoard": false,
              "familyUnits": "1-2",
              "fireAlarm": false,
              "floodZone": "X",
              "gatedCommunity": false,
              "id": "12000000000000003",
              "physicalAddress": {
                "_id": "5c912720d9fac4000ee8515a",
                "address1": "2600 TEST ADDRESS",
                "address2": "",
                "city": "FERNANDINA BEACH",
                "county": "NASSAU",
                "latitude": 30.60876,
                "longitude": -81.44811,
                "state": "FL",
                "zip": "00003"
              },
              "pool": false,
              "poolSecured": false,
              "protectionClass": 5,
              "residenceType": "SINGLE FAMILY",
              "source": "CasaClue",
              "sprinkler": "N",
              "squareFeet": 2144,
              "territory": "532-0",
              "timezone": "America/New_York",
              "townhouseRowhouse": false,
              "trampoline": false,
              "windMitigation": {
                "_id": "5c912720d9fac4000ee8515b",
                "floridaBuildingCodeWindSpeed": 120,
                "floridaBuildingCodeWindSpeedDesign": 120,
                "internalPressureDesign": "Other",
                "openingProtection": "Other",
                "roofCovering": "Other",
                "roofDeckAttachment": "Other",
                "roofGeometry": "Other",
                "roofToWallConnection": "Other",
                "secondaryWaterResistance": "Other",
                "terrain": "B",
                "windBorneDebrisRegion": "Yes"
              },
              "yearBuilt": 1981,
              "yearOfRoof": null
            },
            "quoteNumber": "12-5160868-01",
            "quoteState": "Quote Started",
            "state": "FL",
            "updatedAt": "2019-03-19T17:30:19.004Z",
            "updatedBy": {
              "_id": "5c91272bd7bd33000e9f4e88",
              "userId": "auth0|594199c30b874417c3157ae1",
              "userName": "ttic-20000"
            }
          }
        ],
        "sort": "updatedAt",
        "sortDirection": -1,
        "totalNumberOfRecords": 1
      },
      "status": 200,
      "timeTookByEndpoint": 1543
    }
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
            "displayText": "Quote Id",
            "name": "quoteId",
            "required": true
          }
        ],
        "taskType": "userTask"
      },
      "name": "chooseQuote"
    },
    "completedTasks": [
      "uiTasks",
      "docuSignUrl",
      "search",
      "searchQuote"
    ],
    "globalVariables": [
      {
        "name": "currentActiveTask",
        "value": "chooseQuote"
      },
      {
        "name": "lastActiveTask",
        "value": "searchQuote"
      },
      {
        "name": "modelName",
        "value": "quoteModel"
      },
      {
        "name": "completedTasks",
        "value": [
          "_6",
          "searchQuote",
          "_3",
          "search",
          "docuSignUrl",
          "uiTasks",
          "seqStartEvent"
        ]
      }
    ],
    "modelInstanceId": "3290730",
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
        "name": "searchQuote",
        "value": {
          "message": "success",
          "result": {
            "currentPage": 1,
            "pageSize": 25,
            "quotes": [
              {
                "_id": "5c912720d9fac4000ee85156",
                "companyCode": "TTIC",
                "createdAt": "2019-03-19T17:30:08.076Z",
                "createdBy": {
                  "_id": "5c912720d9fac4000ee85157",
                  "userId": "auth0|594199c30b874417c3157ae1",
                  "userName": "ttic-20000"
                },
                "effectiveDate": "2019-04-03T04:00:00.000Z",
                "policyHolders": [
                  {
                    "_id": "5c91272ad9fac4000ee85184",
                    "electronicDelivery": false,
                    "emailAddress": "exzeoqa@exzeo.com",
                    "entityType": "Person",
                    "firstName": "BATMAN",
                    "lastName": "ROBIN A003",
                    "order": 0,
                    "primaryPhoneNumber": "7271231234"
                  }
                ],
                "product": "HO3",
                "property": {
                  "_id": "5c912720d9fac4000ee85159",
                  "buildingCodeEffectivenessGrading": 99,
                  "burglarAlarm": false,
                  "constructionType": "FRAME",
                  "distanceToFireStation": 2.1,
                  "distanceToTidalWater": 2164.8,
                  "divingBoard": false,
                  "familyUnits": "1-2",
                  "fireAlarm": false,
                  "floodZone": "X",
                  "gatedCommunity": false,
                  "id": "12000000000000003",
                  "physicalAddress": {
                    "_id": "5c912720d9fac4000ee8515a",
                    "address1": "2600 TEST ADDRESS",
                    "address2": "",
                    "city": "FERNANDINA BEACH",
                    "county": "NASSAU",
                    "latitude": 30.60876,
                    "longitude": -81.44811,
                    "state": "FL",
                    "zip": "00003"
                  },
                  "pool": false,
                  "poolSecured": false,
                  "protectionClass": 5,
                  "residenceType": "SINGLE FAMILY",
                  "source": "CasaClue",
                  "sprinkler": "N",
                  "squareFeet": 2144,
                  "territory": "532-0",
                  "timezone": "America/New_York",
                  "townhouseRowhouse": false,
                  "trampoline": false,
                  "windMitigation": {
                    "_id": "5c912720d9fac4000ee8515b",
                    "floridaBuildingCodeWindSpeed": 120,
                    "floridaBuildingCodeWindSpeedDesign": 120,
                    "internalPressureDesign": "Other",
                    "openingProtection": "Other",
                    "roofCovering": "Other",
                    "roofDeckAttachment": "Other",
                    "roofGeometry": "Other",
                    "roofToWallConnection": "Other",
                    "secondaryWaterResistance": "Other",
                    "terrain": "B",
                    "windBorneDebrisRegion": "Yes"
                  },
                  "yearBuilt": 1981,
                  "yearOfRoof": null
                },
                "quoteNumber": "12-5160868-01",
                "quoteState": "Quote Started",
                "state": "FL",
                "updatedAt": "2019-03-19T17:30:19.004Z",
                "updatedBy": {
                  "_id": "5c91272bd7bd33000e9f4e88",
                  "userId": "auth0|594199c30b874417c3157ae1",
                  "userName": "ttic-20000"
                }
              }
            ],
            "sort": "updatedAt",
            "sortDirection": -1,
            "totalNumberOfRecords": 1
          },
          "status": 200,
          "timeTookByEndpoint": 1543
        }
      },
      {
        "name": "searchType",
        "value": "quote"
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
      },
      {
        "name": "quoteNumber",
        "value": "12-5160868-01"
      },
      {
        "name": "search",
        "value": {
          "quoteNumber": "12-5160868-01",
          "searchType": "quote"
        }
      },
      {
        "name": "dsUrl",
        "value": "https://api.harmony-ins.com/ds"
      }
    ]
  }
};

const MOCK_COMPLETE_CHOOSE_CG_DATA = {
    "modelInstanceId": "3290730",
    "modelName": "quoteModel",
    "activeTask": {
      "metaInfo": {
        "expectedInputs": [
          {
            "dataType": "string",
            "displayText": "Email",
            "name": "EmailAddress",
            "required": true
          },
          {
            "dataType": "string",
            "displayText": "Email 2",
            "name": "EmailAddress2",
            "required": false
          },
          {
            "dataType": "string",
            "displayText": "First Name",
            "name": "FirstName",
            "required": true
          },
          {
            "dataType": "string",
            "displayText": "First Name 2",
            "name": "FirstName2",
            "required": false
          },
          {
            "dataType": "string",
            "displayText": "Last Name",
            "name": "LastName",
            "required": true
          },
          {
            "dataType": "string",
            "displayText": "Last Name 2",
            "name": "LastName2",
            "required": false
          },
          {
            "dataType": "string",
            "displayText": "Agent Code",
            "name": "agentCode",
            "required": true
          },
          {
            "dataType": "string",
            "displayText": "Effective Date",
            "name": "effectiveDate",
            "required": true
          },
          {
            "dataType": "boolean",
            "displayText": "Electronic Delivery",
            "name": "electronicDelivery",
            "required": true
          },
          {
            "dataType": "string",
            "displayText": "Phone",
            "name": "phoneNumber",
            "required": true
          },
          {
            "dataType": "string",
            "displayText": "Phone 2",
            "name": "phoneNumber2",
            "required": false
          }
        ],
        "taskType": "userTask"
      },
      "name": "askAdditionalCustomerData"
    },
    "previousTask": {
      "name": "getActiveAgents",
      "value": {
        "message": "Successful",
        "result": [
          {
            "_id": "5b97e6a6968a4b75eea82592",
            "agencyCode": 20000,
            "agentCode": 60000,
            "agentOfRecord": true,
            "appointed": true,
            "companyCode": "TTIC",
            "createdAt": "2016-02-03T14:44:06.183Z",
            "createdBy": "LOAD",
            "emailAddress": "test@typtap.com",
            "faxNumber": "",
            "firstName": "WALLY",
            "lastName": "WAGONER",
            "licenseNumber": "W180087",
            "mailingAddress": {
              "address1": "3001 S.E. MARICAMP ROAD",
              "address2": "",
              "city": "OCALA",
              "state": "FL",
              "zip": "34471"
            },
            "physicalAddress": {
              "address1": "3001 S.E. MARICAMP ROAD",
              "city": "OCALA",
              "state": "FL",
              "zip": "34471"
            },
            "primaryPhoneNumber": "3525099008",
            "secondaryPhoneNumber": null,
            "state": "FL",
            "status": "Active",
            "updatedAt": "2019-02-28T16:30:38.384Z",
            "updatedBy": "tticcsr"
          },
          {
            "_id": "5bfc4ed82d488d00288fc24b",
            "agencyCode": 20000,
            "agentCode": -1234567890,
            "agentOfRecord": true,
            "appointed": true,
            "companyCode": "TTIC",
            "createdAt": "2018-11-26T19:51:52.970Z",
            "createdBy": "tticcsr",
            "emailAddress": "jsutphin@exzeo.com",
            "firstName": "test",
            "lastName": "test",
            "licenseNumber": "1234567890",
            "mailingAddress": {
              "address1": "123 Cypress",
              "city": "Tampa",
              "state": "FL",
              "zip": "555555"
            },
            "primaryPhoneNumber": "5555555555",
            "state": "FL",
            "status": "Active",
            "updatedAt": "2019-03-19T17:11:16.871Z",
            "updatedBy": "mryan1"
          }
        ],
        "status": 200,
        "timeTookByEndpoint": 46
      }
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
    "uiQuestions": [
      {
        "_id": "5bbba314ec85020015b7dd87",
        "__v": 0,
        "order": 1,
        "name": "primaryPolicyHolder",
        "question": "Primary Policyholder",
        "answerType": "heading",
        "answers": [],
        "group": [
          "primaryPolicyHolder"
        ],
        "models": [
          "quote"
        ],
        "product": [
          "HO3"
        ],
        "state": [
          "FL"
        ],
        "companyId": [
          "TTIC"
        ],
        "steps": [
          "askAdditionalCustomerData"
        ],
        "validations": []
      },
      {
        "_id": "5bbba313ec85020015b7dd15",
        "__v": 0,
        "name": "FirstName",
        "defaultValueLocation": "policyHolders[0].firstName",
        "question": "First Name",
        "answerType": "text",
        "order": 2,
        "answers": [],
        "group": [
          "primaryPolicyHolder"
        ],
        "models": [
          "quote"
        ],
        "product": [
          "HO3"
        ],
        "state": [
          "FL"
        ],
        "companyId": [
          "TTIC"
        ],
        "steps": [
          "askAdditionalCustomerData"
        ],
        "validations": [
          "required",
          "maxLength255",
          "onlyAlphaNumeric"
        ]
      },
      {
        "_id": "5bbba314ec85020015b7dd45",
        "__v": 0,
        "defaultValueLocation": "policyHolders[0].lastName",
        "name": "LastName",
        "question": "Last Name",
        "answerType": "text",
        "order": 3,
        "answers": [],
        "group": [
          "primaryPolicyHolder"
        ],
        "models": [
          "quote"
        ],
        "product": [
          "HO3"
        ],
        "state": [
          "FL"
        ],
        "companyId": [
          "TTIC"
        ],
        "steps": [
          "askAdditionalCustomerData"
        ],
        "validations": [
          "required",
          "maxLength255",
          "onlyAlphaNumeric"
        ]
      },
      {
        "_id": "5bbba314ec85020015b7dd3c",
        "__v": 0,
        "name": "EmailAddress",
        "defaultValueLocation": "policyHolders[0].emailAddress",
        "question": "Email Address",
        "answerType": "text",
        "order": 4,
        "answers": [],
        "group": [
          "primaryPolicyHolder"
        ],
        "models": [
          "quote"
        ],
        "product": [
          "HO3"
        ],
        "state": [
          "FL"
        ],
        "companyId": [
          "TTIC"
        ],
        "steps": [
          "askAdditionalCustomerData"
        ],
        "validations": [
          "email",
          "maxLength255"
        ]
      },
      {
        "_id": "5bbba314ec85020015b7dd4a",
        "__v": 0,
        "name": "phoneNumber",
        "styleName": "phoneNumber",
        "defaultValueLocation": "policyHolders[0].primaryPhoneNumber",
        "question": "Contact Phone",
        "answerType": "phone",
        "order": 5,
        "answers": [],
        "group": [
          "primaryPolicyHolder"
        ],
        "models": [
          "quote"
        ],
        "product": [
          "HO3"
        ],
        "state": [
          "FL"
        ],
        "companyId": [
          "TTIC"
        ],
        "steps": [
          "askAdditionalCustomerData"
        ],
        "validations": [
          "required",
          "phone"
        ]
      },
      {
        "_id": "5bbba314ec85020015b7ddd5",
        "__v": 0,
        "answerType": "bool",
        "hidden": true,
        "defaultValueLocation": "policyHolders[0].electronicDelivery",
        "order": 6,
        "question": "Deliver all policy documents electronically to Policyholder?",
        "styleName": "isAdditional",
        "name": "electronicDelivery",
        "answers": [],
        "group": [
          "primaryPolicyholder"
        ],
        "models": [
          "quote"
        ],
        "product": [
          "HO3"
        ],
        "state": [
          "FL"
        ],
        "companyId": [
          "TTIC"
        ],
        "steps": [
          "askAdditionalCustomerData"
        ],
        "validations": []
      },
      {
        "_id": "5bbba314ec85020015b7dd5d",
        "__v": 0,
        "answerType": "bool",
        "order": 7,
        "question": "Do you want to add an additional Policyholder?",
        "styleName": "isAdditional",
        "name": "isAdditional",
        "answers": [],
        "group": [
          "secondaryPolicyHolder"
        ],
        "models": [
          "quote"
        ],
        "product": [
          "HO3"
        ],
        "state": [
          "FL"
        ],
        "companyId": [
          "TTIC"
        ],
        "steps": [
          "askAdditionalCustomerData"
        ],
        "validations": []
      },
      {
        "_id": "5bbba314ec85020015b7ddb5",
        "__v": 0,
        "order": 8,
        "name": "secondaryPolicyHolder",
        "question": "Secondary Policyholder",
        "answerType": "heading",
        "conditional": {
          "display": [
            {
              "parent": "isAdditional",
              "trigger": true,
              "operator": "equal",
              "type": "remove"
            }
          ]
        },
        "answers": [],
        "group": [
          "secondaryPolicyHolder"
        ],
        "models": [
          "quote"
        ],
        "product": [
          "HO3"
        ],
        "state": [
          "FL"
        ],
        "companyId": [
          "TTIC"
        ],
        "steps": [
          "askAdditionalCustomerData"
        ],
        "validations": []
      },
      {
        "_id": "5bbba314ec85020015b7ddc8",
        "__v": 0,
        "name": "FirstName2",
        "defaultValueLocation": "policyHolders[1].firstName",
        "question": "First Name",
        "answerType": "text",
        "order": 9,
        "conditional": {
          "display": [
            {
              "parent": "isAdditional",
              "trigger": true,
              "operator": "equal",
              "type": "remove"
            }
          ]
        },
        "answers": [],
        "group": [
          "secondaryPolicyHolder"
        ],
        "models": [
          "quote"
        ],
        "product": [
          "HO3"
        ],
        "state": [
          "FL"
        ],
        "companyId": [
          "TTIC"
        ],
        "steps": [
          "askAdditionalCustomerData"
        ],
        "validations": [
          "required",
          "maxLength255",
          "onlyAlphaNumeric"
        ]
      },
      {
        "_id": "5bbba314ec85020015b7ddb6",
        "__v": 0,
        "defaultValueLocation": "policyHolders[1].lastName",
        "name": "LastName2",
        "question": "Last Name",
        "answerType": "text",
        "order": 10,
        "conditional": {
          "display": [
            {
              "parent": "isAdditional",
              "trigger": true,
              "operator": "equal",
              "type": "remove"
            }
          ]
        },
        "answers": [],
        "group": [
          "secondaryPolicyHolder"
        ],
        "models": [
          "quote"
        ],
        "product": [
          "HO3"
        ],
        "state": [
          "FL"
        ],
        "companyId": [
          "TTIC"
        ],
        "steps": [
          "askAdditionalCustomerData"
        ],
        "validations": [
          "required",
          "maxLength255",
          "onlyAlphaNumeric"
        ]
      },
      {
        "_id": "5bbba314ec85020015b7dd6c",
        "__v": 0,
        "name": "EmailAddress2",
        "defaultValueLocation": "policyHolders[1].emailAddress",
        "question": "Email Address",
        "answerType": "text",
        "order": 11,
        "conditional": {
          "display": [
            {
              "parent": "isAdditional",
              "trigger": true,
              "operator": "equal",
              "type": "remove"
            }
          ]
        },
        "answers": [],
        "group": [
          "secondaryPolicyHolder"
        ],
        "models": [
          "quote"
        ],
        "product": [
          "HO3"
        ],
        "state": [
          "FL"
        ],
        "companyId": [
          "TTIC"
        ],
        "steps": [
          "askAdditionalCustomerData"
        ],
        "validations": [
          "email",
          "maxLength255"
        ]
      },
      {
        "_id": "5bbba314ec85020015b7ddc9",
        "__v": 0,
        "name": "phoneNumber2",
        "styleName": "phoneNumber2",
        "defaultValueLocation": "policyHolders[1].primaryPhoneNumber",
        "question": "Policyholder Contact Phone",
        "answerType": "phone",
        "order": 12,
        "conditional": {
          "display": [
            {
              "parent": "isAdditional",
              "trigger": true,
              "operator": "equal",
              "type": "remove"
            }
          ]
        },
        "answers": [],
        "group": [
          "secondaryPolicyHolder"
        ],
        "models": [
          "quote"
        ],
        "product": [
          "HO3"
        ],
        "state": [
          "FL"
        ],
        "companyId": [
          "TTIC"
        ],
        "steps": [
          "askAdditionalCustomerData"
        ],
        "validations": [
          "required",
          "phone"
        ]
      },
      {
        "_id": "5bbba314ec85020015b7dda3",
        "__v": 0,
        "order": 13,
        "name": "policyHolderDetails",
        "question": "Policy Details",
        "answerType": "heading",
        "answers": [],
        "group": [
          "policyHolderDetails"
        ],
        "models": [
          "quote"
        ],
        "product": [
          "HO3"
        ],
        "state": [
          "FL"
        ],
        "companyId": [
          "TTIC"
        ],
        "steps": [
          "askAdditionalCustomerData"
        ],
        "validations": []
      },
      {
        "_id": "5bbba314ec85020015b7dd52",
        "__v": 0,
        "name": "effectiveDate",
        "defaultValueLocation": "effectiveDate",
        "question": "Effective Date",
        "answerType": "date",
        "order": 15,
        "answers": [],
        "group": [
          "policyHolderDetails"
        ],
        "models": [
          "quote"
        ],
        "product": [
          "HO3"
        ],
        "state": [
          "FL"
        ],
        "companyId": [
          "TTIC"
        ],
        "steps": [
          "askAdditionalCustomerData"
        ],
        "validations": [
          "required",
          "date",
          "dateCheck"
        ]
      }
    ],
    "model": {
      "activeTask": {
        "metaInfo": {
          "expectedInputs": [
            {
              "dataType": "string",
              "displayText": "Email",
              "name": "EmailAddress",
              "required": true
            },
            {
              "dataType": "string",
              "displayText": "Email 2",
              "name": "EmailAddress2",
              "required": false
            },
            {
              "dataType": "string",
              "displayText": "First Name",
              "name": "FirstName",
              "required": true
            },
            {
              "dataType": "string",
              "displayText": "First Name 2",
              "name": "FirstName2",
              "required": false
            },
            {
              "dataType": "string",
              "displayText": "Last Name",
              "name": "LastName",
              "required": true
            },
            {
              "dataType": "string",
              "displayText": "Last Name 2",
              "name": "LastName2",
              "required": false
            },
            {
              "dataType": "string",
              "displayText": "Agent Code",
              "name": "agentCode",
              "required": true
            },
            {
              "dataType": "string",
              "displayText": "Effective Date",
              "name": "effectiveDate",
              "required": true
            },
            {
              "dataType": "boolean",
              "displayText": "Electronic Delivery",
              "name": "electronicDelivery",
              "required": true
            },
            {
              "dataType": "string",
              "displayText": "Phone",
              "name": "phoneNumber",
              "required": true
            },
            {
              "dataType": "string",
              "displayText": "Phone 2",
              "name": "phoneNumber2",
              "required": false
            }
          ],
          "taskType": "userTask"
        },
        "name": "askAdditionalCustomerData"
      },
      "completedTasks": [
        "uiTasks",
        "docuSignUrl",
        "search",
        "searchQuote",
        "chooseQuote",
        "retrieveQuote",
        "getZipCodeSettingsForQuote",
        "singleQuote",
        "quoteSchema",
        "transactionSpec",
        "zipCodeSettingsForPDFTimezone",
        "getFirstZipCodeFromArrayForPDF",
        "quote",
        "getActiveAgents"
      ],
      "globalVariables": [
        {
          "name": "currentActiveTask",
          "value": "askAdditionalCustomerData"
        },
        {
          "name": "lastActiveTask",
          "value": "getActiveAgents"
        },
        {
          "name": "modelName",
          "value": "quoteModel"
        },
        {
          "name": "completedTasks",
          "value": [
            "getActiveAgents",
            "quote",
            "getFirstZipCodeFromArrayForPDF",
            "zipCodeSettingsForPDFTimezone",
            "transactionSpec",
            "quoteSchema",
            "singleQuote",
            "getZipCodeSettingsForQuote",
            "retrieveQuote",
            "chooseQuote",
            "_6",
            "searchQuote",
            "_3",
            "search",
            "docuSignUrl",
            "uiTasks",
            "seqStartEvent"
          ]
        }
      ],
      "modelInstanceId": "3290730",
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
          "name": "zipCodeSettingsForPDFTimezone",
          "value": {
            "message": "success",
            "result": [
              {
                "_id": "5aea142cdc0509268ca5ce77",
                "availableSlots": 155,
                "coastal": true,
                "companyCode": "TTIC",
                "coverageLimits": {
                  "dwelling": {
                    "maxAmount": 750000,
                    "maxReplacementCostRatio": 1.3,
                    "minAmount": 125000,
                    "minReplacementCostRatio": 0.9
                  },
                  "personalLiability": {
                    "defaultAmount": 300000
                  },
                  "personalProperty": {
                    "maxAmount": 400000,
                    "minAmount": 0
                  }
                },
                "coverageOptions": {
                  "personalPropertyReplacementCost": {
                    "defaultAnswer": true
                  },
                  "sinkholePerilCoverage": {
                    "defaultAnswer": true
                  }
                },
                "id": "5aea142cdc0509268ca5ce77",
                "latitude": 30.62019,
                "longitude": -81.50562,
                "maxClaims": 1,
                "maxEffectiveDate": "2019-06-17T00:00:00-04:00",
                "maxNetPremium": 20000,
                "maxProtectionClass": 8,
                "maxWaitingPeriod": 90,
                "maxYearBuilt": 2016,
                "minCostPer100": 0.1,
                "minEffectiveDate": "2019-03-19T00:00:00-04:00",
                "minLossRatio": 1.1,
                "minNetPremium": 700,
                "minWaitingPeriod": 0,
                "minYearBuilt": 1900,
                "product": "HO3",
                "state": "FL",
                "suspended": false,
                "territories": [
                  "532-0",
                  "532-69",
                  "892-0"
                ],
                "timezone": "America/New_York",
                "zip": "00003"
              }
            ],
            "status": 200,
            "timeTookByEndpoint": 8
          }
        },
        {
          "name": "searchQuote",
          "value": {
            "message": "success",
            "result": {
              "currentPage": 1,
              "pageSize": 25,
              "quotes": [
                {
                  "_id": "5c912720d9fac4000ee85156",
                  "companyCode": "TTIC",
                  "createdAt": "2019-03-19T17:30:08.076Z",
                  "createdBy": {
                    "_id": "5c912720d9fac4000ee85157",
                    "userId": "auth0|594199c30b874417c3157ae1",
                    "userName": "ttic-20000"
                  },
                  "effectiveDate": "2019-04-03T04:00:00.000Z",
                  "policyHolders": [
                    {
                      "_id": "5c91272ad9fac4000ee85184",
                      "electronicDelivery": false,
                      "emailAddress": "exzeoqa@exzeo.com",
                      "entityType": "Person",
                      "firstName": "BATMAN",
                      "lastName": "ROBIN A003",
                      "order": 0,
                      "primaryPhoneNumber": "7271231234"
                    }
                  ],
                  "product": "HO3",
                  "property": {
                    "_id": "5c912720d9fac4000ee85159",
                    "buildingCodeEffectivenessGrading": 99,
                    "burglarAlarm": false,
                    "constructionType": "FRAME",
                    "distanceToFireStation": 2.1,
                    "distanceToTidalWater": 2164.8,
                    "divingBoard": false,
                    "familyUnits": "1-2",
                    "fireAlarm": false,
                    "floodZone": "X",
                    "gatedCommunity": false,
                    "id": "12000000000000003",
                    "physicalAddress": {
                      "_id": "5c912720d9fac4000ee8515a",
                      "address1": "2600 TEST ADDRESS",
                      "address2": "",
                      "city": "FERNANDINA BEACH",
                      "county": "NASSAU",
                      "latitude": 30.60876,
                      "longitude": -81.44811,
                      "state": "FL",
                      "zip": "00003"
                    },
                    "pool": false,
                    "poolSecured": false,
                    "protectionClass": 5,
                    "residenceType": "SINGLE FAMILY",
                    "source": "CasaClue",
                    "sprinkler": "N",
                    "squareFeet": 2144,
                    "territory": "532-0",
                    "timezone": "America/New_York",
                    "townhouseRowhouse": false,
                    "trampoline": false,
                    "windMitigation": {
                      "_id": "5c912720d9fac4000ee8515b",
                      "floridaBuildingCodeWindSpeed": 120,
                      "floridaBuildingCodeWindSpeedDesign": 120,
                      "internalPressureDesign": "Other",
                      "openingProtection": "Other",
                      "roofCovering": "Other",
                      "roofDeckAttachment": "Other",
                      "roofGeometry": "Other",
                      "roofToWallConnection": "Other",
                      "secondaryWaterResistance": "Other",
                      "terrain": "B",
                      "windBorneDebrisRegion": "Yes"
                    },
                    "yearBuilt": 1981,
                    "yearOfRoof": null
                  },
                  "quoteNumber": "12-5160868-01",
                  "quoteState": "Quote Started",
                  "state": "FL",
                  "updatedAt": "2019-03-19T17:30:19.004Z",
                  "updatedBy": {
                    "_id": "5c91272bd7bd33000e9f4e88",
                    "userId": "auth0|594199c30b874417c3157ae1",
                    "userName": "ttic-20000"
                  }
                }
              ],
              "sort": "updatedAt",
              "sortDirection": -1,
              "totalNumberOfRecords": 1
            },
            "status": 200,
            "timeTookByEndpoint": 1543
          }
        },
        {
          "name": "searchType",
          "value": "quote"
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
        },
        {
          "name": "getZipCodeSettingsForQuote",
          "value": {
            "message": "success",
            "result": [
              {
                "_id": "5aea142cdc0509268ca5ce77",
                "availableSlots": 155,
                "coastal": true,
                "companyCode": "TTIC",
                "coverageLimits": {
                  "dwelling": {
                    "maxAmount": 750000,
                    "maxReplacementCostRatio": 1.3,
                    "minAmount": 125000,
                    "minReplacementCostRatio": 0.9
                  },
                  "personalLiability": {
                    "defaultAmount": 300000
                  },
                  "personalProperty": {
                    "maxAmount": 400000,
                    "minAmount": 0
                  }
                },
                "coverageOptions": {
                  "personalPropertyReplacementCost": {
                    "defaultAnswer": true
                  },
                  "sinkholePerilCoverage": {
                    "defaultAnswer": true
                  }
                },
                "id": "5aea142cdc0509268ca5ce77",
                "latitude": 30.62019,
                "longitude": -81.50562,
                "maxClaims": 1,
                "maxEffectiveDate": "2019-06-17T00:00:00-04:00",
                "maxNetPremium": 20000,
                "maxProtectionClass": 8,
                "maxWaitingPeriod": 90,
                "maxYearBuilt": 2016,
                "minCostPer100": 0.1,
                "minEffectiveDate": "2019-03-19T00:00:00-04:00",
                "minLossRatio": 1.1,
                "minNetPremium": 700,
                "minWaitingPeriod": 0,
                "minYearBuilt": 1900,
                "product": "HO3",
                "state": "FL",
                "suspended": false,
                "territories": [
                  "532-0",
                  "532-69",
                  "892-0"
                ],
                "timezone": "America/New_York",
                "zip": "00003"
              }
            ],
            "status": 200,
            "timeTookByEndpoint": 8
          }
        },
        {
          "name": "chooseQuote",
          "value": {
            "quoteId": "5c912720d9fac4000ee85156"
          }
        },
        {
          "name": "quoteNumber",
          "value": "12-5160868-01"
        },
        {
          "name": "quoteId",
          "value": "5c912720d9fac4000ee85156"
        },
        {
          "name": "quoteSchema",
          "value": {
            "message": "success",
            "result": {
              "groups": {
                "coverage": {
                  "label": "Coverage Info"
                },
                "mailingbilling": {
                  "label": "Mailing/Billing Info"
                },
                "underwriting": {
                  "label": "Underwriting Info"
                }
              },
              "properties": {
                "_id": {
                  "group": "coverage"
                },
                "agencyCode": {
                  "group": "coverage"
                },
                "agentCode": {
                  "group": "coverage"
                },
                "billPlan": {
                  "group": "mailingbilling"
                },
                "billToId": {
                  "group": "mailingbilling"
                },
                "billToType": {
                  "group": "mailingbilling"
                },
                "companyCode": {
                  "group": "coverage"
                },
                "coverageLimits": {
                  "group": "coverage",
                  "minProperties": 1
                },
                "coverageOptions": {
                  "group": "coverage",
                  "minProperties": 1
                },
                "deductibles": {
                  "group": "coverage",
                  "minProperties": 1
                },
                "effectiveDate": {
                  "group": "coverage"
                },
                "endDate": {
                  "group": "coverage"
                },
                "policyHolderMailingAddress": {
                  "group": "mailingbilling",
                  "minProperties": 1
                },
                "policyHolders": {
                  "group": "coverage",
                  "minItems": 1
                },
                "product": {
                  "group": "coverage"
                },
                "property": {
                  "group": "coverage",
                  "minProperties": 1
                },
                "quoteNumber": {
                  "group": "coverage"
                },
                "rating": {
                  "group": "underwriting",
                  "minProperties": 1
                },
                "state": {
                  "group": "coverage"
                },
                "underwritingAnswers": {
                  "group": "underwriting",
                  "minProperties": 1
                }
              },
              "required": [
                "underwritingAnswers",
                "billPlan",
                "billToId",
                "quoteNumber",
                "policyHolders",
                "endDate",
                "state",
                "_id",
                "agencyCode",
                "coverageLimits",
                "companyCode",
                "policyHolderMailingAddress",
                "coverageOptions",
                "deductibles",
                "rating",
                "effectiveDate",
                "property",
                "agentCode",
                "product"
              ],
              "type": "object"
            },
            "status": 200,
            "timeTookByEndpoint": 13
          }
        },
        {
          "name": "retrieveQuote",
          "value": {
            "message": "success",
            "result": {
              "__v": 0,
              "_id": "5c912720d9fac4000ee85156",
              "additionalInterests": [],
              "agencyCode": 20000,
              "agentCode": 60000,
              "billToId": "",
              "billToType": "Policyholder",
              "companyCode": "TTIC",
              "coverageLimits": {
                "_id": "5c912720d9fac4000ee8515c",
                "dwelling": {
                  "_id": "5c912720d9fac4000ee8515d",
                  "amount": 254000,
                  "displayText": "Dwelling",
                  "format": "Currency",
                  "letterDesignation": "A",
                  "maxAmount": 330000,
                  "minAmount": 229000
                },
                "lossOfUse": {
                  "_id": "5c912720d9fac4000ee85160",
                  "amount": 25400,
                  "displayText": "Loss of Use",
                  "format": "Currency",
                  "letterDesignation": "D"
                },
                "medicalPayments": {
                  "_id": "5c912720d9fac4000ee85162",
                  "amount": 2000,
                  "displayText": "Medical Payments",
                  "format": "Currency",
                  "letterDesignation": "F"
                },
                "moldLiability": {
                  "_id": "5c912720d9fac4000ee85165",
                  "amount": 50000,
                  "displayText": "Mold Liability",
                  "format": "Currency"
                },
                "moldProperty": {
                  "_id": "5c912720d9fac4000ee85164",
                  "amount": 10000,
                  "displayText": "Mold Property",
                  "format": "Currency"
                },
                "ordinanceOrLaw": {
                  "_id": "5c912720d9fac4000ee85163",
                  "amount": 25,
                  "displayText": "Ordinance or Law",
                  "format": "Percentage",
                  "ofCoverageLimit": "dwelling"
                },
                "otherStructures": {
                  "_id": "5c912720d9fac4000ee8515e",
                  "amount": 5080,
                  "displayText": "Other Structures",
                  "format": "Currency",
                  "letterDesignation": "B"
                },
                "personalLiability": {
                  "_id": "5c912720d9fac4000ee85161",
                  "amount": 300000,
                  "displayText": "Personal Liability",
                  "format": "Currency",
                  "letterDesignation": "E"
                },
                "personalProperty": {
                  "_id": "5c912720d9fac4000ee8515f",
                  "amount": 63500,
                  "displayText": "Personal Property",
                  "format": "Currency",
                  "letterDesignation": "C"
                }
              },
              "coverageOptions": {
                "liabilityIncidentalOccupancies": {
                  "answer": false,
                  "displayText": "Liability Permitted Incidental Occupancies"
                },
                "personalPropertyReplacementCost": {
                  "answer": true,
                  "displayText": "Personal Property Replacement Cost"
                },
                "propertyIncidentalOccupanciesMainDwelling": {
                  "answer": false,
                  "displayText": "Property Permitted Incidental Occupancies Main Dwelling"
                },
                "propertyIncidentalOccupanciesOtherStructures": {
                  "answer": false,
                  "displayText": "Property Permitted Incidental Occupancies Other Structures"
                },
                "sinkholePerilCoverage": {
                  "answer": true,
                  "displayText": "Sinkhole Peril Coverage"
                }
              },
              "createdAt": "2019-03-19T17:30:08.076Z",
              "createdBy": {
                "_id": "5c912720d9fac4000ee85157",
                "userId": "auth0|594199c30b874417c3157ae1",
                "userName": "ttic-20000"
              },
              "deductibles": {
                "allOtherPerils": {
                  "amount": 1000,
                  "displayText": "All Other Perils",
                  "format": "Currency"
                },
                "hurricane": {
                  "amount": 2,
                  "calculatedAmount": 5080,
                  "displayText": "Hurricane",
                  "format": "Percentage",
                  "ofCoverageLimit": "dwelling"
                },
                "sinkhole": {
                  "amount": 10,
                  "calculatedAmount": 25400,
                  "displayText": "Sinkhole",
                  "format": "Percentage",
                  "ofCoverageLimit": "dwelling"
                }
              },
              "effectiveDate": "2019-04-03T04:00:00.000Z",
              "endDate": "2020-04-03T04:00:00.000Z",
              "policyHolders": [
                {
                  "_id": "5c91272ad9fac4000ee85184",
                  "electronicDelivery": false,
                  "emailAddress": "exzeoqa@exzeo.com",
                  "entityType": "Person",
                  "firstName": "BATMAN",
                  "lastName": "ROBIN A003",
                  "order": 0,
                  "primaryPhoneNumber": "7271231234"
                }
              ],
              "product": "HO3",
              "property": {
                "_id": "5c912720d9fac4000ee85159",
                "buildingCodeEffectivenessGrading": 99,
                "burglarAlarm": false,
                "constructionType": "FRAME",
                "distanceToFireStation": 2.1,
                "distanceToTidalWater": 2164.8,
                "divingBoard": false,
                "familyUnits": "1-2",
                "fireAlarm": false,
                "floodZone": "X",
                "gatedCommunity": false,
                "id": "12000000000000003",
                "physicalAddress": {
                  "_id": "5c912720d9fac4000ee8515a",
                  "address1": "2600 TEST ADDRESS",
                  "address2": "",
                  "city": "FERNANDINA BEACH",
                  "county": "NASSAU",
                  "latitude": 30.60876,
                  "longitude": -81.44811,
                  "state": "FL",
                  "zip": "00003"
                },
                "pool": false,
                "poolSecured": false,
                "protectionClass": 5,
                "residenceType": "SINGLE FAMILY",
                "source": "CasaClue",
                "sprinkler": "N",
                "squareFeet": 2144,
                "territory": "532-0",
                "timezone": "America/New_York",
                "townhouseRowhouse": false,
                "trampoline": false,
                "windMitigation": {
                  "_id": "5c912720d9fac4000ee8515b",
                  "floridaBuildingCodeWindSpeed": 120,
                  "floridaBuildingCodeWindSpeedDesign": 120,
                  "internalPressureDesign": "Other",
                  "openingProtection": "Other",
                  "roofCovering": "Other",
                  "roofDeckAttachment": "Other",
                  "roofGeometry": "Other",
                  "roofToWallConnection": "Other",
                  "secondaryWaterResistance": "Other",
                  "terrain": "B",
                  "windBorneDebrisRegion": "Yes"
                },
                "yearBuilt": 1981,
                "yearOfRoof": null
              },
              "quoteNumber": "12-5160868-01",
              "quoteState": "Quote Started",
              "state": "FL",
              "underwritingAnswers": {
                "floodCoverage": {
                  "answer": "Yes",
                  "question": "Does this property have a separate insurance policy covering flood losses?",
                  "source": "Default"
                },
                "noPriorInsuranceSurcharge": {
                  "answer": "No",
                  "question": "If not new purchase, please provide proof of prior insurance.",
                  "source": "Default"
                }
              },
              "underwritingExceptions": [
                {
                  "_id": "5c91272bd7bd33000e9f4e86",
                  "action": "Missing Info",
                  "active": true,
                  "agentMessage": "Missing required information to complete quote - Underwriting Info",
                  "canOverride": false,
                  "category": "Property",
                  "code": "002",
                  "displayText": "Missing Info - Underwriting Info",
                  "fields": [],
                  "internalMessage": "Missing required information to complete quote - Underwriting Info",
                  "overridden": false,
                  "overriddenAt": null,
                  "overriddenBy": {
                    "_id": "5c91272bd7bd33000e9f4e87",
                    "userId": null,
                    "userName": null
                  }
                },
                {
                  "_id": "5c91272bd7bd33000e9f4e84",
                  "action": "Missing Info",
                  "active": true,
                  "agentMessage": "Missing required information to complete quote -  Mailing/Billing Info",
                  "canOverride": false,
                  "category": "Coverages & Deductibles",
                  "code": "003",
                  "displayText": "Missing Info - Mailing/Billing Info",
                  "fields": [],
                  "internalMessage": "Missing required information to complete quote -  Mailing/Billing Info",
                  "overridden": false,
                  "overriddenAt": null,
                  "overriddenBy": {
                    "_id": "5c91272bd7bd33000e9f4e85",
                    "userId": null,
                    "userName": null
                  }
                }
              ],
              "updatedAt": "2019-03-19T17:30:19.004Z",
              "updatedBy": {
                "_id": "5c91272bd7bd33000e9f4e88",
                "userId": "auth0|594199c30b874417c3157ae1",
                "userName": "ttic-20000"
              }
            },
            "status": 200,
            "timeTookByEndpoint": 21
          }
        },
        {
          "name": "search",
          "value": {
            "quoteNumber": "12-5160868-01",
            "searchType": "quote"
          }
        },
        {
          "name": "quote",
          "value": {
            "message": "success",
            "result": {
              "__v": 0,
              "_id": "5c912720d9fac4000ee85156",
              "additionalInterests": [],
              "agencyCode": 20000,
              "agentCode": 60000,
              "billToId": "",
              "billToType": "Policyholder",
              "companyCode": "TTIC",
              "coverageLimits": {
                "_id": "5c912720d9fac4000ee8515c",
                "dwelling": {
                  "_id": "5c912720d9fac4000ee8515d",
                  "amount": 254000,
                  "displayText": "Dwelling",
                  "format": "Currency",
                  "letterDesignation": "A",
                  "maxAmount": 330000,
                  "minAmount": 229000
                },
                "lossOfUse": {
                  "_id": "5c912720d9fac4000ee85160",
                  "amount": 25400,
                  "displayText": "Loss of Use",
                  "format": "Currency",
                  "letterDesignation": "D"
                },
                "medicalPayments": {
                  "_id": "5c912720d9fac4000ee85162",
                  "amount": 2000,
                  "displayText": "Medical Payments",
                  "format": "Currency",
                  "letterDesignation": "F"
                },
                "moldLiability": {
                  "_id": "5c912720d9fac4000ee85165",
                  "amount": 50000,
                  "displayText": "Mold Liability",
                  "format": "Currency"
                },
                "moldProperty": {
                  "_id": "5c912720d9fac4000ee85164",
                  "amount": 10000,
                  "displayText": "Mold Property",
                  "format": "Currency"
                },
                "ordinanceOrLaw": {
                  "_id": "5c912720d9fac4000ee85163",
                  "amount": 25,
                  "displayText": "Ordinance or Law",
                  "format": "Percentage",
                  "ofCoverageLimit": "dwelling"
                },
                "otherStructures": {
                  "_id": "5c912720d9fac4000ee8515e",
                  "amount": 5080,
                  "displayText": "Other Structures",
                  "format": "Currency",
                  "letterDesignation": "B"
                },
                "personalLiability": {
                  "_id": "5c912720d9fac4000ee85161",
                  "amount": 300000,
                  "displayText": "Personal Liability",
                  "format": "Currency",
                  "letterDesignation": "E"
                },
                "personalProperty": {
                  "_id": "5c912720d9fac4000ee8515f",
                  "amount": 63500,
                  "displayText": "Personal Property",
                  "format": "Currency",
                  "letterDesignation": "C"
                }
              },
              "coverageOptions": {
                "liabilityIncidentalOccupancies": {
                  "answer": false,
                  "displayText": "Liability Permitted Incidental Occupancies"
                },
                "personalPropertyReplacementCost": {
                  "answer": true,
                  "displayText": "Personal Property Replacement Cost"
                },
                "propertyIncidentalOccupanciesMainDwelling": {
                  "answer": false,
                  "displayText": "Property Permitted Incidental Occupancies Main Dwelling"
                },
                "propertyIncidentalOccupanciesOtherStructures": {
                  "answer": false,
                  "displayText": "Property Permitted Incidental Occupancies Other Structures"
                },
                "sinkholePerilCoverage": {
                  "answer": true,
                  "displayText": "Sinkhole Peril Coverage"
                }
              },
              "createdAt": "2019-03-19T17:30:08.076Z",
              "createdBy": {
                "_id": "5c912720d9fac4000ee85157",
                "userId": "auth0|594199c30b874417c3157ae1",
                "userName": "ttic-20000"
              },
              "deductibles": {
                "allOtherPerils": {
                  "amount": 1000,
                  "displayText": "All Other Perils",
                  "format": "Currency"
                },
                "hurricane": {
                  "amount": 2,
                  "calculatedAmount": 5080,
                  "displayText": "Hurricane",
                  "format": "Percentage",
                  "ofCoverageLimit": "dwelling"
                },
                "sinkhole": {
                  "amount": 10,
                  "calculatedAmount": 25400,
                  "displayText": "Sinkhole",
                  "format": "Percentage",
                  "ofCoverageLimit": "dwelling"
                }
              },
              "effectiveDate": "2019-04-03T04:00:00.000Z",
              "endDate": "2020-04-03T04:00:00.000Z",
              "policyHolders": [
                {
                  "_id": "5c91272ad9fac4000ee85184",
                  "electronicDelivery": false,
                  "emailAddress": "exzeoqa@exzeo.com",
                  "entityType": "Person",
                  "firstName": "BATMAN",
                  "lastName": "ROBIN A003",
                  "order": 0,
                  "primaryPhoneNumber": "7271231234"
                }
              ],
              "product": "HO3",
              "property": {
                "_id": "5c912720d9fac4000ee85159",
                "buildingCodeEffectivenessGrading": 99,
                "burglarAlarm": false,
                "constructionType": "FRAME",
                "distanceToFireStation": 2.1,
                "distanceToTidalWater": 2164.8,
                "divingBoard": false,
                "familyUnits": "1-2",
                "fireAlarm": false,
                "floodZone": "X",
                "gatedCommunity": false,
                "id": "12000000000000003",
                "physicalAddress": {
                  "_id": "5c912720d9fac4000ee8515a",
                  "address1": "2600 TEST ADDRESS",
                  "address2": "",
                  "city": "FERNANDINA BEACH",
                  "county": "NASSAU",
                  "latitude": 30.60876,
                  "longitude": -81.44811,
                  "state": "FL",
                  "zip": "00003"
                },
                "pool": false,
                "poolSecured": false,
                "protectionClass": 5,
                "residenceType": "SINGLE FAMILY",
                "source": "CasaClue",
                "sprinkler": "N",
                "squareFeet": 2144,
                "territory": "532-0",
                "timezone": "America/New_York",
                "townhouseRowhouse": false,
                "trampoline": false,
                "windMitigation": {
                  "_id": "5c912720d9fac4000ee8515b",
                  "floridaBuildingCodeWindSpeed": 120,
                  "floridaBuildingCodeWindSpeedDesign": 120,
                  "internalPressureDesign": "Other",
                  "openingProtection": "Other",
                  "roofCovering": "Other",
                  "roofDeckAttachment": "Other",
                  "roofGeometry": "Other",
                  "roofToWallConnection": "Other",
                  "secondaryWaterResistance": "Other",
                  "terrain": "B",
                  "windBorneDebrisRegion": "Yes"
                },
                "yearBuilt": 1981,
                "yearOfRoof": null
              },
              "quoteNumber": "12-5160868-01",
              "quoteState": "Quote Started",
              "state": "FL",
              "underwritingAnswers": {
                "floodCoverage": {
                  "answer": "Yes",
                  "question": "Does this property have a separate insurance policy covering flood losses?",
                  "source": "Default"
                },
                "noPriorInsuranceSurcharge": {
                  "answer": "No",
                  "question": "If not new purchase, please provide proof of prior insurance.",
                  "source": "Default"
                }
              },
              "underwritingExceptions": [
                {
                  "_id": "5c91272bd7bd33000e9f4e86",
                  "action": "Missing Info",
                  "active": true,
                  "agentMessage": "Missing required information to complete quote - Underwriting Info",
                  "canOverride": false,
                  "category": "Property",
                  "code": "002",
                  "displayText": "Missing Info - Underwriting Info",
                  "fields": [],
                  "internalMessage": "Missing required information to complete quote - Underwriting Info",
                  "overridden": false,
                  "overriddenAt": null,
                  "overriddenBy": {
                    "_id": "5c91272bd7bd33000e9f4e87",
                    "userId": null,
                    "userName": null
                  }
                },
                {
                  "_id": "5c91272bd7bd33000e9f4e84",
                  "action": "Missing Info",
                  "active": true,
                  "agentMessage": "Missing required information to complete quote -  Mailing/Billing Info",
                  "canOverride": false,
                  "category": "Coverages & Deductibles",
                  "code": "003",
                  "displayText": "Missing Info - Mailing/Billing Info",
                  "fields": [],
                  "internalMessage": "Missing required information to complete quote -  Mailing/Billing Info",
                  "overridden": false,
                  "overriddenAt": null,
                  "overriddenBy": {
                    "_id": "5c91272bd7bd33000e9f4e85",
                    "userId": null,
                    "userName": null
                  }
                }
              ],
              "updatedAt": "2019-03-19T17:30:19.004Z",
              "updatedBy": {
                "_id": "5c91272bd7bd33000e9f4e88",
                "userId": "auth0|594199c30b874417c3157ae1",
                "userName": "ttic-20000"
              }
            },
            "status": 200,
            "timeTookByEndpoint": 70
          }
        },
        {
          "name": "dsUrl",
          "value": "https://api.harmony-ins.com/ds"
        },
        {
          "name": "singleQuote",
          "value": {
            "message": "success",
            "result": {
              "__v": 0,
              "_id": "5c912720d9fac4000ee85156",
              "additionalInterests": [],
              "agencyCode": 20000,
              "agentCode": 60000,
              "billToId": "",
              "billToType": "Policyholder",
              "companyCode": "TTIC",
              "coverageLimits": {
                "_id": "5c912720d9fac4000ee8515c",
                "dwelling": {
                  "_id": "5c912720d9fac4000ee8515d",
                  "amount": 254000,
                  "displayText": "Dwelling",
                  "format": "Currency",
                  "letterDesignation": "A",
                  "maxAmount": 330000,
                  "minAmount": 229000
                },
                "lossOfUse": {
                  "_id": "5c912720d9fac4000ee85160",
                  "amount": 25400,
                  "displayText": "Loss of Use",
                  "format": "Currency",
                  "letterDesignation": "D"
                },
                "medicalPayments": {
                  "_id": "5c912720d9fac4000ee85162",
                  "amount": 2000,
                  "displayText": "Medical Payments",
                  "format": "Currency",
                  "letterDesignation": "F"
                },
                "moldLiability": {
                  "_id": "5c912720d9fac4000ee85165",
                  "amount": 50000,
                  "displayText": "Mold Liability",
                  "format": "Currency"
                },
                "moldProperty": {
                  "_id": "5c912720d9fac4000ee85164",
                  "amount": 10000,
                  "displayText": "Mold Property",
                  "format": "Currency"
                },
                "ordinanceOrLaw": {
                  "_id": "5c912720d9fac4000ee85163",
                  "amount": 25,
                  "displayText": "Ordinance or Law",
                  "format": "Percentage",
                  "ofCoverageLimit": "dwelling"
                },
                "otherStructures": {
                  "_id": "5c912720d9fac4000ee8515e",
                  "amount": 5080,
                  "displayText": "Other Structures",
                  "format": "Currency",
                  "letterDesignation": "B"
                },
                "personalLiability": {
                  "_id": "5c912720d9fac4000ee85161",
                  "amount": 300000,
                  "displayText": "Personal Liability",
                  "format": "Currency",
                  "letterDesignation": "E"
                },
                "personalProperty": {
                  "_id": "5c912720d9fac4000ee8515f",
                  "amount": 63500,
                  "displayText": "Personal Property",
                  "format": "Currency",
                  "letterDesignation": "C"
                }
              },
              "coverageOptions": {
                "liabilityIncidentalOccupancies": {
                  "answer": false,
                  "displayText": "Liability Permitted Incidental Occupancies"
                },
                "personalPropertyReplacementCost": {
                  "answer": true,
                  "displayText": "Personal Property Replacement Cost"
                },
                "propertyIncidentalOccupanciesMainDwelling": {
                  "answer": false,
                  "displayText": "Property Permitted Incidental Occupancies Main Dwelling"
                },
                "propertyIncidentalOccupanciesOtherStructures": {
                  "answer": false,
                  "displayText": "Property Permitted Incidental Occupancies Other Structures"
                },
                "sinkholePerilCoverage": {
                  "answer": true,
                  "displayText": "Sinkhole Peril Coverage"
                }
              },
              "createdAt": "2019-03-19T17:30:08.076Z",
              "createdBy": {
                "_id": "5c912720d9fac4000ee85157",
                "userId": "auth0|594199c30b874417c3157ae1",
                "userName": "ttic-20000"
              },
              "deductibles": {
                "allOtherPerils": {
                  "amount": 1000,
                  "displayText": "All Other Perils",
                  "format": "Currency"
                },
                "hurricane": {
                  "amount": 2,
                  "calculatedAmount": 5080,
                  "displayText": "Hurricane",
                  "format": "Percentage",
                  "ofCoverageLimit": "dwelling"
                },
                "sinkhole": {
                  "amount": 10,
                  "calculatedAmount": 25400,
                  "displayText": "Sinkhole",
                  "format": "Percentage",
                  "ofCoverageLimit": "dwelling"
                }
              },
              "effectiveDate": "2019-04-03T04:00:00.000Z",
              "endDate": "2020-04-03T04:00:00.000Z",
              "policyHolders": [
                {
                  "_id": "5c91272ad9fac4000ee85184",
                  "electronicDelivery": false,
                  "emailAddress": "exzeoqa@exzeo.com",
                  "entityType": "Person",
                  "firstName": "BATMAN",
                  "lastName": "ROBIN A003",
                  "order": 0,
                  "primaryPhoneNumber": "7271231234"
                }
              ],
              "product": "HO3",
              "property": {
                "_id": "5c912720d9fac4000ee85159",
                "buildingCodeEffectivenessGrading": 99,
                "burglarAlarm": false,
                "constructionType": "FRAME",
                "distanceToFireStation": 2.1,
                "distanceToTidalWater": 2164.8,
                "divingBoard": false,
                "familyUnits": "1-2",
                "fireAlarm": false,
                "floodZone": "X",
                "gatedCommunity": false,
                "id": "12000000000000003",
                "physicalAddress": {
                  "_id": "5c912720d9fac4000ee8515a",
                  "address1": "2600 TEST ADDRESS",
                  "address2": "",
                  "city": "FERNANDINA BEACH",
                  "county": "NASSAU",
                  "latitude": 30.60876,
                  "longitude": -81.44811,
                  "state": "FL",
                  "zip": "00003"
                },
                "pool": false,
                "poolSecured": false,
                "protectionClass": 5,
                "residenceType": "SINGLE FAMILY",
                "source": "CasaClue",
                "sprinkler": "N",
                "squareFeet": 2144,
                "territory": "532-0",
                "timezone": "America/New_York",
                "townhouseRowhouse": false,
                "trampoline": false,
                "windMitigation": {
                  "_id": "5c912720d9fac4000ee8515b",
                  "floridaBuildingCodeWindSpeed": 120,
                  "floridaBuildingCodeWindSpeedDesign": 120,
                  "internalPressureDesign": "Other",
                  "openingProtection": "Other",
                  "roofCovering": "Other",
                  "roofDeckAttachment": "Other",
                  "roofGeometry": "Other",
                  "roofToWallConnection": "Other",
                  "secondaryWaterResistance": "Other",
                  "terrain": "B",
                  "windBorneDebrisRegion": "Yes"
                },
                "yearBuilt": 1981,
                "yearOfRoof": null
              },
              "quoteNumber": "12-5160868-01",
              "quoteState": "Quote Started",
              "state": "FL",
              "underwritingAnswers": {
                "floodCoverage": {
                  "answer": "Yes",
                  "question": "Does this property have a separate insurance policy covering flood losses?",
                  "source": "Default"
                },
                "noPriorInsuranceSurcharge": {
                  "answer": "No",
                  "question": "If not new purchase, please provide proof of prior insurance.",
                  "source": "Default"
                }
              },
              "underwritingExceptions": [
                {
                  "_id": "5c91272bd7bd33000e9f4e86",
                  "action": "Missing Info",
                  "active": true,
                  "agentMessage": "Missing required information to complete quote - Underwriting Info",
                  "canOverride": false,
                  "category": "Property",
                  "code": "002",
                  "displayText": "Missing Info - Underwriting Info",
                  "fields": [],
                  "internalMessage": "Missing required information to complete quote - Underwriting Info",
                  "overridden": false,
                  "overriddenAt": null,
                  "overriddenBy": {
                    "_id": "5c91272bd7bd33000e9f4e87",
                    "userId": null,
                    "userName": null
                  }
                },
                {
                  "_id": "5c91272bd7bd33000e9f4e84",
                  "action": "Missing Info",
                  "active": true,
                  "agentMessage": "Missing required information to complete quote -  Mailing/Billing Info",
                  "canOverride": false,
                  "category": "Coverages & Deductibles",
                  "code": "003",
                  "displayText": "Missing Info - Mailing/Billing Info",
                  "fields": [],
                  "internalMessage": "Missing required information to complete quote -  Mailing/Billing Info",
                  "overridden": false,
                  "overriddenAt": null,
                  "overriddenBy": {
                    "_id": "5c91272bd7bd33000e9f4e85",
                    "userId": null,
                    "userName": null
                  }
                }
              ],
              "updatedAt": "2019-03-19T17:30:19.004Z",
              "updatedBy": {
                "_id": "5c91272bd7bd33000e9f4e88",
                "userId": "auth0|594199c30b874417c3157ae1",
                "userName": "ttic-20000"
              }
            },
            "status": 200,
            "timeTookByEndpoint": 21
          }
        },
        {
          "name": "getActiveAgents",
          "value": {
            "message": "Successful",
            "result": [
              {
                "_id": "5b97e6a6968a4b75eea82592",
                "agencyCode": 20000,
                "agentCode": 60000,
                "agentOfRecord": true,
                "appointed": true,
                "companyCode": "TTIC",
                "createdAt": "2016-02-03T14:44:06.183Z",
                "createdBy": "LOAD",
                "emailAddress": "test@typtap.com",
                "faxNumber": "",
                "firstName": "WALLY",
                "lastName": "WAGONER",
                "licenseNumber": "W180087",
                "mailingAddress": {
                  "address1": "3001 S.E. MARICAMP ROAD",
                  "address2": "",
                  "city": "OCALA",
                  "state": "FL",
                  "zip": "34471"
                },
                "physicalAddress": {
                  "address1": "3001 S.E. MARICAMP ROAD",
                  "city": "OCALA",
                  "state": "FL",
                  "zip": "34471"
                },
                "primaryPhoneNumber": "3525099008",
                "secondaryPhoneNumber": null,
                "state": "FL",
                "status": "Active",
                "updatedAt": "2019-02-28T16:30:38.384Z",
                "updatedBy": "tticcsr"
              },
              {
                "_id": "5bfc4ed82d488d00288fc24b",
                "agencyCode": 20000,
                "agentCode": -1234567890,
                "agentOfRecord": true,
                "appointed": true,
                "companyCode": "TTIC",
                "createdAt": "2018-11-26T19:51:52.970Z",
                "createdBy": "tticcsr",
                "emailAddress": "jsutphin@exzeo.com",
                "firstName": "test",
                "lastName": "test",
                "licenseNumber": "1234567890",
                "mailingAddress": {
                  "address1": "123 Cypress",
                  "city": "Tampa",
                  "state": "FL",
                  "zip": "555555"
                },
                "primaryPhoneNumber": "5555555555",
                "state": "FL",
                "status": "Active",
                "updatedAt": "2019-03-19T17:11:16.871Z",
                "updatedBy": "mryan1"
              }
            ],
            "status": 200,
            "timeTookByEndpoint": 46
          }
        },
        {
          "name": "getFirstZipCodeFromArrayForPDF",
          "value": {
            "_id": "5aea142cdc0509268ca5ce77",
            "availableSlots": 155,
            "coastal": true,
            "companyCode": "TTIC",
            "coverageLimits": {
              "dwelling": {
                "maxAmount": 750000,
                "maxReplacementCostRatio": 1.3,
                "minAmount": 125000,
                "minReplacementCostRatio": 0.9
              },
              "personalLiability": {
                "defaultAmount": 300000
              },
              "personalProperty": {
                "maxAmount": 400000,
                "minAmount": 0
              }
            },
            "coverageOptions": {
              "personalPropertyReplacementCost": {
                "defaultAnswer": true
              },
              "sinkholePerilCoverage": {
                "defaultAnswer": true
              }
            },
            "id": "5aea142cdc0509268ca5ce77",
            "latitude": 30.62019,
            "longitude": -81.50562,
            "maxClaims": 1,
            "maxEffectiveDate": "2019-06-17T00:00:00-04:00",
            "maxNetPremium": 20000,
            "maxProtectionClass": 8,
            "maxWaitingPeriod": 90,
            "maxYearBuilt": 2016,
            "minCostPer100": 0.1,
            "minEffectiveDate": "2019-03-19T00:00:00-04:00",
            "minLossRatio": 1.1,
            "minNetPremium": 700,
            "minWaitingPeriod": 0,
            "minYearBuilt": 1900,
            "product": "HO3",
            "state": "FL",
            "suspended": false,
            "territories": [
              "532-0",
              "532-69",
              "892-0"
            ],
            "timezone": "America/New_York",
            "zip": "00003"
          }
        },
        {
          "name": "transactionSpec",
          "value": {
            "transactionSpec": {
              "groups": {
                "coverage": {
                  "label": "Coverage Info"
                },
                "mailingbilling": {
                  "label": "Mailing/Billing Info"
                },
                "underwriting": {
                  "label": "Underwriting Info"
                }
              },
              "properties": {
                "_id": {
                  "group": "coverage"
                },
                "agencyCode": {
                  "group": "coverage"
                },
                "agentCode": {
                  "group": "coverage"
                },
                "billPlan": {
                  "group": "mailingbilling"
                },
                "billToId": {
                  "group": "mailingbilling"
                },
                "billToType": {
                  "group": "mailingbilling"
                },
                "companyCode": {
                  "group": "coverage"
                },
                "coverageLimits": {
                  "group": "coverage",
                  "minProperties": 1
                },
                "coverageOptions": {
                  "group": "coverage",
                  "minProperties": 1
                },
                "deductibles": {
                  "group": "coverage",
                  "minProperties": 1
                },
                "effectiveDate": {
                  "group": "coverage"
                },
                "endDate": {
                  "group": "coverage"
                },
                "policyHolderMailingAddress": {
                  "group": "mailingbilling",
                  "minProperties": 1
                },
                "policyHolders": {
                  "group": "coverage",
                  "minItems": 1
                },
                "product": {
                  "group": "coverage"
                },
                "property": {
                  "group": "coverage",
                  "minProperties": 1
                },
                "quoteNumber": {
                  "group": "coverage"
                },
                "rating": {
                  "group": "underwriting",
                  "minProperties": 1
                },
                "state": {
                  "group": "coverage"
                },
                "underwritingAnswers": {
                  "group": "underwriting",
                  "minProperties": 1
                }
              },
              "required": [
                "underwritingAnswers",
                "billPlan",
                "billToId",
                "quoteNumber",
                "policyHolders",
                "endDate",
                "state",
                "_id",
                "agencyCode",
                "coverageLimits",
                "companyCode",
                "policyHolderMailingAddress",
                "coverageOptions",
                "deductibles",
                "rating",
                "effectiveDate",
                "property",
                "agentCode",
                "product"
              ],
              "type": "object"
            }
          }
        }
      ]
    }
};

const MOCK_COMPLETE_ASK_CG_DATA = {

};

const MOCK_QUOTE =  {
  "_id": "5c912720d9fac4000ee85156",
  "agencyCode": 20000,
  "companyCode": "TTIC",
  "state": "FL",
  "product": "HO3",
  "quoteNumber": "12-5160868-01",
  "effectiveDate": "2019-04-03T04:00:00.000Z",
  "endDate": "2020-04-03T04:00:00.000Z",
  "quoteState": "Quote Started",
  "createdAt": "2019-03-19T17:30:08.076Z",
  "updatedAt": "2019-03-19T18:04:13.268Z",
  "createdBy": {
    "_id": "5c912720d9fac4000ee85157",
    "userId": "auth0|594199c30b874417c3157ae1",
    "userName": "ttic-20000"
  },
  "updatedBy": {
    "_id": "5c912f1dd9fac4000ee87413",
    "userId": "auth0|59419e3a43e76f16f68c3349",
    "userName": "tticcsr"
  },
  "billToId": "",
  "billToType": "Policyholder",
  "property": {
    "townhouseRowhouse": false,
    "pool": false,
    "poolSecured": false,
    "divingBoard": false,
    "trampoline": false,
    "fireAlarm": false,
    "burglarAlarm": false,
    "gatedCommunity": false,
    "_id": "5c912720d9fac4000ee85159",
    "id": "12000000000000003",
    "source": "CasaClue",
    "physicalAddress": {
      "_id": "5c912720d9fac4000ee8515a",
      "address1": "2600 TEST ADDRESS",
      "address2": "",
      "city": "FERNANDINA BEACH",
      "state": "FL",
      "county": "NASSAU",
      "zip": "00003",
      "latitude": 30.60876,
      "longitude": -81.44811
    },
    "residenceType": "SINGLE FAMILY",
    "yearBuilt": 1981,
    "constructionType": "FRAME",
    "territory": "532-0",
    "protectionClass": 5,
    "buildingCodeEffectivenessGrading": 99,
    "familyUnits": "1-2",
    "squareFeet": 2144,
    "yearOfRoof": null,
    "timezone": "America/New_York",
    "sprinkler": "N",
    "floodZone": "X",
    "distanceToTidalWater": 2164.8,
    "distanceToFireStation": 2.1,
    "windMitigation": {
      "_id": "5c912720d9fac4000ee8515b",
      "roofGeometry": "Other",
      "roofCovering": "Other",
      "roofDeckAttachment": "Other",
      "roofToWallConnection": "Other",
      "secondaryWaterResistance": "Other",
      "openingProtection": "Other",
      "floridaBuildingCodeWindSpeed": 120,
      "floridaBuildingCodeWindSpeedDesign": 120,
      "windBorneDebrisRegion": "Yes",
      "internalPressureDesign": "Other",
      "terrain": "B"
    }
  },
  "coverageLimits": {
    "_id": "5c912720d9fac4000ee8515c",
    "dwelling": {
      "_id": "5c912720d9fac4000ee8515d",
      "displayText": "Dwelling",
      "amount": 254000,
      "letterDesignation": "A",
      "format": "Currency",
      "minAmount": 229000,
      "maxAmount": 330000
    },
    "otherStructures": {
      "_id": "5c912720d9fac4000ee8515e",
      "displayText": "Other Structures",
      "letterDesignation": "B",
      "amount": 5080,
      "format": "Currency"
    },
    "personalProperty": {
      "_id": "5c912720d9fac4000ee8515f",
      "displayText": "Personal Property",
      "letterDesignation": "C",
      "amount": 63500,
      "format": "Currency"
    },
    "lossOfUse": {
      "_id": "5c912720d9fac4000ee85160",
      "displayText": "Loss of Use",
      "letterDesignation": "D",
      "amount": 25400,
      "format": "Currency"
    },
    "personalLiability": {
      "_id": "5c912720d9fac4000ee85161",
      "displayText": "Personal Liability",
      "letterDesignation": "E",
      "amount": 300000,
      "format": "Currency"
    },
    "medicalPayments": {
      "_id": "5c912720d9fac4000ee85162",
      "displayText": "Medical Payments",
      "letterDesignation": "F",
      "amount": 2000,
      "format": "Currency"
    },
    "ordinanceOrLaw": {
      "_id": "5c912720d9fac4000ee85163",
      "displayText": "Ordinance or Law",
      "amount": 25,
      "format": "Percentage",
      "ofCoverageLimit": "dwelling"
    },
    "moldProperty": {
      "_id": "5c912720d9fac4000ee85164",
      "displayText": "Mold Property",
      "amount": 10000,
      "format": "Currency"
    },
    "moldLiability": {
      "_id": "5c912720d9fac4000ee85165",
      "displayText": "Mold Liability",
      "amount": 50000,
      "format": "Currency"
    }
  },
  "coverageOptions": {
    "sinkholePerilCoverage": {
      "displayText": "Sinkhole Peril Coverage",
      "answer": true
    },
    "personalPropertyReplacementCost": {
      "displayText": "Personal Property Replacement Cost",
      "answer": true
    },
    "propertyIncidentalOccupanciesMainDwelling": {
      "displayText": "Property Permitted Incidental Occupancies Main Dwelling",
      "answer": false
    },
    "propertyIncidentalOccupanciesOtherStructures": {
      "displayText": "Property Permitted Incidental Occupancies Other Structures",
      "answer": false
    },
    "liabilityIncidentalOccupancies": {
      "displayText": "Liability Permitted Incidental Occupancies",
      "answer": false
    }
  },
  "deductibles": {
    "hurricane": {
      "displayText": "Hurricane",
      "amount": 2,
      "format": "Percentage",
      "ofCoverageLimit": "dwelling",
      "calculatedAmount": 5080
    },
    "allOtherPerils": {
      "displayText": "All Other Perils",
      "amount": 1000,
      "format": "Currency"
    },
    "sinkhole": {
      "displayText": "Sinkhole",
      "amount": 10,
      "format": "Percentage",
      "ofCoverageLimit": "dwelling",
      "calculatedAmount": 25400
    }
  },
  "underwritingAnswers": {
    "noPriorInsuranceSurcharge": {
      "question": "If not new purchase, please provide proof of prior insurance.",
      "answer": "No",
      "source": "Default"
    },
    "floodCoverage": {
      "question": "Does this property have a separate insurance policy covering flood losses?",
      "answer": "Yes",
      "source": "Default"
    }
  },
  "additionalInterests": [],
  "policyHolders": [
    {
      "electronicDelivery": false,
      "_id": "5c91272ad9fac4000ee85184",
      "emailAddress": "exzeoqa@exzeo.com",
      "entityType": "Person",
      "firstName": "BATMAN",
      "lastName": "ROBIN A003",
      "order": 0,
      "primaryPhoneNumber": "7271231234"
    }
  ],
  "underwritingExceptions": [
    {
      "fields": [],
      "_id": "5c912f1dd9fac4000ee87411",
      "action": "Missing Info",
      "active": true,
      "agentMessage": "Missing required information to complete quote - Underwriting Info",
      "canOverride": false,
      "category": "Property",
      "code": "002",
      "displayText": "Missing Info - Underwriting Info",
      "internalMessage": "Missing required information to complete quote - Underwriting Info",
      "overridden": false,
      "overriddenAt": null,
      "overriddenBy": {
        "_id": "5c912f1dd9fac4000ee87412",
        "userId": null,
        "userName": null
      }
    },
    {
      "fields": [],
      "_id": "5c912f1dd9fac4000ee8740f",
      "action": "Missing Info",
      "active": true,
      "agentMessage": "Missing required information to complete quote -  Mailing/Billing Info",
      "canOverride": false,
      "category": "Coverages & Deductibles",
      "code": "003",
      "displayText": "Missing Info - Mailing/Billing Info",
      "internalMessage": "Missing required information to complete quote -  Mailing/Billing Info",
      "overridden": false,
      "overriddenAt": null,
      "overriddenBy": {
        "_id": "5c912f1dd9fac4000ee87410",
        "userId": null,
        "userName": null
      }
    }
  ],
  "__v": 0,
  "agentCode": 60000
};

describe('Choreographer tests', () => {

  let sandbox = null;

  beforeEach(() => {
    sandbox = sinon.sandbox.create();

    const data = { dsUrl: `${process.env.REACT_APP_API_URL}/ds` };

    const mockAdapter = new MockAdapter(axios);

    const axiosOptionsStart = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      url: `${process.env.REACT_APP_API_URL}/cg/start?${MOCK_START_CG_DATA.modelName}`,
      data: {
        modelName: MOCK_START_CG_DATA.modelName,
        data
      }
    };

    const axiosOptionsCompleteSearch = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      url: `${process.env.REACT_APP_API_URL}/cg/complete?search`,
      data: {"workflowId":"3290730","stepName":"search","data":{"quoteNumber":"12-5160868-01","searchType":"quote"}}
    };

    const axiosOptionsCompleteChoose = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      url: `${process.env.REACT_APP_API_URL}/cg/complete?chooseAddress`,
      data: {"workflowId":"3290730","stepName":"chooseQuote","data":{"quoteId":"5c912720d9fac4000ee85156"}}
    };

    const axiosOptionsCompleteAsk = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      url: `${process.env.REACT_APP_API_URL}/cg/complete?askAdditionalCustomerData`,
      data: {
        "workflowId": "3294563",
        "stepName": "askAdditionalCustomerData",
        "data": {
          "primaryPolicyHolder": "",
          "FirstName": "BATMAN",
          "LastName": "ROBIN A003",
          "EmailAddress": "exzeoqa@exzeo.com",
          "phoneNumber": "7271231234",
          "electronicDelivery": false,
          "isAdditional": "",
          "secondaryPolicyHolder": "",
          "FirstName2": "",
          "LastName2": "",
          "EmailAddress2": "",
          "phoneNumber2": "",
          "policyHolderDetails": "",
          "effectiveDate": "2019-04-03T00:00:00-04:00",
          "agentCode": "60000"
        }
      }
    };

    const axiosOptionsGetQuote = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      url: `${process.env.REACT_APP_API_URL}/svc?getQuoteServiceRequest`,
      data: {
        service: 'quote-data',
        method: 'GET',
        path: MOCK_QUOTE.quoteNumber
      }
    };

    mockAdapter.onPost(axiosOptionsStart.url, axiosOptionsStart.data).reply(200, {
      data: MOCK_START_CG_DATA
    });

    mockAdapter.onPost(axiosOptionsCompleteSearch.url, axiosOptionsCompleteSearch.data).reply(200, {
      data: MOCK_COMPLETE_SEARCH_CG_DATA
    });

    mockAdapter.onPost(axiosOptionsCompleteChoose.url, axiosOptionsCompleteChoose.data).reply(200, {
      data: MOCK_COMPLETE_CHOOSE_CG_DATA
    });

    mockAdapter.onPost(axiosOptionsCompleteAsk.url, axiosOptionsCompleteAsk.data).reply(200, {
      data: MOCK_COMPLETE_ASK_CG_DATA
    });

    mockAdapter.onPost(axiosOptionsGetQuote.url, axiosOptionsGetQuote.data).reply(200, {
      data: {
        result: MOCK_QUOTE
      }
    });
  });

  afterEach(() => {
    sandbox.restore()
  });

  describe('test createQuote', () => {

    it('called createQuote', () => {
      const result = sinon.spy(choreographer, 'createQuote');

      choreographer.createQuote('123 Main St', '12345', 'FL');
      sinon.assert.calledOnce(result);
      sinon.assert.calledWith(result, '123 Main St', '12345', 'FL');
    });
  });

  describe('test updateQuote', () => {

    it('called updateQuote', () => {
      const result = sinon.spy(choreographer, 'updateQuote');
      const submitData = {
          data: MOCK_QUOTE,
          stepName: MOCK_COMPLETE_ASK_CG_DATA.activeTask,
          getReduxState: x => x,
          options: [],
          quoteNumber: MOCK_QUOTE.quoteNumber
       };
     choreographer.updateQuote(submitData);
     sinon.assert.calledOnce(result);
     sinon.assert.calledWith(result, submitData);
    });
  });

  describe('test getQuote', () => {

    it('called getQuote', () => {
      const result = sinon.spy(choreographer, 'getQuote');
     choreographer.getQuote(MOCK_QUOTE.quoteNumber, MOCK_QUOTE._id);
     sinon.assert.calledOnce(result);
     sinon.assert.calledWith(result, MOCK_QUOTE.quoteNumber, MOCK_QUOTE._id);
    });
  });
});
