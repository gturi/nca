import { AliasCommand } from "./alias-command";
import { Command } from "./command";
import { ConfigCommand } from "./config-command";

export class BuiltInCommands {

  get(): Command[] {
    return [new ConfigCommand(), new AliasCommand()];
  }
}
