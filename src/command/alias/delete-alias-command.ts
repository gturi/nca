import yargs from "yargs";
import { PositionalArgument } from '../../model/api/positional-argument';
import { PositionalArgumentType } from '../../model/api/positional-argument-type'
import { AnyObj } from "../../util/custom-types";
import { YargsUtils } from "../../util/yargs-utils";
import { Command } from "../command";

export class DeleteAliasCommand extends Command {

  override getCommandName(): string {
    return YargsUtils.getCommand('delete', this.getPositionalArguments());
  }

  override getCommandDescription(): string {
    return 'remove one or more nca aliases';
  }

  override getPositionalArguments(): PositionalArgument[] {
    const positionalArgument: PositionalArgument = {
      name: 'aliasNames',
      description: 'nca aliases to remove',
      type: PositionalArgumentType.StringList,
      required: true
    }
    return [positionalArgument];
  }

  override getHandler<T = AnyObj>(args: yargs.ArgumentsCamelCase<T>): void {
    // TODO: implement
    // remove alias from package.json
    // npm unlink --global node-command-alias-local
    // npm link /path/to/dir
    const aliasNames = args.aliasNames as string[];
    aliasNames.forEach(aliasName => {
      console.log(`Removing alias: ${aliasName}`);
    });
  }
}
