import { Command } from "./command";
import { PathCommand } from "./path/path-command";

export class ConfigCommand extends Command {

  protected override getCommandName(): string {
    return 'config <command>';
  }

  protected override getCommandDescription(): string {
    return 'nca configuration commands';
  }

  protected override getCommands(): Command[] {
    return [new PathCommand()]
  }
}
