import { PositionalArgument } from "../model/positional-argument";

export class PositionalArgumentUtils {

  static isRequired(positionalArgument: PositionalArgument): boolean {
    return positionalArgument.required ||
      positionalArgument.defaultValue === null ||
      positionalArgument.defaultValue === undefined;
  }
}
