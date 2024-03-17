module.exports = function (input) {
  const fs = require('fs');
  const yaml = input.yaml;

  const configPath = 'config.yml';
  const data = fs.readFileSync(configPath, 'utf8');
  const config = yaml.load(data) ?? {};
  config.commands.forEach((ncaCommand) => {
    console.log(ncaCommand.name);
    console.log(ncaCommand.description);
    console.log(ncaCommand.command);
    console.log(ncaCommand.commandType);
    console.log(ncaCommand.runInConfigDirectory);
  });
};
