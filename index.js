
let {STATES, ICONS} = require('./recentify/constants');
let pageMod = require('sdk/page-mod');
let options = require('./recentify/options').scriptOptions;
let ToggleButton = require('sdk/ui/button/toggle').ToggleButton;

// Default
let buttonState = STATES.ON;

let startupPage = pageMod.PageMod(options.startupOption);
let existingPage = pageMod.PageMod(options.existingOption);

let handleChange = function() {
  buttonState = buttonState === STATES.ON ? STATES.OFF : STATES.ON;

  if (buttonState === STATES.ON) {
   startupPage = pageMod.PageMod(options.startupOption);
   existingPage = pageMod.PageMod(options.existingOption);
  } else {
    startupPage.destroy();
    existingPage.destroy();
  }

  button.state('window', {
    icon : ICONS[buttonState],
    label : 'FB Recent is ' + buttonState
  });

};

let button = ToggleButton({
  id: 'fb-recent-toggle',
  label: 'FB Recent is ON',
  icon: ICONS.ON,
  onChange: handleChange
});

exports.handleChange = handleChange;

// Used for unit testing
exports.__private = {
  button : button,

  get state() {
    return buttonState;
  },

  get pageMods() {
    return {
      startup : startupPage,
      existing : existingPage
    }
  }
};
