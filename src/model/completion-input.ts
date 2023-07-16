import { Arguments } from "yargs";

/**
 * Input object for {@link Completion.completionPath} imported script.
 */
export class CompletionInput {
  private readonly _current: string;
  private readonly _argv: Arguments;
  private readonly _error: Error | null;
  private readonly _defaultCompletions: string[];
  private readonly _modulePath: string | null

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
}
