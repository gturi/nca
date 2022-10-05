import { Config } from "../model/config";

export class ConfigValidator {

  static validate(configPath: string, config: Config) {
    ConfigValidator.throwErrorIfAliasIsDefined(configPath, config, 'completion');
    ConfigValidator.throwErrorIfAliasIsDefined(configPath, config, 'config');
  }

  private static throwErrorIfAliasIsDefined(configPath: string, config: Config, aliasName: string) {
    if (config.aliases?.some(alias => alias.name === aliasName)) {
      throw new Error(`${configPath}: You can not define an alias called '${aliasName}' since it is a special keyword`);
    }
  }
}