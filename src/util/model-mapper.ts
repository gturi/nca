import yargs, { CommandModule, describe } from 'yargs';
import { Alias } from '../model/alias';
import shelljs from 'shelljs';
import { CommandType } from '../model/command-type';

export class ModelMapper {

  static map<T = {}>(alias: Alias): CommandModule<T, {}> {
    return {
      command: alias.name,
      describe: alias.description,
      handler: args => {
        if (CommandType.Function === alias.commandType) {
          ModelMapper.functionRunner(args, alias.command);
        } else {
          shelljs.exec(alias.command);
        }
      }
    }
  }

  private static functionRunner(args: yargs.ArgumentsCamelCase<{}>, code: string) {
    const fun = new Function(`
      "use strict;"
      const args = arguments[0];
      const shelljs = arguments[1];
      ${code}
    `);
    fun(args, shelljs);
  }
}
