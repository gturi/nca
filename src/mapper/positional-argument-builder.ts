import yargs from "yargs";
import { PositionalArgument } from "../model/positional-argument";
import { PositionalArgumentType } from "../model/positional-argument-type";
import { PositionalArgumentUtils } from "../util/positional-argument-utils";
import { AnyObj } from "../util/custom-types";

export class PositionalArgumentBuilder {

  static build<T = AnyObj>(yargs: yargs.Argv<T>, positionalArguments?: PositionalArgument[]) {
    if (positionalArguments) {
      positionalArguments.forEach(positionalArgument => {
        PositionalArgumentBuilder.buildPositional<T>(yargs, positionalArgument);
      });
    }
  }

  private static buildPositional<T = AnyObj>(
    yargs: yargs.Argv<T>, positionalArgument: PositionalArgument
  ) {
    yargs.positional(positionalArgument.name, {
      describe: positionalArgument.description,
      type: PositionalArgumentType.toYargsType(positionalArgument.type),
      default: positionalArgument.defaultValue,
      required: PositionalArgumentUtils.isRequired(positionalArgument)
    });
  }
}
