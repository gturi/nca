import { AliasPositionalArgument } from "../model/alias-positional-argument";
import { ArrayUtils } from "./array-utils";

export class PositionalArgumentValidator {
  
  static validate(aliasName: string, positionalArguments?: AliasPositionalArgument[]) {
    if (positionalArguments) {
      const positionalArgumentNames = positionalArguments.map(positionalArgument => positionalArgument.name);

      const duplicates = ArrayUtils.getDuplicates(positionalArgumentNames);

      if (duplicates.length > 0) {
        throw new Error(`${aliasName}: multiple positional arguments has been defined with the same name: [${duplicates}]`);
      }
    }
  }
}
