process.env.NODE_ENV = 'test';

require('babel-register')();
require('babel-polyfill');
require('./Mock.jsx');

require.extensions['.css'] = () => null;
require.extensions['.png'] = () => null;
require.extensions['.jpg'] = () => null;
require.extensions['.svg'] = () => null;
require.extensions['.svg'] = () => null;

const jsdom = require('jsdom').jsdom;

const exposedProperties = ['window', 'navigator', 'document'];

global.document = jsdom('');
global.window = document.defaultView;

Object.defineProperty(global.window.location, 'href', {
  writable: true,
  value: ''
});

Object.keys(document.defaultView).forEach((property) => {
  if (typeof global[property] === 'undefined') {
    exposedProperties.push(property);
    global[property] = document.defaultView[property];
  }
});

global.navigator = {
  userAgent: 'node.js'
};

global.expect = require('chai').expect;
global.sinon = require('sinon');
