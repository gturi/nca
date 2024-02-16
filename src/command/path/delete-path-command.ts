import yargs from "yargs";
import { OptionParam } from "../../model/api/option-param";
import { OptionParamType } from "../../model/api/option-param-type";
import { PositionalArgument } from '../../model/api/positional-argument';
import { PositionalArgumentType } from '../../model/api/positional-argument-type';
import { ArrayUtils } from '../../util/array-utils';
import { ConfigLoader } from '../../loader/config-loader';
import { ConfigSaver } from '../../util/config-saver';
import { AnyObj } from "../../util/custom-types";
import { YargsUtils } from "../../util/yargs-utils";
import { Command } from "../command";
import { NcaConfig } from "../../config/nca-config";

export class DeletePathCommand extends Command {

  override getCommandName(): string {
    return YargsUtils.getCommand('delete', this.getPositionalArguments());
  }

  override getCommandDescription(): string {
    return 'remove path from configuration file';
  }

  override getPositionalArguments(): PositionalArgument[] {
    const positionalArgument: PositionalArgument = {
      name: 'configPath',
      description: 'config path to remove',
      type: PositionalArgumentType.String,
      required: true
    }
    return [positionalArgument];
  }

  override getOptionParams(): OptionParam[] {
    const optionParam: OptionParam = {
      name: 'f',
      alternativeName: 'file',
      description: 'configuration path to that will include the new config',
      optionType: OptionParamType.String,
      defaultValue: NcaConfig.getMainConfigFilePath()
    }
    return [optionParam];
  }

  override getHandler<T = AnyObj>(args: yargs.ArgumentsCamelCase<T>): void {
    const configPath = args.f as string;
    const configPathToRemove = args.configPath as string;

    const configLoader = new ConfigLoader();
    const config = configLoader.loadConfig(configPath);

    if (config.includePaths && ArrayUtils.remove(config.includePaths, configPathToRemove)) {
      ConfigSaver.save(configPath, config);
    }
  }
}
