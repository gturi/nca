import { NcaCommandTemplate } from "../model/internal/nca-command-template";
import { PathCommand } from "./path/path-command";

export class ConfigCommand extends NcaCommandTemplate {

  override getCommandName(): string {
    return 'config <command>';
  }

  override getCommandDescription(): string {
    return 'nca configuration commands';
  }

  override getSubCommands(): NcaCommandTemplate[] {
    return [new PathCommand()];
  }
}
