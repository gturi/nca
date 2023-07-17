import yargs, { CommandModule } from "yargs";
import { OptionBuilder } from "../mapper/option-builder";
import { PositionalArgumentBuilder } from "../mapper/positional-argument-builder";
import { OptionParam } from "../model/api/option-param";
import { PositionalArgument } from "../model/api/positional-argument";
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

  private getBuilder<T = AnyObj>(yargs: yargs.Argv<T>): ArgvBuilder<T> {
    PositionalArgumentBuilder.build(yargs, this.getPositionalArguments());

    OptionBuilder.build(yargs, this.getOptionParams());

    this.getCommands().forEach(c => yargs.command(c.getCommand<T>()));

    return YargsUtils.emptyBuilder<T>();
  }

  protected getPositionalArguments(): PositionalArgument[] {
    return [];
  }

  protected getOptionParams(): OptionParam[] {
    return [];
  }

  protected getCommands(): Command[] {
    return [];
  }

  /* eslint-disable @typescript-eslint/no-unused-vars */
  /* eslint-disable @typescript-eslint/no-empty-function */
  protected getHandler<T = AnyObj>(args: yargs.ArgumentsCamelCase<T>) {
  }
}
