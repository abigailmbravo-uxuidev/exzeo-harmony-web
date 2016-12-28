/* eslint no-console: 0 */
const shell = require('shelljs');

console.log('DEPENDENCY START UP WILL GO HERE');

shell.exec('docker pull exzeo/heimdall:develop');
shell.exec('docker pull exzeo/bifrost:develop');

shell.exec('docker-compose -f both.docker-compose.yml build');
shell.exec('docker-compose -f both.docker-compose.yml up');
