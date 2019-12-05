import Auth from './Auth';

describe('Auth', () => {
  describe('getProfile', () => {
    it('should pull all fields of auth id token', () => {
      const userData = {
        userId: 'auth0|5cace111965e901112a8515b',
        userName: 'af3beta',
        userType: 'internal',
        email: 'relkins_exzeo@gmail.com',
        profile: {
          groups: [
            {
              name: 'TTICCSR',
              agencyCode: '',
              companyCode: 'TTIC',
              state: 'FL',
              isCSR: true,
              isAgency: false,
              extendedProperties: {
                isAgency: false,
                isCSR: true,
                agencyId: '',
                agencyCode: '',
                state: 'FL',
                companyCode: 'TTIC',
                harmonyGroup: true
              },
              roles: [],
              childGroups: [],
              __v: 0
            }
          ],
          beta: true,
          given_name: 'AF3',
          family_name: 'Beta'
        },
        resources: [
          {
            right: 'READ',
            uri: 'PolicyData:Transactions:*',
            conditions: [{ csp: 'TTIC:FL:HO3' }, { csp: 'TTIC:FL:AF3' }]
          },
          { right: 'READ', uri: 'TTIC:FL:HO3:PolicyData:Transactions:*' },
          {
            right: 'UPDATE',
            uri: 'PolicyData:Transactions:*',
            conditions: [{ csp: 'TTIC:FL:HO3' }, { csp: 'TTIC:FL:AF3' }]
          },
          { right: 'UPDATE', uri: 'TTIC:FL:HO3:PolicyData:Transactions:*' },
          {
            right: 'INSERT',
            uri: 'PolicyData:Transactions:*',
            conditions: [{ csp: 'TTIC:FL:HO3' }, { csp: 'TTIC:FL:AF3' }]
          },
          { right: 'INSERT', uri: 'TTIC:FL:HO3:PolicyData:Transactions:*' },
          {
            right: 'UPDATE',
            uri: 'PolicyData:PremiumEndorse',
            conditions: [{ csp: 'TTIC:FL:HO3' }, { csp: 'TTIC:FL:AF3' }]
          },
          { right: 'UPDATE', uri: 'TTIC:FL:HO3:PolicyData:PremiumEndorse' },
          {
            right: 'READ',
            uri: 'QuoteData:Quotes:*',
            conditions: [{ csp: 'TTIC:FL:HO3' }, { csp: 'TTIC:FL:AF3' }]
          },
          { right: 'READ', uri: 'TTIC:FL:HO3:QuoteData:Quotes:*' },
          {
            right: 'READ',
            uri: 'Quotes:*',
            conditions: [{ csp: 'TTIC:FL:HO3' }, { csp: 'TTIC:FL:AF3' }]
          },
          { right: 'READ', uri: 'TTIC:FL:HO3:Quotes:*' },
          {
            right: 'INSERT',
            uri: 'QuoteData:Quotes:*',
            conditions: [{ csp: 'TTIC:FL:HO3' }, { csp: 'TTIC:FL:AF3' }]
          },
          { right: 'INSERT', uri: 'TTIC:FL:HO3:QuoteData:Quotes:*' },
          {
            right: 'UPDATE',
            uri: 'QuoteData:Quotes:*',
            conditions: [{ csp: 'TTIC:FL:HO3' }, { csp: 'TTIC:FL:AF3' }]
          },
          { right: 'UPDATE', uri: 'TTIC:FL:HO3:QuoteData:Quotes:*' },
          {
            right: 'UPDATE',
            uri: 'Quotes:*',
            conditions: [{ csp: 'TTIC:FL:HO3' }, { csp: 'TTIC:FL:AF3' }]
          },
          { right: 'UPDATE', uri: 'TTIC:FL:HO3:Quotes:*' },
          {
            right: 'INSERT',
            uri: 'Quotes:*',
            conditions: [{ csp: 'TTIC:FL:HO3' }, { csp: 'TTIC:FL:AF3' }]
          },
          { right: 'INSERT', uri: 'TTIC:FL:HO3:Quotes:*' },
          {
            right: 'UPDATE',
            uri: 'PolicyData:Transactions:PolicyHolders:LastName',
            conditions: [{ csp: 'TTIC:FL:HO3' }, { csp: 'TTIC:FL:AF3' }]
          },
          {
            right: 'UPDATE',
            uri: 'TTIC:FL:HO3:PolicyData:Transactions:PolicyHolders:LastName'
          },
          {
            right: 'UPDATE',
            uri: 'PolicyData:Transactions:PolicyHolders:FirstName',
            conditions: [{ csp: 'TTIC:FL:HO3' }, { csp: 'TTIC:FL:AF3' }]
          },
          {
            right: 'UPDATE',
            uri: 'TTIC:FL:HO3:PolicyData:Transactions:PolicyHolders:FirstName'
          },
          {
            right: 'READ',
            uri: 'Billing:Payments:*',
            conditions: [{ csp: 'TTIC:FL:HO3' }, { csp: 'TTIC:FL:AF3' }]
          },
          { right: 'READ', uri: 'TTIC:FL:HO3:Billing:Payments:*' },
          {
            right: 'READ',
            uri: 'Payment:Payments:*',
            conditions: [{ csp: 'TTIC:FL:HO3' }, { csp: 'TTIC:FL:AF3' }]
          },
          { right: 'READ', uri: 'TTIC:FL:HO3:Payment:Payments:*' },
          {
            right: 'UPDATE',
            uri: 'PolicyData:Transactions:TransactionType:EffectiveDateChange',
            conditions: [{ csp: 'TTIC:FL:HO3' }, { csp: 'TTIC:FL:AF3' }]
          },
          {
            right: 'UPDATE',
            uri:
              'TTIC:FL:HO3:PolicyData:Transactions:TransactionType:EffectiveDateChange'
          },
          {
            right: 'UPDATE',
            uri: 'PolicyData:Transactions:Property',
            conditions: [{ csp: 'TTIC:FL:HO3' }, { csp: 'TTIC:FL:AF3' }]
          },
          {
            right: 'UPDATE',
            uri: 'TTIC:FL:HO3:PolicyData:Transactions:Property'
          },
          {
            right: 'UPDATE',
            uri: 'PolicyData:Transactions:TransactionType:Endorsement',
            conditions: [{ csp: 'TTIC:FL:HO3' }, { csp: 'TTIC:FL:AF3' }]
          },
          {
            right: 'UPDATE',
            uri:
              'TTIC:FL:HO3:PolicyData:Transactions:TransactionType:Endorsement'
          },
          {
            right: 'READ',
            uri: 'Diaries:DiariesService:*',
            conditions: [{ csp: 'TTIC:FL:HO3' }, { csp: 'TTIC:FL:AF3' }]
          },
          { right: 'READ', uri: 'TTIC:FL:HO3:Diaries:DiariesService:*' },
          {
            right: 'INSERT',
            uri: 'Diaries:DiariesService:*',
            conditions: [{ csp: 'TTIC:FL:HO3' }, { csp: 'TTIC:FL:AF3' }]
          },
          { right: 'INSERT', uri: 'TTIC:FL:HO3:Diaries:DiariesService:*' },
          {
            right: 'UPDATE',
            uri: 'Diaries:DiariesService:*',
            conditions: [{ csp: 'TTIC:FL:HO3' }, { csp: 'TTIC:FL:AF3' }]
          },
          { right: 'UPDATE', uri: 'TTIC:FL:HO3:Diaries:DiariesService:*' },
          {
            right: 'READ',
            uri: 'Agency:Agencies:*',
            conditions: [{ csp: 'TTIC:FL:HO3' }, { csp: 'TTIC:FL:AF3' }]
          },
          { right: 'READ', uri: 'TTIC:FL:HO3:Agency:Agencies:*' },
          {
            right: 'READ',
            uri: 'Agency:Agents:*',
            conditions: [{ csp: 'TTIC:FL:HO3' }, { csp: 'TTIC:FL:AF3' }]
          },
          { right: 'READ', uri: 'TTIC:FL:HO3:Agency:Agents:*' },
          {
            right: 'UPDATE',
            uri:
              'PolicyData:Transactions:TransactionType:UnderwritingCancellation',
            conditions: [{ csp: 'TTIC:FL:HO3' }, { csp: 'TTIC:FL:AF3' }]
          },
          {
            right: 'UPDATE',
            uri:
              'TTIC:FL:HO3:PolicyData:Transactions:TransactionType:UnderwritingCancellation'
          },
          {
            right: 'UPDATE',
            uri:
              'PolicyData:Transactions:TransactionType:UnderwritingNonRenewal',
            conditions: [{ csp: 'TTIC:FL:HO3' }, { csp: 'TTIC:FL:AF3' }]
          },
          {
            right: 'UPDATE',
            uri:
              'TTIC:FL:HO3:PolicyData:Transactions:TransactionType:UnderwritingNonRenewal'
          },
          {
            right: 'UPDATE',
            uri:
              'PolicyData:Transactions:TransactionType:VoluntaryCancellation',
            conditions: [{ csp: 'TTIC:FL:HO3' }, { csp: 'TTIC:FL:AF3' }]
          },
          {
            right: 'UPDATE',
            uri:
              'TTIC:FL:HO3:PolicyData:Transactions:TransactionType:VoluntaryCancellation'
          },
          {
            right: 'READ',
            uri: 'BillingData:FinancialTransactions:*',
            conditions: [{ csp: 'TTIC:FL:HO3' }, { csp: 'TTIC:FL:AF3' }]
          },
          {
            right: 'READ',
            uri: 'TTIC:FL:HO3:BillingData:FinancialTransactions:*'
          },
          {
            right: 'INSERT',
            uri: 'BillingData:FinancialTransactions:*',
            conditions: [{ csp: 'TTIC:FL:HO3' }, { csp: 'TTIC:FL:AF3' }]
          },
          {
            right: 'INSERT',
            uri: 'TTIC:FL:HO3:BillingData:FinancialTransactions:*'
          },
          {
            right: 'UPDATE',
            uri: 'BillingData:FinancialTransactions:*',
            conditions: [{ csp: 'TTIC:FL:HO3' }, { csp: 'TTIC:FL:AF3' }]
          },
          {
            right: 'UPDATE',
            uri: 'TTIC:FL:HO3:BillingData:FinancialTransactions:*'
          },
          {
            right: 'READ',
            uri: 'SummaryLedger:summaryledgers:*',
            conditions: [{ csp: 'TTIC:FL:HO3' }, { csp: 'TTIC:FL:AF3' }]
          },
          { right: 'READ', uri: 'TTIC:FL:HO3:SummaryLedger:summaryledgers:*' },
          {
            right: 'INSERT',
            uri: 'SummaryLedger:summaryledgers:*',
            conditions: [{ csp: 'TTIC:FL:HO3' }, { csp: 'TTIC:FL:AF3' }]
          },
          {
            right: 'INSERT',
            uri: 'TTIC:FL:HO3:SummaryLedger:summaryledgers:*'
          },
          {
            right: 'UPDATE',
            uri: 'SummaryLedger:summaryledgers:*',
            conditions: [{ csp: 'TTIC:FL:HO3' }, { csp: 'TTIC:FL:AF3' }]
          },
          {
            right: 'UPDATE',
            uri: 'TTIC:FL:HO3:SummaryLedger:summaryledgers:*'
          },
          {
            right: 'UPDATE',
            uri:
              'PolicyData:Transactions:TransactionType:WindMitigationEndorsement',
            conditions: [{ csp: 'TTIC:FL:HO3' }, { csp: 'TTIC:FL:AF3' }]
          },
          {
            right: 'UPDATE',
            uri:
              'TTIC:FL:HO3:PolicyData:Transactions:TransactionType:WindMitigationEndorsement'
          },
          {
            right: 'READ',
            uri: 'Renewal:PendingRenewals:*',
            conditions: [{ csp: 'TTIC:FL:HO3' }, { csp: 'TTIC:FL:AF3' }]
          },
          { right: 'READ', uri: 'TTIC:FL:HO3:Renewal:PendingRenewals:*' },
          {
            right: 'READ',
            uri: 'DocumentConfiguration:ConfigurationValues:*',
            conditions: [{ csp: 'TTIC:FL:HO3' }, { csp: 'TTIC:FL:AF3' }]
          },
          {
            right: 'READ',
            uri: 'TTIC:FL:HO3:DocumentConfiguration:ConfigurationValues:*'
          },
          {
            right: 'UPDATE',
            uri: 'Renewal:PendingRenewals:*',
            conditions: [{ csp: 'TTIC:FL:HO3' }, { csp: 'TTIC:FL:AF3' }]
          },
          { right: 'UPDATE', uri: 'TTIC:FL:HO3:Renewal:PendingRenewals:*' },
          {
            right: 'READ',
            uri: 'Files',
            conditions: [{ csp: 'TTIC:FL:HO3' }, { csp: 'TTIC:FL:AF3' }]
          },
          { right: 'READ', uri: 'TTIC:FL:HO3:Files' },
          {
            right: 'CREATE',
            uri: 'Documents:*',
            conditions: [{ csp: 'TTIC:FL:HO3' }, { csp: 'TTIC:FL:AF3' }]
          },
          { right: 'CREATE', uri: 'TTIC:FL:HO3:Documents:*' },
          {
            right: 'READ',
            uri: 'FutureEndorsement:FutureEndorsementService:*',
            conditions: [{ csp: 'TTIC:FL:HO3' }, { csp: 'TTIC:FL:AF3' }]
          },
          {
            right: 'READ',
            uri: 'TTIC:FL:HO3:FutureEndorsement:FutureEndorsementService:*'
          },
          {
            right: 'INSERT',
            uri: 'FutureEndorsement:FutureEndorsementService:*',
            conditions: [{ csp: 'TTIC:FL:HO3' }, { csp: 'TTIC:FL:AF3' }]
          },
          {
            right: 'INSERT',
            uri: 'TTIC:FL:HO3:FutureEndorsement:FutureEndorsementService:*'
          },
          {
            right: 'UPDATE',
            uri: 'FutureEndorsement:FutureEndorsementService:*',
            conditions: [{ csp: 'TTIC:FL:HO3' }, { csp: 'TTIC:FL:AF3' }]
          },
          {
            right: 'UPDATE',
            uri: 'TTIC:FL:HO3:FutureEndorsement:FutureEndorsementService:*'
          },
          {
            right: 'RATE',
            uri: 'Policies:Endorsements:*',
            conditions: [{ csp: 'TTIC:FL:HO3' }, { csp: 'TTIC:FL:AF3' }]
          },
          { right: 'RATE', uri: 'TTIC:FL:HO3:Policies:Endorsements:*' },
          {
            right: 'SAVE_NON_PREMIUM',
            uri: 'Policies:Endorsements:*',
            conditions: [{ csp: 'TTIC:FL:HO3' }, { csp: 'TTIC:FL:AF3' }]
          },
          {
            right: 'SAVE_NON_PREMIUM',
            uri: 'TTIC:FL:HO3:Policies:Endorsements:*'
          },
          {
            right: 'SAVE_PREMIUM',
            uri: 'Policies:Endorsements:*',
            conditions: [{ csp: 'TTIC:FL:HO3' }, { csp: 'TTIC:FL:AF3' }]
          },
          { right: 'SAVE_PREMIUM', uri: 'TTIC:FL:HO3:Policies:Endorsements:*' },
          { right: 'READ', uri: 'TTIC:FL:AF3:PolicyData:Transactions:*' },
          { right: 'UPDATE', uri: 'TTIC:FL:AF3:PolicyData:Transactions:*' },
          { right: 'INSERT', uri: 'TTIC:FL:AF3:PolicyData:Transactions:*' },
          { right: 'UPDATE', uri: 'TTIC:FL:AF3:PolicyData:PremiumEndorse' },
          { right: 'READ', uri: 'TTIC:FL:AF3:QuoteData:Quotes:*' },
          { right: 'READ', uri: 'TTIC:FL:AF3:Quotes:*' },
          { right: 'INSERT', uri: 'TTIC:FL:AF3:QuoteData:Quotes:*' },
          { right: 'UPDATE', uri: 'TTIC:FL:AF3:QuoteData:Quotes:*' },
          { right: 'UPDATE', uri: 'TTIC:FL:AF3:Quotes:*' },
          { right: 'INSERT', uri: 'TTIC:FL:AF3:Quotes:*' },
          {
            right: 'UPDATE',
            uri: 'TTIC:FL:AF3:PolicyData:Transactions:PolicyHolders:LastName'
          },
          {
            right: 'UPDATE',
            uri: 'TTIC:FL:AF3:PolicyData:Transactions:PolicyHolders:FirstName'
          },
          { right: 'READ', uri: 'TTIC:FL:AF3:Billing:Payments:*' },
          { right: 'READ', uri: 'TTIC:FL:AF3:Payment:Payments:*' },
          {
            right: 'UPDATE',
            uri:
              'TTIC:FL:AF3:PolicyData:Transactions:TransactionType:EffectiveDateChange'
          },
          {
            right: 'UPDATE',
            uri: 'TTIC:FL:AF3:PolicyData:Transactions:Property'
          },
          {
            right: 'UPDATE',
            uri:
              'TTIC:FL:AF3:PolicyData:Transactions:TransactionType:Endorsement'
          },
          { right: 'READ', uri: 'TTIC:FL:AF3:Diaries:DiariesService:*' },
          { right: 'INSERT', uri: 'TTIC:FL:AF3:Diaries:DiariesService:*' },
          { right: 'UPDATE', uri: 'TTIC:FL:AF3:Diaries:DiariesService:*' },
          { right: 'READ', uri: 'TTIC:FL:AF3:Agency:Agencies:*' },
          { right: 'READ', uri: 'TTIC:FL:AF3:Agency:Agents:*' },
          {
            right: 'UPDATE',
            uri:
              'TTIC:FL:AF3:PolicyData:Transactions:TransactionType:UnderwritingCancellation'
          },
          {
            right: 'UPDATE',
            uri:
              'TTIC:FL:AF3:PolicyData:Transactions:TransactionType:UnderwritingNonRenewal'
          },
          {
            right: 'UPDATE',
            uri:
              'TTIC:FL:AF3:PolicyData:Transactions:TransactionType:VoluntaryCancellation'
          },
          {
            right: 'READ',
            uri: 'TTIC:FL:AF3:BillingData:FinancialTransactions:*'
          },
          {
            right: 'INSERT',
            uri: 'TTIC:FL:AF3:BillingData:FinancialTransactions:*'
          },
          {
            right: 'UPDATE',
            uri: 'TTIC:FL:AF3:BillingData:FinancialTransactions:*'
          },
          { right: 'READ', uri: 'TTIC:FL:AF3:SummaryLedger:summaryledgers:*' },
          {
            right: 'INSERT',
            uri: 'TTIC:FL:AF3:SummaryLedger:summaryledgers:*'
          },
          {
            right: 'UPDATE',
            uri: 'TTIC:FL:AF3:SummaryLedger:summaryledgers:*'
          },
          {
            right: 'UPDATE',
            uri:
              'TTIC:FL:AF3:PolicyData:Transactions:TransactionType:WindMitigationEndorsement'
          },
          { right: 'READ', uri: 'TTIC:FL:AF3:Renewal:PendingRenewals:*' },
          {
            right: 'READ',
            uri: 'TTIC:FL:AF3:DocumentConfiguration:ConfigurationValues:*'
          },
          { right: 'UPDATE', uri: 'TTIC:FL:AF3:Renewal:PendingRenewals:*' },
          { right: 'READ', uri: 'TTIC:FL:AF3:Files' },
          { right: 'CREATE', uri: 'TTIC:FL:AF3:Documents:*' },
          {
            right: 'READ',
            uri: 'TTIC:FL:AF3:FutureEndorsement:FutureEndorsementService:*'
          },
          {
            right: 'INSERT',
            uri: 'TTIC:FL:AF3:FutureEndorsement:FutureEndorsementService:*'
          },
          {
            right: 'UPDATE',
            uri: 'TTIC:FL:AF3:FutureEndorsement:FutureEndorsementService:*'
          },
          { right: 'RATE', uri: 'TTIC:FL:AF3:Policies:Endorsements:*' },
          {
            right: 'SAVE_NON_PREMIUM',
            uri: 'TTIC:FL:AF3:Policies:Endorsements:*'
          },
          { right: 'SAVE_PREMIUM', uri: 'TTIC:FL:AF3:Policies:Endorsements:*' },
          {
            right: 'INSERT',
            uri: 'Billing:Payments:*',
            conditions: [{ csp: 'TTIC:FL:HO3' }, { csp: 'TTIC:FL:AF3' }]
          },
          { right: 'INSERT', uri: 'TTIC:FL:HO3:Billing:Payments:*' },
          {
            right: 'INSERT',
            uri: 'Payment:Payments:*',
            conditions: [{ csp: 'TTIC:FL:HO3' }, { csp: 'TTIC:FL:AF3' }]
          },
          { right: 'INSERT', uri: 'TTIC:FL:HO3:Payment:Payments:*' },
          {
            right: 'UPDATE',
            uri: 'Payment:Payments:*',
            conditions: [{ csp: 'TTIC:FL:HO3' }, { csp: 'TTIC:FL:AF3' }]
          },
          { right: 'UPDATE', uri: 'TTIC:FL:HO3:Payment:Payments:*' },
          { right: 'INSERT', uri: 'TTIC:FL:AF3:Billing:Payments:*' },
          { right: 'INSERT', uri: 'TTIC:FL:AF3:Payment:Payments:*' },
          { right: 'UPDATE', uri: 'TTIC:FL:AF3:Payment:Payments:*' },
          {
            right: 'UPDATE',
            uri: 'Transactions:TransactionType:AOREndorsement',
            conditions: [{ csp: 'TTIC:FL:HO3' }, { csp: 'TTIC:FL:AF3' }]
          },
          {
            right: 'UPDATE',
            uri: 'TTIC:FL:HO3:Transactions:TransactionType:AOREndorsement'
          },
          {
            right: 'UPDATE',
            uri: 'TTIC:FL:AF3:Transactions:TransactionType:AOREndorsement'
          }
        ],
        enabled: true,
        authorizedApplications: [
          { id: '5bda1c6b4f24d8219cbeda31', name: 'Agency Management' }
        ]
      };

      localStorage.setItem('user_profile', JSON.stringify(userData));

      process.env.REACT_APP_AUTH0_DOMAIN = 'localhost';
      process.env.REACT_APP_AUTH0_AUDIENCE = 'AUDIENCE';
      process.env.REACT_APP_AUTH0_CLIENT_ID = 'clientID';

      const auth = new Auth();
      const profile = auth.getProfile(userData);
      expect(profile.userType).toEqual('internal');
      expect(profile.entity).toEqual({
        agencyCode: '',
        companyCode: 'TTIC',
        state: 'FL'
      });
    });

    it('should login', () => {
      localStorage.setItem(
        'user_profile',
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaHR0cHM6Ly9oZWltZGFsbC5zZWN1cml0eS9ncm91cHMiOltdLCJodHRwczovL2hlaW1kYWxsLnNlY3VyaXR5L3JvbGVzIjpbXSwiaHR0cHM6Ly9oZWltZGFsbC5zZWN1cml0eS91c2VybmFtZSI6Impkb2UiLCJodHRwczovL2hlaW1kYWxsLnNlY3VyaXR5L2FwcF9tZXRhZGF0YSI6eyJhZ2VuY3lDb2RlIjoiMTIzNCIsImNvbXBhbnlDb2RlIjoiQUJDRCIsInN0YXRlIjoiRkwifX0.AnKNLuUWSf8LOhSZP9lQ16GFXBl_mtxTJ2_cZ9y6dRQ'
      );

      process.env.REACT_APP_AUTH0_DOMAIN = 'localhost';
      process.env.REACT_APP_AUTH0_AUDIENCE = 'AUDIENCE';
      process.env.REACT_APP_AUTH0_CLIENT_ID = 'clientID';

      const auth = new Auth();
      auth.checkAuth();
      auth.handleAuthentication();
      auth.setSession({
        expiresIn: new Date(),
        accessToken: '3454',
        idToken: '3324'
      });

      const idToken = auth.getIdToken();
      const accessToken = auth.getAccessToken();

      expect(idToken).toEqual('3324');
      expect(accessToken).toEqual('3454');
    });
  });
});
