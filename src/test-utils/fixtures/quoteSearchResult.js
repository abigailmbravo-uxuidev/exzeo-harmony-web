export default {
  totalNumberOfRecords: 1,
  currentPage: 1,
  pageSize: 25,
  sort: 'quoteNumber',
  sortDirection: -1,
  quotes: [
    {
      _id: '5e0f43f970342817a034ef22',
      companyCode: 'TTIC',
      state: 'FL',
      product: 'AF3',
      quoteNumber: 'TTIC-AF3-280189-1',
      effectiveDate: '2020-01-31T05:00:00.000Z',
      quoteState: 'Application Sent DocuSign',
      property: {
        physicalAddress: {
          _id: '5e0f43f970342817a034ef24',
          address1: '19333 MIDWAY BLVD',
          address2: '',
          city: 'PORT CHARLOTTE',
          county: 'CHARLOTTE',
          state: 'FL',
          zip: '33948'
        },
        coverageLimits: {
          dwelling: {
            format: 'Currency',
            amount: 276100,
            displayText: 'Dwelling'
          }
        },
        residenceType: 'SINGLE FAMILY',
        source: 'CasaClue',
        floodterritory: '25000',
        timezone: 'America/New_York',
        windMitigation: {},
        yearBuilt: 1989,
        yearOfRoof: 0,
        FEMAfloodZone: 'AE'
      },
      policyHolders: [
        {
          electronicDelivery: false,
          _id: '5e0f43fa70342817a034ef27',
          emailAddress: 'DataMigration@typtap.com',
          entityType: 'Person',
          firstName: 'Home',
          lastName: 'Buyer',
          order: 0,
          primaryPhoneNumber: '9414841234',
          secondaryPhoneNumber: ''
        }
      ],
      rating: {
        totalPremium: 1357
      }
    }
  ]
};
