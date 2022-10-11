import yargs from "yargs";
import { Config } from "../../model/config";
import { OptionParam } from "../../model/option-param";
import { OptionParamType } from "../../model/option-param-type";
import { PositionalArgument } from '../../model/positional-argument';
import { PositionalArgumentType } from '../../model/positional-argument-type';
import { ArrayUtils } from '../../util/array-utils';
import { ConfigLoader } from '../../util/config-loader';
import { ConfigSaver } from '../../util/config-saver';
import { AnyObj } from "../../util/custom-types";
import { YargsUtils } from "../../util/yargs-utils";
import { Command } from "../command";

export class DeletePathCommand extends Command {

  protected override getCommandName(): string {
    return YargsUtils.getCommand('delete', this.getPositionalArguments());
  }

  protected override getCommandDescription(): string {
    return 'remove path from configuration file';
  }

  protected override getPositionalArguments(): PositionalArgument[] {
    const positionalArgument: PositionalArgument = {
      name: 'configPath',
      description: 'config path to remove',
      type: PositionalArgumentType.String,
      required: true
    }
    return [positionalArgument];
  }

  protected override getOptionParams(): OptionParam[] {
    const optionParam: OptionParam = {
      name: 'f',
      alternativeName: 'file',
      description: 'configuration path to that will include the new config',
      optionType: OptionParamType.String,
      defaultValue: Config.getMainConfigFilePath()
    }
    return [optionParam];
  }

  protected override getHandler<T = AnyObj>(args: yargs.ArgumentsCamelCase<T>): void {
    const configPath = args.f as string;
    const configPathToRemove = args.configPath as string;

    const config = ConfigLoader.loadConfig(configPath);

    if (config.includePaths && ArrayUtils.remove(config.includePaths, configPathToRemove)) {
      ConfigSaver.save(configPath, config);
    }
  }
}
