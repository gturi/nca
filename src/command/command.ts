import yargs, { CommandModule } from "yargs";
import { PositionalArgumentBuilder } from "../mapper/positional-argument-builder";
import { PositionalArgument } from "../model/positional-argument";
import { ArrayUtils } from "../util/array-utils";
import { AnyObj, ArgvBuilder } from "../util/custom-types";
import { YargsUtils } from "../util/yargs-utils";

export abstract class Command {

  getCommand<T = AnyObj>(): CommandModule<T, AnyObj> {
    return {
      command: this.getCommandName(),
      describe: this.getCommandDescription(),
      builder: yargs => this.getBuilder<T>(yargs),
      handler: args => this.getHandler(args)
    };
  }

  protected abstract getCommandName(): string;

  protected abstract getCommandDescription(): string;

  protected getPositionalArguments(): PositionalArgument[] {
    return [];
  }

  protected getBuilder<T = AnyObj>(yargs: yargs.Argv<T>): ArgvBuilder<T> {
    PositionalArgumentBuilder.build(yargs, this.getPositionalArguments());
    return YargsUtils.emptyBuilder<T>();
  }

  protected getHandler<T = AnyObj>(args: yargs.ArgumentsCamelCase<T>) {
  }
}
