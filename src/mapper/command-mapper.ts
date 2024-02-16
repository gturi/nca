import yargs, { CommandModule } from "yargs";
import { Command } from "../command/command";
import { AnyObj, ArgvBuilder } from "../util/custom-types";
import { OptionBuilder } from "./option-builder";
import { PositionalArgumentBuilder } from "./positional-argument-builder";
import { YargsUtils } from "../util/yargs-utils";

export class CommandMapper {

  static map<T = AnyObj>(command: Command): CommandModule<T, AnyObj> {
    return {
      command: command.getCommandName(),
      describe: command.getCommandDescription(),
      builder: yargs => this.getBuilder<T>(yargs, command),
      handler: args => command.getHandler(args)
    };
  }

  private static getBuilder<T = AnyObj>(yargs: yargs.Argv<T>, command: Command): ArgvBuilder<T> {
    PositionalArgumentBuilder.build(yargs, command.getPositionalArguments());

    OptionBuilder.build(yargs, command.getOptionParams());

    command.getSubCommands().forEach(c => yargs.command(this.map<T>(c)));

    return YargsUtils.emptyBuilder<T>();
  }

}

