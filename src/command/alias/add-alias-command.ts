import path from 'path';
import yargs from "yargs";
import shelljs from 'shelljs';
import { PositionalArgument } from '../../model/api/positional-argument';
import { PositionalArgumentType } from '../../model/api/positional-argument-type';
import { AnyObj } from "../../util/custom-types";
import { YargsUtils } from '../../util/yargs-utils';
import { NcaConfig } from "../../config/nca-config";
import { StringUtils } from "../../util/string-utils";
import { FileSystemUtils } from '../../util/file-system-utils';
import { PackageJsonLoader } from '../../loader/package-json-loader';
import { NodeUtils } from '../../util/node-utils';
import { hideBin } from 'yargs/helpers';
import { ProcessArgumentUtils } from '../../util/process-arguments-utils';
import { NcaCommandTemplate } from '../../model/internal/nca-command-template';

export class AddAliasCommand extends NcaCommandTemplate {

  override getCommandName(): string {
    return YargsUtils.getCommand('add', this.getPositionalArguments());
  }

  override getCommandDescription(): string {
    return 'create a global alias for a nca command which can be invoked without "nca" prefix';
  }

  override getPositionalArguments(): PositionalArgument[] {
    const positionalArgument: PositionalArgument = {
      name: 'command',
      description: 'nca command that will be executed when using the alias',
      type: PositionalArgumentType.StringList,
      required: true
    }
    return [positionalArgument];
  }

  override getHandler<T = AnyObj>(args: yargs.ArgumentsCamelCase<T>): void {
    const commandArray = this.getCommandArray();

    // TODO: it would be nice to allow to specify the alias name using the -n option
    const aliasName = this.getAliasName(args.n as string | undefined, commandArray);

    this.updateAliasPackageJsonWithNewAlias(aliasName);

    this.createScriptToExecuteNcaCommand(aliasName, commandArray);


    NodeUtils.linkLocalAliases();

    console.log(`Alias '${aliasName}' successfully created`);
  }

  private getCommandArray(): string[] {
    const commandArray = hideBin(process.argv);

    commandArray.splice(0, 2); // remove ['alias', 'add']

    this.removeNcaPrefix(commandArray);

    return ProcessArgumentUtils.sanitizeCommandArray(commandArray);
  }

  private removeNcaPrefix(commandArray: string[]): void {
    if (commandArray.length > 0 && commandArray[0] === 'nca') {
      commandArray.shift();
    }

    if (commandArray.length === 0) {
      throw new Error('Command cannot be empty');
    }
  }

  private getAliasName(name: string | undefined, commandArray: string[]): string {
    return StringUtils.ifNotEmptyOrDefault(name, () => commandArray[0]);
  }

  private getAliasCode(commandArray: string[]): string {
    const command = JSON.stringify(commandArray);
    return [
      `#!/usr/bin/env node`,
      '',
      `'use strict';`,
      '',
      '',
      `const commandArray = ${command};`,
      '',
      `if (require.main === module) {`,
      `  const spawnSync = require('child_process').spawnSync;`,
      '',
      `  const args = process.argv.slice(2)`,
      // wrap the args between double quotes if they contain a space
      '    .map(arg => /\\s/.test(arg) ? `"${arg}"` : arg);',
      '',
      `  spawnSync('nca', commandArray.concat(args), { stdio: 'inherit', shell: true });`,
      `} else {`,
      `  exports.commandArray = commandArray;`,
      `}`
    ].join('\n') + '\n';
  }

  private updateAliasPackageJsonWithNewAlias(aliasName: string): void {
    const packageJsonLoader = new PackageJsonLoader();

    packageJsonLoader.addAlias(aliasName);

    packageJsonLoader.writeOnDisk();
  }

  private createScriptToExecuteNcaCommand(aliasName: string, commandArray: string[]) {
    const aliasCode = this.getAliasCode(commandArray);
    const aliasCodePath = path.join(NcaConfig.getAliasSourceFolderPath(), aliasName);

    FileSystemUtils.createFolderIfNotExists(NcaConfig.getAliasSourceFolderPath());
    FileSystemUtils.writeFile(aliasCodePath, aliasCode);
    shelljs.chmod('u+x', aliasCodePath);
  }
}
