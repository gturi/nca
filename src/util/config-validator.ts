import { alias } from "yargs";
import { Alias } from "../model/alias";
import { Config } from "../model/config";

export class ConfigValidator {

  static validate(configPath: string, config: Config) {
    ConfigValidator.throwErrorIfAliasIsDefined(configPath, config, 'completion');
    ConfigValidator.throwErrorIfAliasIsDefined(configPath, config, 'config');
  }
  
  private static throwErrorIfAliasIsDefined(configPath: string, config: Config, aliasName:string) {
    if (config.aliases?.some(alias => alias.name === aliasName)) {
      throw new Error(`${configPath}: You can not define an alias called '${aliasName}' since it is a special keyword`);
    }
  }

  static validateAliases(configs: Alias[]) {
    const aliasNames = configs.map(alias => alias.name);

    const duplicates = aliasNames.filter(ConfigValidator.findDuplicates);

    if (duplicates.length > 0) {
      throw new Error(`Multiple aliases has been defined with the same name: [${duplicates}]`);
    }
  }

  private static findDuplicates<T>(value: T, index: number, self: T[]) {
    return self.indexOf(value) !== index;
  }
}
