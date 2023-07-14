import yargs, { Arguments, CompletionCallback } from "yargs";
import { Alias } from "../model/alias";
import { Completion } from "../model/completion";
import { LoggingUtil } from "../util/logging-utils";
import { ArrayUtils } from "../util/array-utils";

type CompletionFilter = (onCompleted?: CompletionCallback) => any;
type Done = (completions: string[]) => any;

export class CompletionLoader {

  private aliases: Alias[];

  constructor(aliases: Alias[]) {
    this.aliases = aliases;
  }

  static initCompletion(argvBuilder: yargs.Argv<{}>, aliases: Alias[]) {
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

      const completion = this.getCompletion(argv._);
      const completionArray = this.getCompletionArrayOrDefault(completion, defaultCompletions ?? [])
      done(completionArray);
    });
  }

  private getCompletion(commands: (string | number)[]): Completion | null {
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
    return alias?.completion ?? null;
  }

  private getCompletionArrayOrDefault(completion: Completion | null, defaultCompletions: string[]): string[] {
    let result: string[] | undefined;
    if (completion) {
      const completionArray = this.getCompletionArray(completion);
      if (completion.merge) {
        result = completionArray;
      } else {
        result = completionArray.concat(defaultCompletions);
      }
    } else {
      result = defaultCompletions;
    }
    return result ?? [];
  }

  private getCompletionArray(completion: Completion): string[] {
    return ArrayUtils.concatAll([], completion.completionArray, this.loadCompletionFromPath(completion));
  }

  private loadCompletionFromPath(completion: Completion): string[] | null {
    if (completion.completionPath) {
      const module = require(completion.completionPath);
      return module.default() as string[];
    } else {
      return null;
    }
  }
}
