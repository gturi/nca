import { Arguments } from "yargs";
import { CliUtils } from "./cli-utils";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Completion } from "../../model/api/completion";

/**
 * Input object passed to the completion script loaded
 * when specifying {@link Completion.completionPath}.
 */
export class CompletionInput {
  private readonly _current: string;
  private readonly _argv: Arguments;
  private readonly _error: Error | null;
  private readonly _defaultCompletions: string[];
  private readonly _modulePath: string | null;
  private readonly _cliUtils: CliUtils;

  constructor(
    current: string,
    argv: Arguments,
    error: Error | null,
    defaultCompletions: string[] | undefined,
    modulePath: string | null
  ) {
    this._current = current;
    this._argv = argv;
    this._error = error;
    this._defaultCompletions = defaultCompletions ?? [];
    this._modulePath = modulePath;
    this._cliUtils = new CliUtils();
  }

  /**
   * The last inserted argument of nca command
   */
  get current(): string {
    return this._current;
  }

  /**
   * All the arguments parsed by yargs
   */
  get argv(): Arguments {
    return this._argv;
  }

  /**
   * Completion errors
   */
  get error(): Error | null {
    return this._error;
  }

  /**
   * Default yargs completions
   */
  get defaultCompletions(): string[] {
    return this._defaultCompletions;
  }

  /**
   * Module path
   */
  get modulePath(): string | null {
    return this._modulePath;
  }

  /**
   * CLI utilities, useful to run commands.
   */
  get cliUtils(): CliUtils {
    return this._cliUtils;
  }
}
