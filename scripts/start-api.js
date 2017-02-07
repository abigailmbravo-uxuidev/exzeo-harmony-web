/* eslint no-console: 0 */
const shell = require('shelljs');
const opn = require('opn');

console.log('DEPENDENCY START UP WILL GO HERE');

shell.exec('docker pull exzeo/heimdall:develop');
shell.exec('docker pull exzeo/harmony-api:develop');
shell.exec('docker pull exzeo/bifrost:develop');

shell.exec('docker-compose build');
shell.exec('docker-compose up');

opn('http://localhost:4000');
