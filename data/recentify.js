const ORDERBY_PARAM = 'sk';

const BASE_PATH = 'https://www.facebook.com';

const TOPNEWS = 'h_nor';
const NEWSFEED = 'nf';
const MOST_RECENT = 'h_chr';

let doc = document;

let getURLObject = function(href) {
  return new URL(href, BASE_PATH);
};

let filterHome = function(element) {
  let url = getURLObject(element.href);
  return url.pathname === '/';
};

let toArray = function(list) {
  return Array.prototype.slice.call(list);
};

let getAbsoluteLinks = function() {
  let links = toArray(doc.querySelectorAll('a[href*="facebook.com"]'));
  return links;
};

let getNewsFeedLinks = function() {
  return toArray(doc.querySelectorAll('a[href*="' + ORDERBY_PARAM + '=' + NEWSFEED + '"]'));
};

let getHomeLinks = function() {
  var absoluteLinks = getAbsoluteLinks();
  var newsFeedLinks = getNewsFeedLinks();
  var facebookLinks = absoluteLinks.concat(newsFeedLinks);

  return Array.prototype.filter.call(facebookLinks, filterHome);
}

let hash = {};

let getLinks = function() {
  let links = getHomeLinks();
  links.map((element) => {
    let id = Math.random();
    hash[id] = element;

    self.port.emit('received.link', {
      id : id,
      url : element.href
    });
  });
};

self.port.on('get.links', getLinks);

self.port.on('update.link', function(element) {
  var domObject = hash[element.id];
  domObject.href = element.url;
});

self.port.on('update.feature', function(state) {
  console.log('state is now', state);
})

self.port.on('update.url', function() {
  let url = new URL(doc.location);
  let isHome = filterHome(url);

  if (isHome && !url.searchParams.get(ORDERBY_PARAM)) {
    url.searchParams.set(ORDERBY_PARAM, MOST_RECENT);
    doc.location = url.href;
  }
});

let observer = new MutationObserver (function(mutations) {
  getLinks();
});

self.port.on('observe.mutations', function() {
  let config = {childList: true};
  let body = doc.querySelector('body');

  if (body) {
    observer.observe(body, config);
  }
});








