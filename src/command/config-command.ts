import { Command } from "./command";
import { PathCommand } from "./path/path-command";

export class ConfigCommand extends Command {

  override getCommandName(): string {
    return 'config <command>';
  }

  override getCommandDescription(): string {
    return 'nca configuration commands';
  }

  override getSubCommands(): Command[] {
    return [new PathCommand()];
  }
}
