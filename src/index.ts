#!/usr/bin/env node

import yargs from 'yargs/yargs';
import { hideBin } from 'yargs/helpers';
import { AliasMapper } from './mapper/alias-mapper';
import { ConfigLoader } from './util/config-loader';
import { ConfigCommand } from './command/config-command';
import { CompletionLoader } from './mapper/completion-loader';

function nca() {
  const argvBuilder = yargs(hideBin(process.argv));

  const aliases = ConfigLoader.loadAliases();

  aliases.sort((a, b) => a.name.localeCompare(b.name))
    .map(alias => AliasMapper.map(alias))
    .forEach(commandModule => argvBuilder.command(commandModule));

  argvBuilder.command(new ConfigCommand().getCommand());

  CompletionLoader.initCompletion(argvBuilder, aliases);

  argvBuilder
    .alias('help', 'h')
    .alias('version', 'v')
    .strict()
    .wrap(argvBuilder.terminalWidth())
    .demandCommand(1, '')
    .parse();
}

nca();
