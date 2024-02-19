import yargs from 'yargs/yargs';
import { hideBin } from 'yargs/helpers';
import { CommandLoader } from './loader/command-loader';
import { ErrorHandler } from './exception/error-handler';

function nca() {
  ErrorHandler.run(() => {
    const argvBuilder = yargs(hideBin(process.argv));

    const commandLoader = new CommandLoader();
    commandLoader.initYargsCommands(argvBuilder);

    argvBuilder
      .alias('help', 'h')
      .alias('version', 'v')
      .strict()
      .wrap(argvBuilder.terminalWidth())
      .demandCommand(1, '')
      .parse();
  });
}

export { nca };
