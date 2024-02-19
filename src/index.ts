import yargs from 'yargs/yargs';
import { hideBin } from 'yargs/helpers';
import { AliasMapper } from './mapper/alias-mapper';
import { ConfigLoader } from './loader/config-loader';
import { ConfigCommand } from './command/config-command';
import { CompletionLoader } from './mapper/completion-loader';
import { iter } from 'iterator-helper';
import { CommandMapper } from './mapper/command-mapper';
import { AliasCommand } from './command/alias-command';

function nca() {
  const argvBuilder = yargs(hideBin(process.argv));

  const configLoader = new ConfigLoader();
  const aliases = configLoader.loadAliases();

  iter(aliases.sort((a, b) => a.name.localeCompare(b.name)))
    .map(alias => AliasMapper.map(alias))
    .forEach(commandModule => argvBuilder.command(commandModule));

  iter([new ConfigCommand(), new AliasCommand()])
    .map(command => CommandMapper.map(command))
    .forEach(commandModule => argvBuilder.command(commandModule));

  CompletionLoader.initCompletion(argvBuilder, aliases);

  argvBuilder
    .alias('help', 'h')
    .alias('version', 'v')
    .strict()
    .wrap(argvBuilder.terminalWidth())
    .demandCommand(1, '')
    .parse();
}

export { nca };
