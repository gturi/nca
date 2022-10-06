import { PositionalArgument } from "../model/positional-argument";

export class AliasPositionalArgumentUtils {

  static isRequired(positionalArgument: PositionalArgument): boolean {
    return positionalArgument.defaultValue !== null && (positionalArgument.defaultValue === null || positionalArgument.defaultValue === undefined);
  }
}
