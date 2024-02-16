import yargs from "yargs";
import { OptionParam } from "../model/api/option-param";
import { PositionalArgument } from "../model/api/positional-argument";
import { AnyObj } from "../util/custom-types";

export abstract class Command {

  abstract getCommandName(): string;

  abstract getCommandDescription(): string;

  getPositionalArguments(): PositionalArgument[] {
    return [];
  }

  getOptionParams(): OptionParam[] {
    return [];
  }

  getSubCommands(): Command[] {
    return [];
  }

  /* eslint-disable @typescript-eslint/no-unused-vars */
  /* eslint-disable @typescript-eslint/no-empty-function */
  getHandler<T = AnyObj>(args: yargs.ArgumentsCamelCase<T>) {
  }
}
