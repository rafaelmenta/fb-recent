let Core = {};

let {ORDERBY_PARAM, BASE_PATH, TOPNEWS, NEWSFEED, MOST_RECENT} = require('./constants');
let URL = require("sdk/url").URL;
let qs = require('sdk/querystring');

Core._recentifyUrl = function(url) {
  let search = url.search;
  let querystring;
  if (search.length < 2) {
    querystring = {};
  }
  else {
    querystring = qs.parse(search.substr(1));
  }
  if (querystring[ORDERBY_PARAM] === TOPNEWS) return;

  querystring[ORDERBY_PARAM] = MOST_RECENT;
  let newUrl = url.origin + url.pathname + '?' + qs.stringify(querystring);
  return newUrl;
};

Core.recentify = function(link) {
  let url = URL(link);
  let recentUrl = Core._recentifyUrl(url);
  return recentUrl;
};

exports.recentify = Core.recentify;
