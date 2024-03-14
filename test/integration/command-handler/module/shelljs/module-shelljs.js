module.exports = function (input) {
  input.cliUtils.shelljs.exec('echo hello');

  // safeExec will throw an exception if the command exit code is not 0
  input.cliUtils.shelljsSafeExec('git stats'); // intentional typo
};
