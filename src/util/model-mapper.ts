import yargs, { CommandModule, describe, InferredOptionType, Options } from 'yargs';
import { Alias } from '../model/alias';
import shelljs from 'shelljs';
import { CommandType } from '../model/command-type';
import { AliasOption } from '../model/alias-option';

export class ModelMapper {

  static map<T = {}>(alias: Alias): CommandModule<T, {}> {
    return {
      command: alias.name,
      describe: alias.description,
      builder: yargs => {
        if (alias.options) {
          return alias.options.reduce(
            (_prev, aliasOption) => ModelMapper.mapOptions(yargs, aliasOption),
            ModelMapper.emptyBuilder()
          )
        }
        return ModelMapper.emptyBuilder();
      },
      handler: args => {
        if (CommandType.Function === alias.commandType) {
          ModelMapper.functionRunner(args, alias.command);
        } else {
          shelljs.exec(alias.command);
        }
      }
    }
  }

  private static mapOptions<T = {}>(yargs: yargs.Argv<T>, aliasOption: AliasOption): yargs.Argv<T & { [key in string]: InferredOptionType<Options> }> {
    const opt: Options = {
      alias: aliasOption.alternativeName,
      type: aliasOption.optionType,
      default: aliasOption.defaultValue
    }
    return yargs.option(aliasOption.name, opt);
  }

  private static emptyBuilder<T = {}>(): yargs.Argv<T & { [key in string]: InferredOptionType<Options> }> {
    return {} as yargs.Argv<T & { [key in string]: InferredOptionType<Options> }>
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
