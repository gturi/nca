import { Command } from "../command";
import { AddPathCommand } from "./add-path-command";
import { DeletePathCommand } from "./delete-path-command";

export class PathCommand extends Command {

  override getCommandName(): string {
    return 'path <command>';
  }

  override getCommandDescription(): string {
    return 'nca configuration commands';
  }

  override getSubCommands(): Command[] {
    return [new AddPathCommand(), new DeletePathCommand()];
  }
}
