# harmony-web
Harmony Agency Portal

###### This app is bootstrapped with a custom version of Create React App
[Repo](https://github.com/facebook/create-react-app)  
[User Guide](https://facebook.github.io/create-react-app/)

### Getting setup
clone the repository (requires access rights) from bitbucket
`git clone git@bitbucket.org:exzeo-usa/harmony-csr.git`  
*_its likely you will be cloning multiple projects, we recommend using a common directory for them_

*From the root of the project*

add `.npmrc` file **you will need this file before attempting* `npm install`
```bash
//registry.npmjs.org/:_authToken=GET_ACCESS_TOKEN_FROM_DEVOPS
@exzeo:registry=https://registry.npmjs.org/
```

add `.env.local` file  
**this file is used to override default the configuration which runs locally, and points to a local Harmony backend.*  
```.bash
# uncomment to point to sandbox
# REACT_APP_API_URL=https://api.harmony-ins.com

# uncomment to use mock-auth0 (must be pointing to local backend)
# REACT_APP_AUTH0_DOMAIN=mock-auth0:8888
# REACT_APP_AUTH0_CLIENT_ID=https://mock-auth0:8888
# REACT_APP_AUTH0_CONNECTION=ashton-sandbox
# REACT_APP_AUTH0_AUDIENCE=https://mock-auth0:8888
# REACT_APP_USE_MOCK_AUTH0=true

# uncomment to test cypress against sandbox environment
# REACT_APP_CYPRESS_URL=https://agency.harmony-ins.com
```

**Important!**  
append the following to `/etc/hosts` file on your machine
```bash
# this covers all harmony front end apps
127.0.0.1               devapi.harmony-ins.com
127.0.0.1               devlogin.harmony-ins.com
127.0.0.1               devcsr.harmony-ins.com
127.0.0.1               devagent.harmony-ins.com
127.0.0.1               mock-auth0
```

install dependencies
```bash
npm install
```

run the app
```bash
npm start
```

### Contributing to Harmony CSR

All components must meet the following criteria
* Follow formatting / linting rules ( `npm run lint` must exit with 0 code )
* PropTypes must be declared - required and default
* Covered by unit tests
* A front end dev approval required for PR's
