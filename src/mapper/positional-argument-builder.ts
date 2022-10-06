import yargs from "yargs";
import { AliasPositionalArgument } from "../model/alias-positional-argument";
import { AliasPositionalArgumentType } from "../model/alias-positional-argument-type";
import { AliasPositionalArgumentUtils } from "../util/alias-positional-argument-utils";
import { AnyObj } from "../util/custom-types";

export class PositionalArgumentBuilder {
  
  static build<T = AnyObj>(yargs: yargs.Argv<T>, positionalArguments?: AliasPositionalArgument[]) {
    if (positionalArguments) {
      positionalArguments.forEach(positionalArgument => {
        PositionalArgumentBuilder.buildPositional<T>(yargs, positionalArgument);
      });
    }
  }

  private static buildPositional<T = AnyObj>(yargs: yargs.Argv<T>, positionalArgument: AliasPositionalArgument) {
    yargs.positional(positionalArgument.name, {
      describe: positionalArgument.description,
      type: AliasPositionalArgumentType.toYargsType(positionalArgument.type),
      default: positionalArgument.defaultValue,
      required: AliasPositionalArgumentUtils.isRequired(positionalArgument)
    });
  }
}
