import { AliasPositionalArgument } from "../model/alias-positional-argument";
import { AliasPositionalArgumentType } from "../model/alias-positional-argument-type";
import { DuplicatesValidator } from "./duplicates-validator";

export class PositionalArgumentValidator {

  static validate(aliasName: string, positionalArguments?: AliasPositionalArgument[]) {
    if (positionalArguments) {
      PositionalArgumentValidator.checkDuplicateNames(aliasName, positionalArguments);
      PositionalArgumentValidator.checkMultipleListPositionalArguments(aliasName, positionalArguments);
    }
  }

  private static checkDuplicateNames(aliasName: string, positionalArguments: AliasPositionalArgument[]) {
    const positionalArgumentNames = positionalArguments.map(positionalArgument => positionalArgument.name);
    const getErrorMessage = (duplicates: string[]) => {
      return `${aliasName}: multiple positional arguments has been defined with the same name: [${duplicates}]`;
    };

    DuplicatesValidator.validate(positionalArgumentNames, getErrorMessage);
  }

  private static checkMultipleListPositionalArguments(aliasName: string, positionalArguments: AliasPositionalArgument[]) {
    const listPositionalArgumentNames = positionalArguments
      .filter(positionalArgument => AliasPositionalArgumentType.isListType(positionalArgument.type))
      .map(positionalArgument => positionalArgument.name);

    if (listPositionalArgumentNames.length > 1) {
      const errorMessage = `${aliasName}: only one list type positional argument is allowed, found: [${listPositionalArgumentNames}]`;
      throw new Error(errorMessage);
    }    
  }
}
