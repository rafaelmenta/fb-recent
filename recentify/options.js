let recentify = require('./core').recentify;

let startupOption = {
  include: "*.facebook.com",
  contentScriptFile: './recentify.js',
  contentScriptWhen: 'start',
  onAttach: function(worker) {
    worker.port.emit('update.url');
  }
};

let existingOption = {
  include: "*.facebook.com",
  contentScriptFile: './recentify.js',
  onAttach: function(worker) {
    worker.port.emit('get.links');
    worker.port.emit('observe.mutations');
    worker.port.on('received.link', function(element) {
      element.url = recentify(element.url);
      worker.port.emit('update.link', element);
    })
  }
};

exports.scriptOptions = {
  startupOption : startupOption,
  existingOption : existingOption
};
