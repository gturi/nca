import yargs, { CommandModule } from "yargs";
import { Alias } from "../model/alias";
import { PositionalArgument } from "../model/positional-argument";
import { PositionalArgumentType } from "../model/positional-argument-type";
import { PositionalArgumentUtils } from "../util/positional-argument-utils";
import { OptionBuilder as OptionBuilder } from "./option-builder";
import { PositionalArgumentBuilder } from "./positional-argument-builder";
import { YargsHandlerBuilder } from "./yargs-handler-builder";
import { AnyObj, ArgvBuilder } from "../util/custom-types";

export class AliasMapper {

  static map<T = AnyObj>(alias: Alias): CommandModule<T, AnyObj> {
    return AliasMapper.buildAlias<T>(alias, []);
  }

  private static buildAlias<T = AnyObj>(
    alias: Alias, parentPositionalArguments: PositionalArgument[]
  ): CommandModule<T, AnyObj> {
    const positionalArguments = AliasMapper.getPositionalArguments(
      alias, parentPositionalArguments
    );
    return {
      command: AliasMapper.getCommand(alias, positionalArguments),
      describe: alias.description,
      builder: yargs => AliasMapper.getBuilder<T>(yargs, alias, positionalArguments),
      handler: args => YargsHandlerBuilder.getHandler(args, alias)
    }
  }

  private static getPositionalArguments(
    alias: Alias, parentPositionalArguments: PositionalArgument[]
  ): PositionalArgument[] {
    return [parentPositionalArguments, alias.positionalArguments ?? []].flat().sort((a, b) => {
      return PositionalArgumentType.compare(a.type, b.type);
    });
  }

  private static getCommand(alias: Alias, positionalArguments: PositionalArgument[]) {
    const positionalCommands = positionalArguments.map(positionalArgument => {
      const listType = PositionalArgumentType.isListType(positionalArgument.type) ? '..' : '';
      if (PositionalArgumentUtils.isRequired(positionalArgument)) {
        return `<${positionalArgument.name}${listType}>`
      } else {
        return `[${positionalArgument.name}${listType}]`
      }
    }).join(' ');

    return `${alias.name} ${positionalCommands}`.trimEnd();
  }

  private static getBuilder<T = AnyObj>(
    yargs: yargs.Argv<T>, alias: Alias, positionalArguments: PositionalArgument[]
  ): ArgvBuilder<T> {
    OptionBuilder.build<T>(yargs, alias.options);

    PositionalArgumentBuilder.build<T>(yargs, positionalArguments);

    AliasMapper.buildSubAliases<T>(yargs, positionalArguments, alias.subAliases);

    return AliasMapper.emptyBuilder<T>();
  }

  private static buildSubAliases<T = AnyObj>(
    yargs: yargs.Argv<T>, parentPositionalArguments: PositionalArgument[], subAliases?: Alias[]
  ) {
    if (subAliases) {
      subAliases.forEach(subAlias => {
        yargs.command(AliasMapper.buildAlias<T>(subAlias, parentPositionalArguments));
      });
    }
  }

  private static emptyBuilder<T = AnyObj>(): ArgvBuilder<T> {
    return {} as ArgvBuilder<T>;
  }
}
