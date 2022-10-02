import { Alias } from "../model/alias";
import { ArrayUtils } from "./array-utils";
import { OptionValidator } from "./option-validator";
import { PositionalArgumentValidator } from "./positional-argument-validator";

export class AliasValidator {

  static validate(aliases: Alias[]) {
    const aliasNames = aliases.map(alias => alias.name);

    const duplicates = ArrayUtils.getDuplicates(aliasNames);

    if (duplicates.length > 0) {
      throw new Error(`Multiple aliases has been defined with the same name: [${duplicates}]`);
    }

    aliases.forEach(alias => {
      OptionValidator.validate(alias.name, alias.options);
      PositionalArgumentValidator.validate(alias.name, alias.positionalArguments);
      if (alias.subAliases) {
        AliasValidator.validate(alias.subAliases);
      }
    });
  }
}