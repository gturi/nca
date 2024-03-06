import { AddPathCommand } from "./add-path-command";
import { DeletePathCommand } from "./delete-path-command";
import { NcaCommandTemplate } from "../../model/internal/nca-command-template";

export class PathCommand extends NcaCommandTemplate {

  override getCommandName(): string {
    return 'path <command>';
  }

  override getCommandDescription(): string {
    return 'nca configuration commands';
  }

  override getSubCommands(): NcaCommandTemplate[] {
    return [new AddPathCommand(), new DeletePathCommand()];
  }
}
