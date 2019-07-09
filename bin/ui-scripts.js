#!/usr/bin/env node
/**
 * Copyright (c) 2015-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

// Makes the script crash on unhandled rejections instead of silently
// ignoring them. In the future, promise rejections that are not handled will
// terminate the Node.js process with a non-zero exit code.


// const {spawn, execSync, exec} = require('child_process');
// const path = require('path');

// const rootDir = path.resolve(__dirname, '../');
console.log('1-------------', process.execPath);
// console.log('1-------------', process.argv);

// const reactScriptsPath = path
//   .resolve(__dirname, '../node_modules/.bin/react-scripts')
//   .replace(/ /g, '\\ ');


  // const child = spawn(reactScriptsPath, ['start'], { stdio: 'inherit' });

  // child.stdout.on('data', (data)=>{
  //   console.log('data from child:    ', data.toString());
  // })


  // const execFn = (command, extraEnv) =>{
  //   execSync(command,
  //     {
  //     stdio: 'inherit',
  //     env: Object.assign({}, process.env, extraEnv),
  //   }
  //   );
    
  // }

 
  // execFn(`${reactScriptsPath} start`
  // , {
  //   NODE_ENV: 'production',
  // }
  // );
  
  process.on('unhandledRejection', err => {
    console.log('unhandledRejection------------');
    throw err;
  });
  
  console.log('2------------------');

const spawn = require('react-dev-utils/crossSpawn');
const args = process.argv.slice(2);

const scriptIndex = args.findIndex(
  x => x === 'build' || x === 'eject' || x === 'start' || x === 'test'
);
const script = scriptIndex === -1 ? args[0] : args[scriptIndex];
const nodeArgs = scriptIndex > 0 ? args.slice(0, scriptIndex) : [];


console.log(scriptIndex, args, script, nodeArgs)
// console.log(require.resolve('react-scripts' + '../scripts/' + script), args.slice(scriptIndex + 1))

console.log('3-------------')

switch (script) {
  case 'build':
  case 'eject':
  case 'start':
  case 'test': {
    const result = spawn.sync(
      'node',
      nodeArgs
      .concat(require.resolve('react-scripts' + '/scripts/' + script))
        .concat(args.slice(scriptIndex + 1)),
      { stdio: 'inherit' }
    );
    
    if (result.signal) {
      console.log('result.sginal-----------', result.signal);
      if (result.signal === 'SIGKILL') {
        console.log(
          'The build failed because the process exited too early. ' +
            'This probably means the system ran out of memory or someone called ' +
            '`kill -9` on the process.'
        );
      } else if (result.signal === 'SIGTERM') {
        console.log(
          'The build failed because the process exited too early. ' +
            'Someone might have called `kill` or `killall`, or the system could ' +
            'be shutting down.'
        );
      }

      process.exit(1);
    }

    process.exit(result.status);
    break;
  }
  default:
    console.log('Unknown script "' + script + '".');
    console.log('Perhaps you need to update react-scripts?');
    console.log(
      'See: https://facebook.github.io/create-react-app/docs/updating-to-new-releases'
    );
    break;
}
