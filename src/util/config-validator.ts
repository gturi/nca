import { Alias } from "../model/alias";
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

  static validateAliases(aliases: Alias[]) {
    const aliasNames = aliases.map(alias => alias.name);

    const duplicates = aliasNames.filter(ConfigValidator.findDuplicates);

    if (duplicates.length > 0) {
      throw new Error(`Multiple aliases has been defined with the same name: [${duplicates}]`);
    }

    aliases.forEach(alias => {
      ConfigValidator.validateOptions(alias);
      ConfigValidator.validatePositionalArguments(alias);
      if (alias.subAliases) {
        ConfigValidator.validateAliases(alias.subAliases);
      }
    });
  }

  private static validateOptions(alias: Alias) {
    if (alias.options) {
      const optionNames = alias.options.map(option => option.name);

      const duplicates = optionNames.filter(ConfigValidator.findDuplicates);

      if (duplicates.length > 0) {
        throw new Error(`${alias.name}: multiple option has been defined with the same name: [${duplicates}]`);
      }
    }
  }

  private static validatePositionalArguments(alias: Alias) {
    if (alias.positionalArguments) {
      const positionalArgumentNames = alias.positionalArguments.map(positionalArgument => positionalArgument.name);

      const duplicates = positionalArgumentNames.filter(ConfigValidator.findDuplicates);

      if (duplicates.length > 0) {
        throw new Error(`${alias.name}: multiple positional arguments has been defined with the same name: [${duplicates}]`);
      }
    }
  }

  private static findDuplicates<T>(value: T, index: number, self: T[]) {
    return self.indexOf(value) !== index;
  }
}
