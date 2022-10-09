import yargs, { CommandModule } from "yargs";
import { AnyObj, ArgvBuilder } from "../util/custom-types";
import { Command } from "./command";
import { PathCommand } from "./path/path-command";

export class ConfigCommand extends Command {

  protected getCommandName(): string {
    return 'config <command>';
  }

  protected getCommandDescription(): string {
    return 'nca configuration commands';
  }

  protected getBuilder<T = AnyObj>(yargs: yargs.Argv<T>): ArgvBuilder<T> {
    const pathCommand = new PathCommand();
    yargs.command(pathCommand.getCommand());

    return super.getBuilder(yargs);
  }
}
