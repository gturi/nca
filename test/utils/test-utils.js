const path = require('path');
const { spawn } = require('child_process');

function runNcaAndVerifyOutput(done, handleResult, ...args) {
  const app = runCommand(args);

  const output = [];

  app.stdout.on('data', (data) => {
    output.push(bufferToString(data));
  });

  app.stderr.on('data', (data) => {
    console.error(`Error: ${bufferToString(data)}`);
    done(bufferToString(data));
  });

  app.on('close', (code) => {
    try {
      handleResult(output);
      expect(code).toBe(0);
      done();
    } catch (error) {
      done(error);
    }
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
