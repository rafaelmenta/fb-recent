let {recentify} = require('../recentify/core');
let {STATES, ORDERBY_PARAM, BASE_PATH, TOPNEWS, NEWSFEED, MOST_RECENT} = require('../recentify/constants');
let URL = require("sdk/url").URL;
let qs = require('sdk/querystring');

exports['test valid home url'] = function(assert) {
  let validUrl = 'http://www.facebook.com',
      expectedURL = 'http://www.facebook.com/?' + ORDERBY_PARAM + '=' + MOST_RECENT;
  let url = recentify(validUrl);

  assert.strictEqual(url, expectedURL, 'Facebook home recentified');
};

exports['test valid home url using top news'] = function(assert) {
  let validUrl = 'http://www.facebook.com/?' + ORDERBY_PARAM + '=' + TOPNEWS
  let recentifiedUrl = 'http://www.facebook.com/?' + ORDERBY_PARAM + '=' + MOST_RECENT;
  let url = recentify(validUrl);

  assert.notEqual(url, recentifiedUrl, 'Facebook home with top news not recentified');
};

require('sdk/test').run(exports);
