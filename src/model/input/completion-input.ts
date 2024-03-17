import yaml from 'js-yaml';
import * as iteratorHelper from "iterator-helper";
import { Arguments } from "yargs";
import { CliUtils } from "./cli-utils";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Completion } from "../../model/api/completion";

/**
 * Input object passed to the completion script loaded
 * when specifying {@link Completion.completionPath}.
 */
export interface CompletionInput {
  /**
   * The last inserted argument of nca command
   */
  current: string;
  /**
   * All the arguments parsed by yargs
   */
  argv: Arguments;
  /**
   * Completion errors
   */
  error: Error | null;
  /**
   * Default yargs completions
   */
  defaultCompletions: string[];
  /**
   * Module path
   */
  modulePath: string | null;
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
