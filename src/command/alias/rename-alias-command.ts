import yargs from "yargs";
import { PositionalArgument } from '../../model/api/positional-argument';
import { PositionalArgumentType } from '../../model/api/positional-argument-type';
import { AnyObj } from "../../util/custom-types";
import { YargsUtils } from '../../util/yargs-utils';
import { Command } from "../command";
import { PackageJsonLoader } from '../../loader/package-json-loader';
import { NodeUtils } from '../../util/node-utils';

export class RenameAliasCommand extends Command {

  override getCommandName(): string {
    return YargsUtils.getCommand('rename', this.getPositionalArguments());
  }

  override getCommandDescription(): string {
    return 'rename a global alias for a nca command';
  }

  override getPositionalArguments(): PositionalArgument[] {
    const aliasArgument: PositionalArgument = {
      name: 'aliasName',
      description: 'alias to rename',
      type: PositionalArgumentType.String,
      required: true
    }
    const newAliasNameArgument: PositionalArgument = {
      name: 'aliasNewName',
      description: 'new alias name',
      type: PositionalArgumentType.String,
      required: true
    }
    return [aliasArgument, newAliasNameArgument];
  }

  override getHandler<T = AnyObj>(args: yargs.ArgumentsCamelCase<T>): void {
    const aliasName = args.aliasName as string;
    const aliasNewName = args.aliasNewName as string;

    this.updateAliasPackageJson(aliasName, aliasNewName);

    NodeUtils.refreshLocalAliases();

    console.log(`Alias '${aliasName}' successfully renamed to '${aliasNewName}'`);
  }

  private updateAliasPackageJson(aliasName: string, aliasNewName: string): void {
    const packageJsonLoader = new PackageJsonLoader();

    packageJsonLoader.renameAlias(aliasName, aliasNewName);

    packageJsonLoader.writeOnDisk();
  }
}
