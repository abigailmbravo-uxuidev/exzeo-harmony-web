/* eslint-disable import/first */

// ---------- Testing for IE and Safari ---------- //
// Copied from stackoverflow - there are some obvious simplifications possible, but leaving it alone
// https://stackoverflow.com/questions/49328382/browser-detection-in-reactjs
// Safari 3.0+ "[object HTMLElementConstructor]"
const isSafari =
  /constructor/i.test(window.HTMLElement) ||
  (function(p) {
    return p.toString() === '[object SafariRemoteNotification]';
  })(
    !window['safari'] ||
      (typeof window['safari'] !== 'undefined' &&
        window['safari'].pushNotification)
  );
// Internet Explorer 6-11
const isIE = /*@cc_on!@*/ false || !!document.documentMode;
window.harmony_web_use_fallback = isIE || isSafari;

import 'react-app-polyfill/ie11';
import 'core-js/fn/array/find';
import 'core-js/fn/array/filter';
import 'core-js/fn/array/includes';
import 'core-js/fn/object/keys';
import 'core-js/fn/object/entries';
import 'core-js/fn/object/values';
import 'core-js/fn/number/is-nan';
import 'core-js/fn/string/repeat';
import 'core-js/fn/string/includes';
import 'core-js/fn/symbol/iterator.js';

import { http as axios, retry } from '@exzeo/core-ui';

import '../node_modules/font-awesome/scss/font-awesome.scss';
import './sass/typtap-theme.scss';

retry(axios);
