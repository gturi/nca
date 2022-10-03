import yargs from "yargs";
import { AliasPositionalArgument } from "../model/alias-positional-argument";
import { AliasPositionalArgumentType } from "../model/alias-positional-argument-type";

export class PositionalArgumentBuilder {
  
  static build<T = {}>(yargs: yargs.Argv<T>, positionalArguments?: AliasPositionalArgument[]) {
    if (positionalArguments) {
      positionalArguments.forEach(positionalArgument => {
        PositionalArgumentBuilder.buildPositional<T>(yargs, positionalArgument);
      });
    }
  }

  private static buildPositional<T = {}>(yargs: yargs.Argv<T>, positionalArgument: AliasPositionalArgument) {
    yargs.positional(positionalArgument.name, {
      describe: positionalArgument.description,
      type: AliasPositionalArgumentType.toYargsType(positionalArgument.type),
      default: positionalArgument.defaultValue,
      required: PositionalArgumentBuilder.isRequired(positionalArgument)
    });
  }

  private static isRequired(positionalArgument: AliasPositionalArgument): boolean {
    return positionalArgument.defaultValue !== null && (positionalArgument.defaultValue === null || positionalArgument.defaultValue === undefined)
  }
}
