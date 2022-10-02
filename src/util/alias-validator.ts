import { Alias } from "../model/alias";
import { AliasOption } from "../model/alias-option";
import { AliasPositionalArgument } from "../model/alias-positional-argument";
import { ArrayUtils } from "./array-utils";
import { DuplicatesValidator } from "./duplicates-validator";
import { OptionValidator } from "./option-validator";
import { PositionalArgumentValidator } from "./positional-argument-validator";

export class AliasValidator {

  static validate(aliases: Alias[]) {
    AliasValidator.privateValidator(aliases);
  }

  private static privateValidator(aliases: Alias[], parentOptions: AliasOption[] = [],
                                  parentPositionalArguments: AliasPositionalArgument[] = []) {
    AliasValidator.checkForDuplicateNames(aliases);

    aliases.forEach(alias => {
      AliasValidator.validateAlias(alias, parentOptions, parentPositionalArguments);
    });
  }

  private static checkForDuplicateNames(aliases: Alias[]) {
    const aliasNames = aliases.map(alias => alias.name);
    const getErrorMessage = (duplicates: string[]) => {
      return `Multiple aliases has been defined with the same name: [${duplicates}]`;
    };

    DuplicatesValidator.validate(aliasNames, getErrorMessage);
  }

  private static validateAlias(alias: Alias, parentOptions: AliasOption[],
                               parentPositionalArguments: AliasPositionalArgument[]) {
    const options = ArrayUtils.concat(parentOptions, alias.options);
    OptionValidator.validate(alias.name, ArrayUtils.concat(parentOptions, options));

    const positionalArguments = ArrayUtils.concat(parentPositionalArguments, alias.positionalArguments);
    PositionalArgumentValidator.validate(alias.name, positionalArguments);

    if (alias.subAliases) {
      AliasValidator.privateValidator(alias.subAliases, options, positionalArguments);
    }
  }
}
