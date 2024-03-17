import { NcaConfig } from "../config/nca-config";
import { NcaCommand } from "../model/api/nca-command";
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

export class NcaCommandValidator {

  static validate(ncaCommands: NcaCommand[]) {
    this.privateValidator(ncaCommands, {
      options: [],
      positionalArguments: []
    });
  }

  private static privateValidator(ncaCommands: NcaCommand[], parent: Parent) {
    const names = ncaCommands.map(ncaCommand => ncaCommand.name);
    this.checkNamesFormat(names);
    this.checkForDuplicateNames(names);

    ncaCommands.forEach(ncaCommand => this.validateNcaCommand(ncaCommand, parent));
  }

  private static checkNamesFormat(names: string[]) {
    WhiteSpaceValidator.validate(names, elementsWithWhitespaces => {
      return `Nca command names cannot contain whitespaces [${elementsWithWhitespaces}]`;
    });

    this.checkForbiddenNames(names);
  }

  private static checkForbiddenNames(ncaCommandNames: string[]) {
    const forbiddenNames = NcaConfig.getForbiddenNames();
    const forbiddenNamesFound = ncaCommandNames.filter(element => forbiddenNames.includes(element));
    if (forbiddenNamesFound.length > 0) {
      throw new Error(`The following nca command names are not allowed: [${forbiddenNamesFound}]`);
    }
  }

  private static checkForDuplicateNames(names: string[]) {
    const getErrorMessage = (duplicates: string[]) => {
      return `Multiple nca commands have been defined with the same name: [${duplicates}]`;
    };

    DuplicatesValidator.validate(names, getErrorMessage);
  }

  private static validateNcaCommand(ncaCommand: NcaCommand, parent: Parent) {
    this.validateCommand(ncaCommand);

    const options = ArrayUtils.concat(parent.options, ncaCommand.options);
    OptionParamValidator.validate(ncaCommand.name, options);

    const positionalArguments = ArrayUtils.concat(
      parent.positionalArguments, ncaCommand.positionalArguments
    );
    PositionalArgumentValidator.validate(ncaCommand.name, positionalArguments);

    this.checkSubCommandType(ncaCommand);

    if (ncaCommand.subCommands) {
      this.checkSubCommandsAndPositionalArgumentNames(ncaCommand, positionalArguments);

      this.privateValidator(ncaCommand.subCommands, {
        options: options,
        positionalArguments: positionalArguments
      });
    }
  }

  private static validateCommand(ncaCommand: NcaCommand) {
    if (StringUtils.isEmpty(ncaCommand.command) && (ncaCommand.subCommands ?? []).length == 0) {
      throw new Error(
        `Nca command '${ncaCommand.name}' must define sub commands when its command is not defined`
      );
    }
  }

  private static checkSubCommandsAndPositionalArgumentNames(
    ncaCommand: NcaCommand, parentPositionalArguments: PositionalArgument[]
  ) {
    if (ncaCommand.subCommands && ncaCommand.positionalArguments) {
      const match = ncaCommand.subCommands.find(subCommand => {
        return parentPositionalArguments.some(positionalArgument => {
          return positionalArgument.name === subCommand.name
        });
      });
      if (match) {
        throw new Error(
          `Nca command name '${match.name}' cannot be used in subcommand: ` +
          'a positional argument with the same name already exists'
        );
      }
    }
  }

  private static checkSubCommandType(ncaCommand: NcaCommand) {
    const getErrorMessage = () =>
      `Nca command '${ncaCommand.name}' commandType '${ncaCommand.commandType}' is not valid: ` +
      `supported values are ${Object.keys(CommandType)}`;
    const commandType = ncaCommand.commandType ?? CommandType.Native;
    EnumValidator.validate(CommandType, commandType, getErrorMessage)
  }
}
