import { Config } from "../model/config";

export class ConfigValidator {

  static validate(configPath: string, config: Config) {
    this.throwErrorIfAliasIsDefined(configPath, config, 'completion');
    this.throwErrorIfAliasIsDefined(configPath, config, 'config');
  }

  private static throwErrorIfAliasIsDefined(configPath: string, config: Config, aliasName: string) {
    if (config.aliases?.some(alias => alias.name === aliasName)) {
      throw new Error(
        `${configPath}: you cannot define an alias called '${aliasName}'` +
        'since it is a special keyword'
      );
    }
  }
}
