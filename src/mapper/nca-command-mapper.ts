import yargs, { CommandModule } from "yargs";
import { NcaCommand } from "../model/api/nca-command";
import { PositionalArgument } from "../model/api/positional-argument";
import { PositionalArgumentType } from "../model/api/positional-argument-type";
import { OptionBuilder as OptionBuilder } from "./option-builder";
import { PositionalArgumentBuilder } from "./positional-argument-builder";
import { YargsHandlerBuilder } from "./yargs-handler-builder";
import { AnyObj, ArgvBuilder } from "../util/custom-types";
import { YargsUtils } from "../util/yargs-utils";

export class NcaCommandMapper {

  static map<T = AnyObj>(ncaCommand: NcaCommand): CommandModule<T, AnyObj> {
    return this.buildCommandModule<T>(ncaCommand, []);
  }

  private static buildCommandModule<T = AnyObj>(
    ncaCommand: NcaCommand, parentPositionalArguments: PositionalArgument[]
  ): CommandModule<T, AnyObj> {
    const positionalArguments = this.getPositionalArguments(ncaCommand, parentPositionalArguments);
    return {
      command: YargsUtils.getCommand(ncaCommand.name, positionalArguments),
      describe: ncaCommand.description ?? '',
      builder: yargs => this.getBuilder<T>(yargs, ncaCommand, positionalArguments),
      handler: args => YargsHandlerBuilder.getHandler(args, ncaCommand)
    }
  }

  private static getPositionalArguments(
    ncaCommand: NcaCommand, parentPositionalArguments: PositionalArgument[]
  ): PositionalArgument[] {
    const positionalArguments = [parentPositionalArguments, ncaCommand.positionalArguments ?? []];
    return positionalArguments.flat()
      .sort((a, b) => PositionalArgumentType.compare(a.type, b.type));
  }

  private static getBuilder<T = AnyObj>(
    yargs: yargs.Argv<T>, ncaCommand: NcaCommand, positionalArguments: PositionalArgument[]
  ): ArgvBuilder<T> {
    OptionBuilder.build<T>(yargs, ncaCommand.options);

    PositionalArgumentBuilder.build<T>(yargs, positionalArguments);

    this.buildSubCommands<T>(yargs, positionalArguments, ncaCommand.subCommands);

    return YargsUtils.emptyBuilder<T>();
  }

  private static buildSubCommands<T = AnyObj>(
    yargs: yargs.Argv<T>, parentPositionalArguments: PositionalArgument[],
    subCommands?: NcaCommand[]
  ) {
    subCommands?.forEach(subNcaCommand => {
      yargs.command(this.buildCommandModule<T>(subNcaCommand, parentPositionalArguments));
    });
  }
}
