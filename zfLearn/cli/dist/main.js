'use strict';

var _commander = require('commander');

var _commander2 = _interopRequireDefault(_commander);

var _constants = require('./utils/constants');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const actionMap = {
    'install': {
        description: 'install template',
        alias: 'i',
        template: []
    },
    'config': {
        description: 'config template',
        alias: 'c',
        template: ['zf-cli config set', 'zf-cli config get', 'zf-cli config xxx']
    },
    '*': {
        description: '* template',
        alias: '*',
        template: []
    }
};
Object.keys(actionMap).forEach(action => {
    _commander2.default.command(action).description(actionMap[action].description).alias(actionMap[action].alias).action(() => {
        console.log(actionMap + 'action');
    });
});

_commander2.default.version(_constants.VERSION, '-v --version').parse(process.argev);