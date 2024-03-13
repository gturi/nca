import yargs from "yargs";
import { OptionParam } from '../../model/api/option-param';
import { OptionParamType } from '../../model/api/option-param-type';
import { PositionalArgument } from '../../model/api/positional-argument';
import { PositionalArgumentType } from '../../model/api/positional-argument-type';
import { ConfigLoader } from '../../loader/config-loader';
import { ConfigSaver } from '../../util/config-saver';
import { AnyObj } from "../../util/custom-types";
import { YargsUtils } from '../../util/yargs-utils';
import { NcaConfig } from "../../config/nca-config";
import { NcaCommandTemplate } from "../../model/internal/nca-command-template";

export class AddPathCommand extends NcaCommandTemplate {

  override getCommandName(): string {
    return YargsUtils.getCommand('add', this.getPositionalArguments());
  }

  override getCommandDescription(): string {
    return 'include path into configuration file';
  }

  override getPositionalArguments(): PositionalArgument[] {
    const positionalArgument: PositionalArgument = {
      name: 'configPath',
      description: 'config path to add',
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
    const configPathToAdd = args.configPath as string;

    const configLoader = new ConfigLoader();
    const config = configLoader.loadConfig(configPath);

    if (config.includePaths?.includes(configPathToAdd)) {
      console.log('The path is already included');
      return;
    }

    if (config.includePaths) {
      config.includePaths.push(configPathToAdd);
    } else {
      config.includePaths = [configPathToAdd];
    }

    ConfigSaver.save(configPath, config);
  }
}
