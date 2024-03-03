import yargs, { CommandModule } from "yargs";
import { Alias } from "../model/api/alias";
import { PositionalArgument } from "../model/api/positional-argument";
import { PositionalArgumentType } from "../model/api/positional-argument-type";
import { OptionBuilder as OptionBuilder } from "./option-builder";
import { PositionalArgumentBuilder } from "./positional-argument-builder";
import { YargsHandlerBuilder } from "./yargs-handler-builder";
import { AnyObj, ArgvBuilder } from "../util/custom-types";
import { YargsUtils } from "../util/yargs-utils";

export class AliasMapper {

  static map<T = AnyObj>(alias: Alias): CommandModule<T, AnyObj> {
    return this.buildAlias<T>(alias, []);
  }

  private static buildAlias<T = AnyObj>(
    alias: Alias, parentPositionalArguments: PositionalArgument[]
  ): CommandModule<T, AnyObj> {
    const positionalArguments = this.getPositionalArguments(alias, parentPositionalArguments);
    return {
      command: YargsUtils.getCommand(alias.name, positionalArguments),
      describe: alias.description ?? '',
      builder: yargs => this.getBuilder<T>(yargs, alias, positionalArguments),
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

  private static getBuilder<T = AnyObj>(
    yargs: yargs.Argv<T>, alias: Alias, positionalArguments: PositionalArgument[]
  ): ArgvBuilder<T> {
    OptionBuilder.build<T>(yargs, alias.options);

    PositionalArgumentBuilder.build<T>(yargs, positionalArguments);

    this.buildSubAliases<T>(yargs, positionalArguments, alias.subAliases);

    return YargsUtils.emptyBuilder<T>();
  }

  private static buildSubAliases<T = AnyObj>(
    yargs: yargs.Argv<T>, parentPositionalArguments: PositionalArgument[], subAliases?: Alias[]
  ) {
    subAliases?.forEach(subAlias => {
      yargs.command(this.buildAlias<T>(subAlias, parentPositionalArguments));
    });
  }
}
