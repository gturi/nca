import { Command } from "../command";
import { AddPathCommand } from "./add-path-command";

export class PathCommand extends Command {

  protected override getCommandName(): string {
    return 'path <command>';
  }

  protected override getCommandDescription(): string {
    return 'nca configuration commands';
  }

  protected override getCommands(): Command[] {
    return [new AddPathCommand()];
  }
}
