module.exports = function (input) {
  input.shelljs.exec('echo hello');

  // safeExec will throw an exception if the command exit code is not 0
  input.shelljsSafeExec('git stats'); // intentional typo
};
