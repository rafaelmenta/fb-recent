var main = require('../');
var {STATES} = require('../recentify/constants');

exports['test default state'] = function(assert) {
  assert.ok((main.__private.state === STATES.ON), 'Button state is ON');

  let label = 'FB Recent is ON';
  assert.ok((main.__private.button.label === label), 'Label is correctly set')
};

exports['test state switch'] = function(assert) {

  let state = main.__private.state;
  main.handleChange();

  if (state === STATES.ON) {
    assert.ok((main.__private.state === STATES.OFF), 'Feature successfully turned off');
  } else {
    assert.ok((main.__private.state === STATES.ON), 'Feature successfully turned on');
  }

};

require('sdk/test').run(exports);
