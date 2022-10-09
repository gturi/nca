import yargs from "yargs";
import { Config } from "../../model/config";
import { AnyObj, ArgvBuilder } from "../../util/custom-types";
import { Command } from "../command";

export class AddPathCommand extends Command {

  protected getCommandName(): string {
    return 'add <configPath>';
  }

  protected getCommandDescription(): string {
    return 'include path into configuration file';
  }

  protected getBuilder<T = AnyObj>(yargs: yargs.Argv<T>): ArgvBuilder<T> {
    yargs.positional('configPath', {
      describe: 'config path to add',
      type: 'string',
      required: true
    });

    yargs.option('f', {
      alias: 'file',
      describe: 'configuration path to that will include the new config',
      type: 'string',
      default: Config.getMainConfigFilePath()
    });

    return super.getBuilder<T>(yargs);
  }
}