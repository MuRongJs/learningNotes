import program, { on } from 'commander';
import { VERSION } from './utils/constants';

const actionMap = {
    'install': {
        description: 'install template',
        alias: 'i',
        template: [

        ]
    },
    'config': {
        description: 'config template',
        alias: 'c',
        template: [
            'zf-cli config set',
            'zf-cli config get',
            'zf-cli config xxx',
        ]
    },
    '*': {
        description: '* template',
        alias: '*',
        template: [
        ]
    }
}
Object.keys(actionMap).forEach(action => {
    program.command(action)
    .description(actionMap[action].description)
    .alias(actionMap[action].alias)
    .action(() => {
        console.log(actionMap + 'action')
    })
})

program.version(VERSION, '-v --version').parse(process.argev);

