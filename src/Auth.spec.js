import Auth from './Auth';

describe('Auth', () => {
  describe('getProfile', () => {
    it('should pull all fields of auth id token', () => {
      localStorage.setItem(
        'id_token',
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaHR0cHM6Ly9oZWltZGFsbC5zZWN1cml0eS9ncm91cHMiOltdLCJodHRwczovL2hlaW1kYWxsLnNlY3VyaXR5L3JvbGVzIjpbXSwiaHR0cHM6Ly9oZWltZGFsbC5zZWN1cml0eS91c2VybmFtZSI6Impkb2UiLCJodHRwczovL2hlaW1kYWxsLnNlY3VyaXR5L2FwcF9tZXRhZGF0YSI6eyJhZ2VuY3lDb2RlIjoiMTIzNCIsImNvbXBhbnlDb2RlIjoiQUJDRCIsInN0YXRlIjoiRkwifX0.AnKNLuUWSf8LOhSZP9lQ16GFXBl_mtxTJ2_cZ9y6dRQ'
      );

      process.env.REACT_APP_AUTH0_DOMAIN = 'localhost';
      process.env.REACT_APP_AUTH0_AUDIENCE = 'AUDIENCE';
      process.env.REACT_APP_AUTH0_CLIENT_ID = 'clientID';

      const auth = new Auth();
      const profile = auth.getProfile();
      expect(profile).toEqual({
        sub: '1234567890',
        name: 'John Doe',
        groups: [],
        roles: [],
        username: 'jdoe',
        appMetadata: { agencyCode: '1234', companyCode: 'ABCD', state: 'FL' },
        entity: { agencyCode: '1234', companyCode: 'ABCD', state: 'FL' }
      });
    });

    it('should still get agency info from groups', () => {
      localStorage.setItem(
        'id_token',
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaHR0cHM6Ly9oZWltZGFsbC5zZWN1cml0eS9yb2xlcyI6W10sImh0dHBzOi8vaGVpbWRhbGwuc2VjdXJpdHkvdXNlcm5hbWUiOiJqZG9lIiwiaHR0cHM6Ly9oZWltZGFsbC5zZWN1cml0eS9ncm91cHMiOlt7Il9pZCI6IjU5NDk2NmY1N2E2ZmMwN2I2Njg5MDYyNCIsIm5hbWUiOiJBQkNEIDEyMzQgQWdlbmN5IiwiYWdlbmN5Q29kZSI6MTIzNCwiY29tcGFueUNvZGUiOiJBQkNEIiwic3RhdGUiOiJGTCIsImlzQ1NSIjpmYWxzZSwiaXNBZ2VuY3kiOnRydWUsImV4dGVuZGVkUHJvcGVydGllcyI6eyJoYXJtb255R3JvdXAiOnRydWUsImNvbXBhbnlDb2RlIjoiQUJDRCIsInN0YXRlIjoiRkwiLCJhZ2VuY3lDb2RlIjoxMjM0LCJhZ2VuY3lJZCI6MTIzNCwiaXNDU1IiOmZhbHNlLCJpc0FnZW5jeSI6dHJ1ZX0sIl9fdiI6MCwicm9sZXMiOltdLCJjaGlsZEdyb3VwcyI6W119XX0.fVmgItE1YHUR8pHtHbUYDcj3-hFiAnk5a4VhyFkqjQs'
      );
      process.env.REACT_APP_AUTH0_DOMAIN = 'localhost';
      process.env.REACT_APP_AUTH0_AUDIENCE = 'AUDIENCE';
      process.env.REACT_APP_AUTH0_CLIENT_ID = 'clientID';

      const auth = new Auth();
      const profile = auth.getProfile();
      expect(profile).toEqual({
        sub: '1234567890',
        name: 'John Doe',
        groups: [
          {
            _id: '594966f57a6fc07b66890624',
            name: 'ABCD 1234 Agency',
            agencyCode: 1234,
            companyCode: 'ABCD',
            state: 'FL',
            isInternal: false,
            isAgency: true,
            extendedProperties: {
              harmonyGroup: true,
              companyCode: 'ABCD',
              state: 'FL',
              agencyCode: 1234,
              agencyId: 1234,
              isInternal: false,
              isAgency: true
            },
            __v: 0,
            roles: [],
            childGroups: []
          }
        ],
        roles: [],
        username: 'jdoe',
        appMetadata: undefined,
        entity: { agencyCode: 1234, companyCode: 'ABCD', state: 'FL' }
      });
    });

    it('should login', () => {
      localStorage.setItem(
        'id_token',
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaHR0cHM6Ly9oZWltZGFsbC5zZWN1cml0eS9ncm91cHMiOltdLCJodHRwczovL2hlaW1kYWxsLnNlY3VyaXR5L3JvbGVzIjpbXSwiaHR0cHM6Ly9oZWltZGFsbC5zZWN1cml0eS91c2VybmFtZSI6Impkb2UiLCJodHRwczovL2hlaW1kYWxsLnNlY3VyaXR5L2FwcF9tZXRhZGF0YSI6eyJhZ2VuY3lDb2RlIjoiMTIzNCIsImNvbXBhbnlDb2RlIjoiQUJDRCIsInN0YXRlIjoiRkwifX0.AnKNLuUWSf8LOhSZP9lQ16GFXBl_mtxTJ2_cZ9y6dRQ'
      );

      process.env.REACT_APP_AUTH0_DOMAIN = 'localhost';
      process.env.REACT_APP_AUTH0_AUDIENCE = 'AUDIENCE';
      process.env.REACT_APP_AUTH0_CLIENT_ID = 'clientID';

      const auth = new Auth();
      const profile = auth.getProfile();
      expect(profile).toEqual({
        sub: '1234567890',
        name: 'John Doe',
        groups: [],
        roles: [],
        username: 'jdoe',
        appMetadata: { agencyCode: '1234', companyCode: 'ABCD', state: 'FL' },
        entity: { agencyCode: '1234', companyCode: 'ABCD', state: 'FL' }
      });
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
