import yargs, { Arguments, CompletionCallback } from "yargs";
import { Alias } from "../model/alias";
import { Completion } from "../model/completion";
import { LoggingUtil } from "../util/logging-utils";
import { ArrayUtils } from "../util/array-utils";
import { PathUtils } from "../util/path-utils";

/* eslint-disable @typescript-eslint/no-explicit-any */
type CompletionFilter = (onCompleted?: CompletionCallback) => any;
type Done = (completions: string[]) => any;
/* eslint-enable @typescript-eslint/no-explicit-any */

export class CompletionLoader {

  private aliases: Alias[];

  constructor(aliases: Alias[]) {
    this.aliases = aliases;
  }

  static initCompletion<T>(argvBuilder: yargs.Argv<T>, aliases: Alias[]) {
    argvBuilder.completion(
      'completion',
      (current: string, argv: Arguments,
        completionFilter: CompletionFilter, done: Done) => {
        return new CompletionLoader(aliases).load(current, argv, completionFilter, done);
      }
    );
  }

  load(current: string, argv: Arguments, completionFilter: CompletionFilter, done: Done) {
    completionFilter((err, defaultCompletions) => {

      LoggingUtil.logToFile(
        () => [
          '------------------',
          'current "' + current + '"',
          'argv "' + JSON.stringify(argv) + '"',
          '------------------',
          '',
          ''
        ].join('\n')
      );

      const alias = this.getCurrentAlias(argv._);
      const completionArray = this.getCompletionArray(alias, defaultCompletions ?? [])
      done(completionArray);
    });
  }

  private getCurrentAlias(commands: (string | number)[]): Alias | null {
    let aliases: Alias[] | undefined = this.aliases;
    let alias: Alias | undefined;
    // TODO: find a way to rewrite it in a more functional way
    for (const command of commands) {
      if (command !== 'nca' && command !== '') {
        alias = aliases?.find(alias => alias.name === '' + command);
        if (alias === undefined) {
          return null;
        } else {
          aliases = alias.subAliases;
        }
      }
    }
    return alias ?? null;
  }

  private getCompletionArray(alias: Alias | null, defaultCompletions: string[]): string[] {
    const completion = alias?.completion;
    let result: string[] | undefined;
    if (completion) {
      const completionArray = ArrayUtils.concatAll(
        [], completion.completionArray, this.loadCompletionFromPath(alias)
      );
      if (completion.merge) {
        result = completionArray.concat(defaultCompletions);
      } else {
        result = completionArray;
      }
    } else {
      result = defaultCompletions;
    }
    return result ?? [];
  }

  private loadCompletionFromPath(alias: Alias): string[] | null {
    /* eslint-disable @typescript-eslint/no-var-requires */
    const completionPath = alias.completion?.completionPath;
    if (completionPath) {
      const modulePath = PathUtils.resolvePath(completionPath, alias.aliasDirectory);
      const module = require(modulePath);
      return module() as string[];
    } else {
      return null;
    }
    /* eslint-enable @typescript-eslint/no-var-requires */
  }
}
