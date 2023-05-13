const { spawn } = require('child_process');

function runNcaAndVerifySuccessfulOutput(done, handleStdout, ...args) {
  const handleStderr = stderr => {
    if (stderr.length !== 0) {
      console.error(stderr);
      done(stderr);
    }
  }
  runNcaAndVerifyOutput(done, handleStdout, handleStderr, 0, args);
}

function runNcaAndVerifyOutput(done, handleStdout, handleStderr, expectedExitCode, ...args) {
  const app = runCommand(args);

  const stdout = [];
  const stderr = [];

  app.stdout.on('data', data => {
    stdout.push(bufferToString(data));
  });

  app.stderr.on('data', data => {
    stderr.push(bufferToString(data));
  });

  app.on('close', code => {
    try {
      handleStdout(stdout);
      handleStderr(stderr);
      expect(code).toBe(expectedExitCode);
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
  return spawn('./test/run-nca.sh', args);
}


function bufferToString(buffer) {
  return Buffer.from(buffer).toString();
}

module.exports = {
  runNcaAndVerifyOutput: runNcaAndVerifyOutput,
  runNcaAndVerifySuccessfulOutput: runNcaAndVerifySuccessfulOutput
}
