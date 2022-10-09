import yargs from "yargs";
import { AnyObj, ArgvBuilder } from "../../util/custom-types";
import { YargsBuilder } from "../../util/yargs-builder";
import { Command } from "../command";
import { AddPathCommand } from "./add-path-command";

export class PathCommand extends Command {

  protected getCommandName(): string {
    return 'path <command>';
  }

  protected getCommandDescription(): string {
    return 'nca configuration commands';
  }

  protected getBuilder<T = AnyObj>(yargs: any): ArgvBuilder<T> {
    const addPathCommand = new AddPathCommand();
    yargs.command(addPathCommand.getCommand());

    return YargsBuilder.emptyBuilder<T>();
  }
}
