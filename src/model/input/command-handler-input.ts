import yargs from 'yargs';
import yaml from 'js-yaml';
import * as iteratorHelper from "iterator-helper";
import { CliUtils } from './cli-utils';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { CommandType } from '../api/command-type';


/**
 * Input object for {@link CommandType.Function} and {@link CommandType.Module} command types.
 * Stores arguments information and other javascript utilites.
 */
export interface CommandHandlerInput<T> {
  /**
   * Script's input arguments.
   */
  args: yargs.ArgumentsCamelCase<T>;
  /**
   * CLI utilities, useful to run commands.
   */
  cliUtils: CliUtils;
  /**
   * Polyfill for iterator helper proposal.
   * For more information refer to iterator-helper npm package.
   */
  iteratorHelper: typeof iteratorHelper;
  /**
   * Function for reading yaml files.
   * For more information refer to js-yaml npm package.
   */
  yaml: typeof yaml;
}
