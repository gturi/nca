import { Config } from "../model/api/config";

export class ConfigValidator {

  static validate(configPath: string, config: Config) {
    this.throwErrorIfCommandIsDefined(configPath, config, 'completion');
    this.throwErrorIfCommandIsDefined(configPath, config, 'config');
  }

  private static throwErrorIfCommandIsDefined(
    configPath: string, config: Config, commandName: string
  ) {
    if (config.commands?.some(ncaCommand => ncaCommand.name === commandName)) {
      throw new Error(
        `${configPath}: you cannot define an nca command called '${commandName}'` +
        'since it is a special keyword'
      );
    }
  }
}
