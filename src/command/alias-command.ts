import { AddAliasCommand } from "./alias/add-alias-command";
import { DeleteAliasCommand } from "./alias/delete-alias-command";
import { ListAliasCommand } from "./alias/list-alias-command";
import { RenameAliasCommand } from "./alias/rename-alias-command";
import { CompletionAliasCommand } from "./alias/completion-alias-command";
import { NcaCommandTemplate } from "../model/internal/nca-command-template";

export class AliasCommand extends NcaCommandTemplate {

  override getCommandName(): string {
    return 'alias <command>';
  }

  override getCommandDescription(): string {
    return 'commands to manage aliases of other nca commands';
  }

  override getSubCommands(): NcaCommandTemplate[] {
    return [
      new AddAliasCommand(),
      new DeleteAliasCommand(),
      new ListAliasCommand(),
      new RenameAliasCommand(),
      new CompletionAliasCommand()
    ];
  }
}
