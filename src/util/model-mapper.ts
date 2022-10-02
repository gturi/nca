import yargs, { CommandModule, InferredOptionType, Options } from 'yargs';
import { Alias } from '../model/alias';
import shelljs from 'shelljs';
import { CommandType } from '../model/command-type';
import { AliasOption } from '../model/alias-option';
import { AliasPositionalArgument } from '../model/alias-positional-argument';
import { AliasPositionalArgumentType } from '../model/alias-positional-argument-type';

type ArgvBuilder<T> = yargs.Argv<T & { [key in string]: InferredOptionType<Options> }>;

export class ModelMapper {

  static mapAlias<T = {}>(alias: Alias): CommandModule<T, {}> {
    return {
      command: ModelMapper.getCommand(alias),
      describe: alias.description,
      builder: yargs => ModelMapper.getBuilder<T>(yargs, alias),
      handler: args => ModelMapper.getHandler(args, alias)
    }
  }

  private static getCommand(alias: Alias) {
    var command: string;

    if (alias.positionalArguments) {
      const positionalCommands = alias.positionalArguments?.map(positionalArgument => {
        const listType = ModelMapper.isList(positionalArgument.type) ? '..' : '';
        if (positionalArgument.required && (positionalArgument.defaultValue === null || positionalArgument.defaultValue === undefined)) {
          return `<${positionalArgument.name}${listType}>`
        } else {
          return `[${positionalArgument.name}${listType}]`
        }
      }).join(' ');

      command = `${alias.name} ${positionalCommands}`;
    } else {
      command = alias.name;
    }

    return command.trimEnd();
  }

  private static isList(type: AliasPositionalArgumentType) {
    return AliasPositionalArgumentType.BooleanList == type ||
      AliasPositionalArgumentType.NumberList == type ||
      AliasPositionalArgumentType.StringList == type;
  }

  private static getBuilder<T = {}>(yargs: yargs.Argv<T>, alias: Alias): ArgvBuilder<T> {
    ModelMapper.buildOptions<T>(yargs, alias.options);

    ModelMapper.buildPositionalArguments<T>(yargs, alias.positionalArguments);

    ModelMapper.buildSubAliases<T>(yargs, alias.subAliases);

    return ModelMapper.emptyBuilder<T>();
  }

  private static emptyBuilder<T = {}>(): ArgvBuilder<T> {
    return {} as ArgvBuilder<T>;
  }

  private static buildOptions<T = {}>(yargs: yargs.Argv<T>, aliasOptions?: AliasOption[]) {
    if (aliasOptions) {
      aliasOptions.forEach(aliasOption => {
        ModelMapper.buildOption<T>(yargs, aliasOption);
      });
    }
  }

  private static buildOption<T = {}>(yargs: yargs.Argv<T>, aliasOption: AliasOption) {
    const opt: Options = {
      alias: aliasOption.alternativeName,
      type: aliasOption.optionType,
      default: aliasOption.defaultValue
    }
    yargs.option(aliasOption.name, opt);
  }

  private static buildPositionalArguments<T = {}>(yargs: yargs.Argv<T>, positionalArguments?: AliasPositionalArgument[]) {
    if (positionalArguments) {
      positionalArguments.forEach(positionalArgument => {
        ModelMapper.buildPositional<T>(yargs, positionalArgument);
      });
    }
  }

  private static buildPositional<T = {}>(yargs: yargs.Argv<T>, positionalArgument: AliasPositionalArgument) {
    yargs.positional(positionalArgument.name, {
      describe: positionalArgument.description,
      type: ModelMapper.toYargsType(positionalArgument.type),
      default: positionalArgument.defaultValue,
      required: positionalArgument.defaultValue !== null && (positionalArgument.defaultValue === null || positionalArgument.defaultValue === undefined)
    });
  }

  private static toYargsType(type: AliasPositionalArgumentType): yargs.PositionalOptionsType | undefined {
    switch (type) {
      case AliasPositionalArgumentType.Boolean:
      case AliasPositionalArgumentType.BooleanList:
        return 'boolean';
      case AliasPositionalArgumentType.Number:
      case AliasPositionalArgumentType.NumberList:
        return 'number';
      case AliasPositionalArgumentType.String:
      case AliasPositionalArgumentType.StringList:
        return 'string';
      default:
        return undefined;
    }
  }

  private static buildSubAliases<T = {}>(yargs: yargs.Argv<T>, subAliases?: Alias[]) {
    if (subAliases) {
      subAliases.forEach(subAlias => {
        yargs.command(ModelMapper.mapAlias<T>(subAlias));
      });
    }
  }

  private static getHandler<T = {}>(args: yargs.ArgumentsCamelCase<T>, alias: Alias) {
    if (alias.command !== '') {
      if (CommandType.Function === alias.commandType) {
        ModelMapper.functionRunner(args, alias.command);
      } else {
        shelljs.exec(alias.command);
      }
    }
  }

  private static functionRunner<T = {}>(args: yargs.ArgumentsCamelCase<T>, code: string) {
    const fun = new Function(`
      "use strict;"
      const args = arguments[0];
      const shelljs = arguments[1];
      ${code}
    `);
    fun(args, shelljs);
  }
}
