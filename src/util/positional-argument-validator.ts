import { AliasPositionalArgument } from "../model/alias-positional-argument";
import { DuplicatesValidator } from "./duplicates-validator";

export class PositionalArgumentValidator {

  static validate(aliasName: string, positionalArguments?: AliasPositionalArgument[]) {
    if (positionalArguments) {
      const positionalArgumentNames = positionalArguments.map(positionalArgument => positionalArgument.name);
      const getErrorMessage = (duplicates: string[]) => {
        return `${aliasName}: multiple positional arguments has been defined with the same name: [${duplicates}]`;
      };

      DuplicatesValidator.validate(positionalArgumentNames, getErrorMessage);
    }
  }
}
