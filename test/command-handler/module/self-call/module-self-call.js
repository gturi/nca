module.exports = function (input) {
  const command = input.args.command.join(' ');
  input.cliUtils.shelljs.exec(command);
};
