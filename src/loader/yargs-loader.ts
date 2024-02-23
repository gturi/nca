import yargs from 'yargs/yargs';
import { hideBin } from 'yargs/helpers';
import { CommandLoader } from './command-loader';
import { ErrorHandler } from '../exception/error-handler';

export class YargsLoader {

  init() {
    ErrorHandler.run(() => {
      const args = this.getProcessArguments();
      const argvBuilder = yargs(args);

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

  private getProcessArguments(): string[] {
    // hideBin keeps only the arguments after the program name
    // i.e. ['node', 'nca', 'config'] -> ['config']
    const args = hideBin(process.argv);

    if (args.length >= 3 && args[0].trim() === 'alias' && args[1].trim() === 'add') {
      // alias add command needs to be handled differently, because otherwise yargs will throw an error
      // since it will try to parse flags and options for the alias command
      return ['alias', 'add', 'stub-info'];
    }

    return args;
  }
}
