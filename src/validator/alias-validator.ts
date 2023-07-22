import { NcaConfig } from "../config/nca-config";
import { Alias } from "../model/api/alias";
import { CommandType } from "../model/api/command-type";
import { OptionParam } from "../model/api/option-param";
import { PositionalArgument } from "../model/api/positional-argument";
import { ArrayUtils } from "../util/array-utils";
import { StringUtils } from "../util/string-utils";
import { DuplicatesValidator } from "./duplicates-validator";
import { EnumValidator } from "./enum-validator";
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
    const aliasesNames = aliases.map(alias => alias.name);
    this.checkNamesFormat(aliasesNames);
    this.checkForDuplicateNames(aliasesNames);

    aliases.forEach(alias => this.validateAlias(alias, parent));
  }

  private static checkNamesFormat(aliasesNames: string[]) {
    WhiteSpaceValidator.validate(aliasesNames, elementsWithWhitespaces => {
      return `Alias names cannot contain whitespaces [${elementsWithWhitespaces}]`;
    });

    this.checkForbiddenNames(aliasesNames);
  }

  private static checkForbiddenNames(aliasesNames: string[]) {
    const forbiddenNames = NcaConfig.getForbiddenNames();
    const forbiddenNamesFound = aliasesNames.filter(element => forbiddenNames.includes(element));
    if (forbiddenNamesFound.length > 0) {
      throw new Error(`The following aliases names are not allowed: [${forbiddenNamesFound}]`);
    }
  }

  private static checkForDuplicateNames(aliasesNames: string[]) {
    const getErrorMessage = (duplicates: string[]) => {
      return `Multiple aliases has been defined with the same name: [${duplicates}]`;
    };

    DuplicatesValidator.validate(aliasesNames, getErrorMessage);
  }

  private static validateAlias(alias: Alias, parent: Parent) {
    this.validateCommand(alias);

    const options = ArrayUtils.concat(parent.options, alias.options);
    OptionParamValidator.validate(alias.name, options);

    const positionalArguments = ArrayUtils.concat(
      parent.positionalArguments, alias.positionalArguments
    );
    PositionalArgumentValidator.validate(alias.name, positionalArguments);

    this.checkSubAliasCommandType(alias);

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

  private static checkSubAliasCommandType(alias: Alias) {
    const getErrorMessage = () =>
      `Alias '${alias.name}' commandType '${alias.commandType}' is not valid: ` +
      `supported values are ${Object.keys(CommandType)}`;
    const commandType = alias.commandType ?? CommandType.Simple;
    EnumValidator.validate(CommandType, commandType, getErrorMessage)
  }
}
