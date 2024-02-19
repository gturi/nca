import path from 'path';
import shelljs from "shelljs";
import yargs from "yargs";
import { PositionalArgument } from '../../model/api/positional-argument';
import { PositionalArgumentType } from '../../model/api/positional-argument-type'
import { AnyObj } from "../../util/custom-types";
import { YargsUtils } from "../../util/yargs-utils";
import { Command } from "../command";
import { FileSystemUtils } from "../../util/file-system-utils";
import { NcaConfig } from "../../config/nca-config";
import { StringUtils } from "../../util/string-utils";

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

    const aliasPackageJsonPath = NcaConfig.getAliasPackageJsonPath();
    const packageJson = FileSystemUtils.readJsonFile(aliasPackageJsonPath);
    const bin = packageJson.bin as Record<string, string | null>;

    const initialBinEntriesCount = Object.entries(bin).length;

    aliasNames.forEach(aliasName => {
      const aliasCommand = bin[aliasName];

      if (StringUtils.isNotEmpty(aliasCommand)) {
        delete bin[aliasName];

        const aliasCodePath = path.join(NcaConfig.getAliasSourceFolderPath(), aliasName);
        FileSystemUtils.deleteFile(aliasCodePath);
      } else {
        console.log(`Alias '${aliasName}' does not exist`);
      }
    });

    const binEntriesCount = Object.entries(bin).length;
    if (initialBinEntriesCount === binEntriesCount) {
      console.warn('Alias package json has been left unchanged');
    } else {
      shelljs.exec(`npm unlink --global node-command-alias-local`);

      FileSystemUtils.writePrettyJsonFile(aliasPackageJsonPath, packageJson);

      shelljs.exec(`npm link "${NcaConfig.getAliasFolderPath()}"`);
    }
  }
}
