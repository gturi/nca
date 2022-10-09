import yargs, { CommandModule } from "yargs";
import { AnyObj, ArgvBuilder } from "../util/custom-types";
import { YargsBuilder } from "../util/yargs-builder";

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

  protected getBuilder<T = AnyObj>(yargs: yargs.Argv<T>): ArgvBuilder<T> {
    return YargsBuilder.emptyBuilder<T>();
  }

  protected getHandler<T = AnyObj>(args: yargs.ArgumentsCamelCase<T>) {

  }
}
