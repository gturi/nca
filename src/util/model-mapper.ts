import yargs, { CommandModule, InferredOptionType, Options } from 'yargs';
import { Alias } from '../model/alias';
import shelljs from 'shelljs';
import { CommandType } from '../model/command-type';
import { AliasOption } from '../model/alias-option';
import { AliasPositionalArgument } from '../model/alias-positional-argument';

type ArgvBuilder<T> = yargs.Argv<T & { [key in string]: InferredOptionType<Options> }>;

export class ModelMapper {

  static mapAlias<T = {}>(alias: Alias): CommandModule<T, {}> {
    return {
      command: alias.name,
      describe: alias.description,
      builder: yargs => {
        var builder = ModelMapper.emptyBuilder();

        if (alias.options) {
          alias.options.forEach(aliasOption => {
            ModelMapper.mapOptions(yargs, aliasOption);
          });
        }

        if (alias.positionalArguments) {
          alias.positionalArguments.forEach(positionalArgument => {
            ModelMapper.mapPositional(yargs, positionalArgument);
          });
        }

        if (alias.subAliases) {
          alias.subAliases.forEach(subAlias => {
            yargs.command(ModelMapper.mapAlias(subAlias));
          });
        }

        return builder;
      },
      handler: args => {
        if (alias.command !== '') {
          if (CommandType.Function === alias.commandType) {
            ModelMapper.functionRunner(args, alias.command);
          } else {
            shelljs.exec(alias.command);
          }
        }
      }
    }
  }

  private static emptyBuilder<T = {}>(): ArgvBuilder<T> {
    return {} as ArgvBuilder<T>;
  }

  private static mapOptions<T = {}>(yargs: yargs.Argv<T>, aliasOption: AliasOption): ArgvBuilder<T> {
    const opt: Options = {
      alias: aliasOption.alternativeName,
      type: aliasOption.optionType,
      default: aliasOption.defaultValue
    }
    return yargs.option(aliasOption.name, opt);
  }

  private static mapPositional<T = {}>(yargs: yargs.Argv<T>, positionalArgument: AliasPositionalArgument): ArgvBuilder<T> {
    return yargs.positional(positionalArgument.name, {
      describe: positionalArgument.description,
      type: positionalArgument.type,
      default: positionalArgument.defaultValue,
      required: positionalArgument.required,
    });
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
