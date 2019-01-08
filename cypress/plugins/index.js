// ***********************************************************
// This example plugins/index.js can be used to load plugins
//
// You can change the location of this file or turn off loading
// the plugins file with the 'pluginsFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/plugins-guide
// ***********************************************************

// This function is called when a project is opened or re-opened (e.g. due to
// the project's config changing)

const { parsed: envConfig } = require('dotenv').config({ path: `${process.cwd()}/${process.env.npm_package_config_react_env_file || '.env'}` });

module.exports = (on, config) => {
  // `on` is used to hook into various events Cypress emits
  // `config` is the resolved Cypress config
  Object.keys(envConfig).forEach((key) => { config.env[key] = envConfig[key]; }); // eslint-disable-line no-param-reassign

  return config;
};
