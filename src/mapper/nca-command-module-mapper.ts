import yargs, { CommandModule } from "yargs";
import { NcaCommandModule } from "../model/internal/nca-command-module";
import { AnyObj, ArgvBuilder } from "../util/custom-types";
import { OptionBuilder } from "./option-builder";
import { PositionalArgumentBuilder } from "./positional-argument-builder";
import { YargsUtils } from "../util/yargs-utils";

export class CommandModuleMapper {

  static map<T = AnyObj>(ncaCommandModule: NcaCommandModule): CommandModule<T, AnyObj> {
    return {
      command: ncaCommandModule.commandName,
      describe: ncaCommandModule.commandDescription,
      builder: yargs => this.getBuilder<T>(yargs, ncaCommandModule),
      handler: args => ncaCommandModule.handler(args)
    };
  }

  private static getBuilder<T = AnyObj>(
    yargs: yargs.Argv<T>,
    ncaCommandModule: NcaCommandModule
  ): ArgvBuilder<T> {
    OptionBuilder.build(yargs, ncaCommandModule.optionParams);

    PositionalArgumentBuilder.build(yargs, ncaCommandModule.positionalArguments);

    ncaCommandModule.subCommands.forEach(subCommand => yargs.command(this.map<T>(subCommand)));

    return YargsUtils.emptyBuilder<T>();
  }

}

