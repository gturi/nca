import yargs, { CommandModule, InferredOptionType, Options } from "yargs";
import { Alias } from "../model/alias";
import { AliasPositionalArgument } from "../model/alias-positional-argument";
import { AliasPositionalArgumentType } from "../model/alias-positional-argument-type";
import { AliasPositionalArgumentUtils } from "../util/alias-positional-argument-utils";
import { OptionBuilder as OptionBuilder } from "./option-builder";
import { PositionalArgumentBuilder as PositionalArgumentBuilder } from "./positional-argument-builder";
import { YargsHandlerBuilder } from "./yargs-handler-builder";

type ArgvBuilder<T> = yargs.Argv<T & { [key in string]: InferredOptionType<Options> }>;

export class AliasMapper {

  static map<T = {}>(alias: Alias): CommandModule<T, {}> {
    return AliasMapper.buildAlias<T>(alias, []);
  }

  private static buildAlias<T = {}>(alias: Alias, parentPositionalArguments: AliasPositionalArgument[]): CommandModule<T, {}> {
    const positionalArguments = AliasMapper.getPositionalArguments(alias, parentPositionalArguments);
    return {
      command: AliasMapper.getCommand(alias, positionalArguments),
      describe: alias.description,
      builder: yargs => AliasMapper.getBuilder<T>(yargs, alias, positionalArguments),
      handler: args => YargsHandlerBuilder.getHandler(args, alias)
    }
  }

  private static getPositionalArguments(alias: Alias, parentPositionalArguments: AliasPositionalArgument[]): AliasPositionalArgument[] {
    return [parentPositionalArguments, alias.positionalArguments ?? []].flat().sort((a, b) => {
      return AliasPositionalArgumentType.compare(a.type, b.type);
    });
  }

  private static getCommand(alias: Alias, positionalArguments: AliasPositionalArgument[]) {
    const positionalCommands = positionalArguments.map(positionalArgument => {
      const listType = AliasPositionalArgumentType.isListType(positionalArgument.type) ? '..' : '';
      if (AliasPositionalArgumentUtils.isRequired(positionalArgument)) {
        return `<${positionalArgument.name}${listType}>`
      } else {
        return `[${positionalArgument.name}${listType}]`
      }
    }).join(' ');

    return `${alias.name} ${positionalCommands}`.trimEnd();
  }

  private static getBuilder<T = {}>(yargs: yargs.Argv<T>, alias: Alias, positionalArguments: AliasPositionalArgument[]): ArgvBuilder<T> {
    OptionBuilder.build<T>(yargs, alias.options);

    PositionalArgumentBuilder.build<T>(yargs, positionalArguments);

    AliasMapper.buildSubAliases<T>(yargs, positionalArguments, alias.subAliases);

    return AliasMapper.emptyBuilder<T>();
  }

  private static buildSubAliases<T = {}>(yargs: yargs.Argv<T>, parentPositionalArguments: AliasPositionalArgument[], subAliases?: Alias[]) {
    if (subAliases) {
      subAliases.forEach(subAlias => {
        yargs.command(AliasMapper.buildAlias<T>(subAlias, parentPositionalArguments));
      });
    }
  }

  private static emptyBuilder<T = {}>(): ArgvBuilder<T> {
    return {} as ArgvBuilder<T>;
  }
}
