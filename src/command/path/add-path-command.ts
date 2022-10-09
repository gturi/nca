import fs from 'fs';
import yaml from 'js-yaml';
import yargs from "yargs";
import { Config } from "../../model/config";
import { PositionalArgument } from '../../model/positional-argument';
import { PositionalArgumentType } from '../../model/positional-argument-type';
import { AnyObj, ArgvBuilder } from "../../util/custom-types";
import { YargsUtils } from '../../util/yargs-utils';
import { Command } from "../command";

export class AddPathCommand extends Command {

  protected getCommandName(): string {
    return YargsUtils.getCommand('add', this.getPositionalArguments());
  }

  protected getCommandDescription(): string {
    return 'include path into configuration file';
  }

  protected getPositionalArguments(): PositionalArgument[] {
    const positionalArgument: PositionalArgument = {
      name: 'newConfigPath',
      description: 'config path to add',
      type: PositionalArgumentType.String,
      required: true
    }
    return [positionalArgument];
  }

  protected getBuilder<T = AnyObj>(yargs: yargs.Argv<T>): ArgvBuilder<T> {

    yargs.option('f', {
      alias: 'file',
      describe: 'configuration path to that will include the new config',
      type: 'string',
      default: Config.getMainConfigFilePath()
    });

    return super.getBuilder<T>(yargs);
  }

  protected getHandler<T = AnyObj>(args: yargs.ArgumentsCamelCase<T>): void {
    const configPath = args.f as string;
    const configPathToAdd = args.configPath as string;

    if (!fs.existsSync(configPath)) {
      throw new Error(`Config file not found: ${configPath}`);
    }

    const data = fs.readFileSync(configPath, 'utf8');
    const config: Config = yaml.load(data) ?? {};

    if (config.includePaths) {
      config.includePaths.push(configPathToAdd);
    } else {
      config.includePaths = [configPathToAdd];
    }

    fs.writeFileSync(configPath, yaml.dump(config), { encoding: 'utf8' });
  }
}
