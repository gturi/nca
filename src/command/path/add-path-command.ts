import yargs from "yargs";
import { Config } from "../../model/config";
import { OptionParam } from '../../model/option-param';
import { OptionParamType } from '../../model/option-param-type';
import { PositionalArgument } from '../../model/positional-argument';
import { PositionalArgumentType } from '../../model/positional-argument-type';
import { ConfigLoader } from '../../util/config-loader';
import { ConfigSaver } from '../../util/config-saver';
import { AnyObj } from "../../util/custom-types";
import { YargsUtils } from '../../util/yargs-utils';
import { Command } from "../command";

export class AddPathCommand extends Command {

  protected override getCommandName(): string {
    return YargsUtils.getCommand('add', this.getPositionalArguments());
  }

  protected override getCommandDescription(): string {
    return 'include path into configuration file';
  }

  protected override getPositionalArguments(): PositionalArgument[] {
    const positionalArgument: PositionalArgument = {
      name: 'newConfigPath',
      description: 'config path to add',
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
      optionType: OptionParamType.Boolean,
      defaultValue: Config.getMainConfigFilePath()
    }
    return [optionParam];
  }

  protected override getHandler<T = AnyObj>(args: yargs.ArgumentsCamelCase<T>): void {
    const configPath = args.f as string;
    const configPathToAdd = args.configPath as string;

    const config = ConfigLoader.loadConfig(configPath);

    if (config.includePaths) {
      config.includePaths.push(configPathToAdd);
    } else {
      config.includePaths = [configPathToAdd];
    }

    ConfigSaver.save(configPath, config);
  }
}
