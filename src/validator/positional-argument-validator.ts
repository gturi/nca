import { PositionalArgument } from "../model/api/positional-argument";
import { PositionalArgumentType } from "../model/api/positional-argument-type";
import { DuplicatesValidator } from "./duplicates-validator";
import { EnumValidator } from "./enum-validator";
import { WhiteSpaceValidator } from "./white-space-validator";

export class PositionalArgumentValidator {

  static validate(ncaCommandName: string, positionalArguments?: PositionalArgument[]) {
    if (positionalArguments) {
      this.checkNamesFormat(ncaCommandName, positionalArguments);
      this.checkDuplicateNames(ncaCommandName, positionalArguments);
      this.checkMultipleListPositionalArguments(ncaCommandName, positionalArguments);
      this.checkPositionalArgumentType(ncaCommandName, positionalArguments);
    }
  }

  private static checkNamesFormat(ncaCommandName: string, positionalArguments: PositionalArgument[]) {
    const positionalArgumentNames = this.getPositionalArgumentNames(positionalArguments);
    WhiteSpaceValidator.validate(positionalArgumentNames, elementsWithWhitespaces => {
      return `${ncaCommandName}: positional argument names cannot contain whitespaces ` +
        `[${elementsWithWhitespaces}]`;
    });
  }

  private static checkDuplicateNames(ncaCommandName: string, positionalArguments: PositionalArgument[]) {
    const positionalArgumentNames = this.getPositionalArgumentNames(positionalArguments);
    const getErrorMessage = (duplicates: string[]) => {
      return `${ncaCommandName}: multiple positional arguments has been defined ` +
        `with the same name: [${duplicates}]`;
    };

    DuplicatesValidator.validate(positionalArgumentNames, getErrorMessage);
  }

  private static checkMultipleListPositionalArguments(
    ncaCommandName: string, positionalArguments: PositionalArgument[]
  ) {
    const listPositionalArgumentNames = positionalArguments
      .filter(positionalArgument => PositionalArgumentType.isListType(positionalArgument.type))
      .map(positionalArgument => positionalArgument.name);

    if (listPositionalArgumentNames.length > 1) {
      throw new Error(
        `${ncaCommandName}: only one list type positional argument is allowed, ` +
        `found: [${listPositionalArgumentNames}]`
      );
    }
  }

  private static getPositionalArgumentNames(positionalArguments: PositionalArgument[]): string[] {
    return positionalArguments.map(positionalArgument => positionalArgument.name);
  }

  private static checkPositionalArgumentType(
    ncaCommandName: string, positionalArguments: PositionalArgument[]
  ) {
    const getErrorMessage = (positionalArgument: PositionalArgument) => {
      return `Nca command '${ncaCommandName}' positionalArgument '${positionalArgument.name}' ` +
        `type '${positionalArgument.type}' is not valid: ` +
        `supported values are ${Object.keys(PositionalArgumentType)}`;
    }
    positionalArguments.forEach(positionalArgument => {
      EnumValidator.validate(
        PositionalArgumentType, positionalArgument.type, () => getErrorMessage(positionalArgument)
      );
    });
  }
}
