const path = require('path');
const { spawn } = require('child_process');

function runNcaAndVerifyOutput(done, expected, ...args) {
  const app = runCommand(args);

  app.stdout.on('data', (data) => {
    expect(bufferToString(data)).toBe(expected);
    done();
  });

  app.stderr.on('data', (data) => {
    fail(`Error: ${bufferToString(data)}`);
  });
}

/**
 * Programmatically set arguments and execute the CLI script
 *
 * @param {...string} args - positional and option arguments for the command to run
 */
function runCommand(...args) {
  const testAppFilePath = path.join(
    __dirname,
    '../../dist/index.js',
  )

  argv = [
    testAppFilePath, // Not used but a value is required at this index in the array
    ...args,
  ];

  return spawn('node', argv);
}


function bufferToString(buffer) {
  return Buffer.from(buffer).toString();
}

module.exports = {
  runNcaAndVerifyOutput: runNcaAndVerifyOutput
}
