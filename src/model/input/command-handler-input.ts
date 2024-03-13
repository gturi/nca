import yargs from 'yargs';
import { CliUtils } from './cli-utils';
import * as iteratorHelper from "iterator-helper";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { CommandType } from '../api/command-type';


/**
 * Input object for {@link CommandType.Function} and {@link CommandType.Module} command types.
 * Stores arguments information and other javascript utilites.
 */
export class CommandHandlerInput<T> {
  private readonly _args: yargs.ArgumentsCamelCase<T>;
  private readonly _cliUtils: CliUtils;
  private readonly _iteratorHelper: typeof iteratorHelper;

  constructor(args: yargs.ArgumentsCamelCase<T>) {
    this._args = args;
    this._cliUtils = new CliUtils();
    this._iteratorHelper = iteratorHelper;
  }

  /**
   * Script's input arguments.
   */
  get args() {
    return this._args;
  }

  /**
   * CLI utilities, useful to run commands.
   */
  get cliUtils(): CliUtils {
    return this._cliUtils;
  }

  get iteratorHelper(): typeof iteratorHelper {
    return this._iteratorHelper;
  }
}
