import yargs from "yargs";
import { BuiltInCommands } from "../command/built-in-commands";
import { NcaCommandMapper } from "../mapper/nca-command-mapper";
import { CompletionLoader } from "../mapper/completion-loader";
import { ConfigLoader } from "./config-loader";
import { iter } from "iterator-helper";
import { CommandModuleMapper } from "../mapper/nca-command-module-mapper";
import { AnyObj } from "../util/custom-types";

export class CommandLoader {

  initYargsCommands<T = AnyObj>(argvBuilder: yargs.Argv<T>) {
    const configLoader = new ConfigLoader();
    const ncaCommands = configLoader.loadNcaCommands();

    iter(ncaCommands.sort((a, b) => a.name.localeCompare(b.name)))
      .map(ncaCommand => NcaCommandMapper.map<T>(ncaCommand))
      .forEach(commandModule => argvBuilder.command(commandModule));

    const builtInCommands = new BuiltInCommands();
    iter(builtInCommands.get())
      .map(commandTemplate => CommandModuleMapper.map<T>(commandTemplate.getNcaCommandModule()))
      .forEach(commandModule => argvBuilder.command(commandModule));

    CompletionLoader.initCompletion(argvBuilder, ncaCommands);
  }
}
