import path from 'path';
import yargs from "yargs";
import { OptionParam } from '../../model/api/option-param';
import { OptionParamType } from '../../model/api/option-param-type';
import { PositionalArgument } from '../../model/api/positional-argument';
import { PositionalArgumentType } from '../../model/api/positional-argument-type';
import { AnyObj } from "../../util/custom-types";
import { YargsUtils } from '../../util/yargs-utils';
import { NcaConfig } from "../../config/nca-config";
import { Command } from "../command";
import { StringUtils } from "../../util/string-utils";
import { FileSystemUtils } from '../../util/file-system-utils';
import { PackageJsonLoader } from '../../loader/package-json-loader';
import { NodeUtils } from '../../util/node-utils';

export class AddAliasCommand extends Command {

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

  override getOptionParams(): OptionParam[] {
    const optionParam: OptionParam = {
      name: 'n',
      alternativeName: 'name',
      description:
        'name that will be used to invoke the alias (defaults to the command name when empty)',
      optionType: OptionParamType.String,
      defaultValue: ''
    }
    return [optionParam];
  }

  override getHandler<T = AnyObj>(args: yargs.ArgumentsCamelCase<T>): void {
    const commandArray = args.command as string[];
    this.removeNcaPrefix(commandArray);

    const aliasName = this.getAliasName(args.n as string | undefined, commandArray);

    this.updateAliasPackageJsonWithNewAlias(aliasName);

    this.createScriptToExecuteNcaCommand(aliasName, commandArray);


    NodeUtils.linkLocalAliases();

    console.log(`Alias '${aliasName}' successfully created`);
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
      `'use strict';`,
      `const spawnSync = require('child_process').spawnSync;`,
      `const commandArray = ${command};`,
      `spawnSync('nca', commandArray, { stdio: 'inherit' });`,
    ].join('\n\n') + '\n';
  }

  private updateAliasPackageJsonWithNewAlias(aliasName: string): void {
    const packageJsonLoader = new PackageJsonLoader(NcaConfig.getAliasPackageJsonPath());

    packageJsonLoader.addAlias(aliasName);

    packageJsonLoader.writeOnDisk();
  }

  private createScriptToExecuteNcaCommand(aliasName: string, commandArray: string[]) {
    const aliasCode = this.getAliasCode(commandArray);
    const aliasCodePath = path.join(NcaConfig.getAliasSourceFolderPath(), aliasName);

    FileSystemUtils.createFolderIfNotExists(NcaConfig.getAliasSourceFolderPath());
    FileSystemUtils.writeFile(aliasCodePath, aliasCode);
  }
}
