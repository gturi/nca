import { Alias } from "../model/api/alias";
import { OptionParam } from "../model/api/option-param";
import { PositionalArgument } from "../model/api/positional-argument";
import { ArrayUtils } from "../util/array-utils";
import { StringUtils } from "../util/string-utils";
import { DuplicatesValidator } from "./duplicates-validator";
import { OptionParamValidator } from "./option-param-validator";
import { PositionalArgumentValidator } from "./positional-argument-validator";
import { WhiteSpaceValidator } from "./white-space-validator";

type Parent = {
  options: OptionParam[],
  positionalArguments: PositionalArgument[]
}

export class AliasValidator {

  static validate(aliases: Alias[]) {
    this.privateValidator(aliases, {
      options: [],
      positionalArguments: []
    });
  }

  private static privateValidator(aliases: Alias[], parent: Parent) {
    this.checkNamesFormat(aliases);
    this.checkForDuplicateNames(aliases);

    aliases.forEach(alias => this.validateAlias(alias, parent));
  }

  private static checkNamesFormat(aliases: Alias[]) {
    const aliasesNames = aliases.map(alias => alias.name)
    WhiteSpaceValidator.validate(aliasesNames, elementsWithWhitespaces => {
      return `Alias names cannot contain whitespaces [${elementsWithWhitespaces}]`;
    });
  }

  private static checkForDuplicateNames(aliases: Alias[]) {
    const aliasNames = aliases.map(alias => alias.name);
    const getErrorMessage = (duplicates: string[]) => {
      return `Multiple aliases has been defined with the same name: [${duplicates}]`;
    };

    DuplicatesValidator.validate(aliasNames, getErrorMessage);
  }

  private static validateAlias(alias: Alias, parent: Parent) {
    this.validateCommand(alias);

    const options = ArrayUtils.concat(parent.options, alias.options);
    OptionParamValidator.validate(alias.name, options);

    const positionalArguments = ArrayUtils.concat(
      parent.positionalArguments, alias.positionalArguments
    );
    PositionalArgumentValidator.validate(alias.name, positionalArguments);

    if (alias.subAliases) {
      this.checkSubAliasesAndPositionalArgumentNames(alias, positionalArguments);

      this.privateValidator(alias.subAliases, {
        options: options,
        positionalArguments: positionalArguments
      });
    }
  }

  private static validateCommand(alias: Alias) {
    if (StringUtils.isEmpty(alias.command) && (alias.subAliases ?? []).length == 0) {
      throw new Error(
        `Alias '${alias.name}' must define sub aliases when its command is not defined`
      );
    }
  }

  private static checkSubAliasesAndPositionalArgumentNames(
    alias: Alias, parentPositionalArguments: PositionalArgument[]
  ) {
    if (alias.subAliases && alias.positionalArguments) {
      const aliasMatch = alias.subAliases.find(subAlias => {
        return parentPositionalArguments.some(positionalArgument => {
          return positionalArgument.name === subAlias.name
        });
      });
      if (aliasMatch) {
        throw new Error(
          `Alias name '${aliasMatch.name}' cannot be used: ` +
          'a positional argument with the same name already exists'
        );
      }
    }
  }
}
