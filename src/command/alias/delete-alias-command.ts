import yargs from "yargs";
import { PositionalArgument } from '../../model/api/positional-argument';
import { PositionalArgumentType } from '../../model/api/positional-argument-type'
import { AnyObj } from "../../util/custom-types";
import { YargsUtils } from "../../util/yargs-utils";
import { Command } from "../command";
import { NcaConfig } from "../../config/nca-config";
import { StringUtils } from "../../util/string-utils";
import { NodeUtils } from '../../util/node-utils';
import { PackageJsonLoader } from '../../loader/package-json-loader';

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
    const aliasNames = args.aliasNames as string[];

    const packageJsonLoader = new PackageJsonLoader(NcaConfig.getAliasPackageJsonPath());

    const initialBinEntriesCount = packageJsonLoader.aliasCount;

    aliasNames.forEach(aliasName => {
      const aliasCommand = packageJsonLoader.getAliasCommand(aliasName);

      if (StringUtils.isNotEmpty(aliasCommand)) {
        packageJsonLoader.deleteAlias(aliasName);
      } else {
        console.log(`Alias '${aliasName}' does not exist`);
      }
    });

    const binEntriesCount = packageJsonLoader.aliasCount;
    if (initialBinEntriesCount === binEntriesCount) {
      console.warn('Alias package json has been left unchanged');
    } else {
      NodeUtils.unlinkLocalAliases();

      // Package json update needs to be done after unlinking the local aliases,
      // otherwise the local alias start script will not be removed node folder
      packageJsonLoader.writeOnDisk();

      NodeUtils.linkLocalAliases();
    }
  }
}
