import { AliasPositionalArgument } from "../model/alias-positional-argument";

export class AliasPositionalArgumentUtils {

  static isRequired(positionalArgument: AliasPositionalArgument): boolean {
    return positionalArgument.defaultValue !== null && (positionalArgument.defaultValue === null || positionalArgument.defaultValue === undefined);
  }
}
