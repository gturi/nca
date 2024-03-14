import { NcaCommandTemplate } from "../model/internal/nca-command-template";
import { AliasCommand } from "./alias-command";
import { ConfigCommand } from "./config-command";

export class BuiltInCommands {

  get(): NcaCommandTemplate[] {
    return [new ConfigCommand(), new AliasCommand()];
  }
}
