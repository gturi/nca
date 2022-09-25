import { Config } from "../model/config";

export class ConfigValidator {

  static validate(config: Config) {
    ConfigValidator.throwErrorIfAliasIsDefined(config, 'completion');
    ConfigValidator.throwErrorIfAliasIsDefined(config, 'config');
  }
  
  private static throwErrorIfAliasIsDefined(config: Config, aliasName:string) {
    if (config.aliases.some(alias => alias.name === aliasName)) {
      throw new Error(`You can not define an alias called '${aliasName}' since it is a special keyword`);
    }
  }
}
