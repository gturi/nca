import yargs from "yargs";
import { BuiltInCommands } from "../command/built-in-commands";
import { AliasMapper } from "../mapper/alias-mapper";
import { CompletionLoader } from "../mapper/completion-loader";
import { ConfigLoader } from "./config-loader";
import { iter } from "iterator-helper";
import { CommandMapper } from "../mapper/command-mapper";
import { AnyObj } from "../util/custom-types";

export class CommandLoader {

  initYargsCommands<T = AnyObj>(argvBuilder: yargs.Argv<T>) {
    const configLoader = new ConfigLoader();
    const aliases = configLoader.loadAliases();

    iter(aliases.sort((a, b) => a.name.localeCompare(b.name)))
      .map(alias => AliasMapper.map<T>(alias))
      .forEach(commandModule => argvBuilder.command(commandModule));

    const builtInCommands = new BuiltInCommands();
    iter(builtInCommands.get())
      .map(command => CommandMapper.map<T>(command))
      .forEach(commandModule => argvBuilder.command(commandModule));

    CompletionLoader.initCompletion(argvBuilder, aliases);
  }
}
