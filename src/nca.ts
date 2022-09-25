import yargs from 'yargs/yargs';
import { hideBin } from 'yargs/helpers';
import { ModelMapper } from './util/model-mapper';
import { ConfigLoader } from './util/config-loader';

try {
  const argvBuilder = yargs(hideBin(process.argv));

  const aliases = ConfigLoader.loadAliases();

  aliases.sort((a, b) => a.name.localeCompare(b.name))
    .map(alias => ModelMapper.map(alias))
    .forEach(commandModule => argvBuilder.command(commandModule));

  argvBuilder
    .completion()
    .alias('help', 'h')
    .alias('version', 'v')
    .strict()
    .wrap(argvBuilder.terminalWidth())
    .demandCommand(1, '')
    .parse();

} catch (e) {
  console.log(e);
}
