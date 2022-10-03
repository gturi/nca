import yargs, { CommandModule, InferredOptionType, Options } from 'yargs';
import { Alias } from '../model/alias';
import shelljs from 'shelljs';
import { CommandType } from '../model/command-type';
import { AliasOption } from '../model/alias-option';
import { AliasPositionalArgument } from '../model/alias-positional-argument';
import { AliasPositionalArgumentType } from '../model/alias-positional-argument-type';
import { ArrayUtils } from './array-utils';

type ArgvBuilder<T> = yargs.Argv<T & { [key in string]: InferredOptionType<Options> }>;

export class ModelMapper {

  static mapAlias<T = {}>(alias: Alias): CommandModule<T, {}> {
    return ModelMapper.mapAliasWithPositional<T>(alias, []);
  }

  private static mapAliasWithPositional<T = {}>(alias: Alias, parentPositionalArguments: AliasPositionalArgument[]): CommandModule<T, {}> {
    const positionalArguments = ModelMapper.getPositionalArguments(alias, parentPositionalArguments);
    return {
      command: ModelMapper.getCommand(alias, positionalArguments),
      describe: alias.description,
      builder: yargs => ModelMapper.getBuilder<T>(yargs, alias, positionalArguments),
      handler: args => ModelMapper.getHandler(args, alias)
    }
  }

  private static getCommand(alias: Alias, positionalArguments: AliasPositionalArgument[]) {
    const positionalCommands = positionalArguments.map(positionalArgument => {
      const listType = AliasPositionalArgumentType.isListType(positionalArgument.type) ? '..' : '';
      if (positionalArgument.required && (positionalArgument.defaultValue === null || positionalArgument.defaultValue === undefined)) {
        return `<${positionalArgument.name}${listType}>`
      } else {
        return `[${positionalArgument.name}${listType}]`
      }
    }).join(' ');

    return `${alias.name} ${positionalCommands}`.trimEnd();
  }

  private static getBuilder<T = {}>(yargs: yargs.Argv<T>, alias: Alias, positionalArguments: AliasPositionalArgument[]): ArgvBuilder<T> {
    ModelMapper.buildOptions<T>(yargs, alias.options);

    ModelMapper.buildPositionalArguments<T>(yargs, positionalArguments);

    ModelMapper.buildSubAliases<T>(yargs, positionalArguments, alias.subAliases);

    return ModelMapper.emptyBuilder<T>();
  }

  private static getPositionalArguments(alias: Alias, parentPositionalArguments: AliasPositionalArgument[]): AliasPositionalArgument[] {
    return [parentPositionalArguments, alias.positionalArguments ?? []].flat().sort((a, b) => {
      return AliasPositionalArgumentType.compare(a.type, b.type);
    });
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
      type: AliasPositionalArgumentType.toYargsType(positionalArgument.type),
      default: positionalArgument.defaultValue,
      required: positionalArgument.defaultValue !== null && (positionalArgument.defaultValue === null || positionalArgument.defaultValue === undefined)
    });
  }

  private static buildSubAliases<T = {}>(yargs: yargs.Argv<T>, parentPositionalArguments: AliasPositionalArgument[], subAliases?: Alias[]) {
    if (subAliases) {
      subAliases.forEach(subAlias => {
        yargs.command(ModelMapper.mapAliasWithPositional<T>(subAlias, parentPositionalArguments));
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
