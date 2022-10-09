import { Command } from "./command";
import { PathCommand } from "./path/path-command";

export class ConfigCommand extends Command {

  protected getCommandName(): string {
    return 'config <command>';
  }

  protected getCommandDescription(): string {
    return 'nca configuration commands';
  }

  protected getCommands(): Command[] {
    return [new PathCommand()]
  }
}
