import { Command } from "../command";
import { AddPathCommand } from "./add-path-command";

export class PathCommand extends Command {

  protected getCommandName(): string {
    return 'path <command>';
  }

  protected getCommandDescription(): string {
    return 'nca configuration commands';
  }

  protected getCommands(): Command[] {
    return [new AddPathCommand()];
  }
}
