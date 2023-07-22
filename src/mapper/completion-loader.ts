import yargs, { Arguments, CompletionCallback } from "yargs";
import { Alias } from "../model/api/alias";
import { Completion } from "../model/api/completion";
import { LoggingUtil } from "../util/logging-utils";
import { ArrayUtils } from "../util/array-utils";
import { PathUtils } from "../util/path-utils";
import { CompletionInput } from "../model/input/completion-input";
import { NcaConfig } from "../config/nca-config";

/* eslint-disable @typescript-eslint/no-explicit-any */
type CompletionFilter = (onCompleted?: CompletionCallback) => any;
type Done = (completions: string[]) => any;
/* eslint-enable @typescript-eslint/no-explicit-any */
type CurrentAlias = {
  alias: Alias | undefined;
  subAliases: Alias[] | undefined;
};

export class CompletionLoader {

  private readonly aliases: Alias[];
  private readonly current: string;
  private readonly argv: Arguments;
  private readonly completionFilter: CompletionFilter;
  private readonly done: Done;

  protected constructor(
    aliases: Alias[],
    current: string,
    argv: Arguments,
    completionFilter: CompletionFilter,
    done: Done
  ) {
    this.aliases = aliases;
    this.current = current;
    this.argv = argv;
    this.completionFilter = completionFilter;
    this.done = done;
  }

  static initCompletion<T>(argvBuilder: yargs.Argv<T>, aliases: Alias[]) {
    argvBuilder.completion(
      'completion',
      (current: string, argv: Arguments,
        completionFilter: CompletionFilter, done: Done) => {
        return new CompletionLoader(aliases, current, argv, completionFilter, done).load();
      }
    );
  }

  protected load() {
    this.completionFilter((err, defaultCompletions) => {

      LoggingUtil.logToFile(
        () => [
          '------------------',
          `current: "${this.current}"`,
          `argv: "${JSON.stringify(this.argv)}"`,
          `error: "${JSON.stringify(err)}"`,
          '------------------',
          '',
          ''
        ].join('\n')
      );

      const alias = this.getCurrentAlias(this.argv._);

      const modulePath = this.getModulePath(alias);

      const completionInput = new CompletionInput(
        this.current, this.argv, err, defaultCompletions, modulePath
      );

      const completionArray = this.getCompletionArray(alias?.completion, completionInput)
      this.done(completionArray);
    });
  }

  private getCurrentAlias(commands: (string | number)[]): Alias | null {
    const currentAlias: CurrentAlias = {
      alias: undefined,
      subAliases: this.aliases
    };
    commands
      .map(command => `${command}`)
      .filter(command => !NcaConfig.getForbiddenNames().includes(command))
      // find last + break operation:
      // the first command that is not found will terminate the loop
      .every(command => this.existsAliasForCommand(currentAlias, command));
    return currentAlias.alias ?? null;
  }

  private existsAliasForCommand(currentAlias: CurrentAlias, command: string): boolean {
    currentAlias.alias = currentAlias.subAliases?.find(alias => alias.name === command);
    currentAlias.subAliases = currentAlias.alias?.subAliases;
    return currentAlias.alias !== undefined;
  }

  private getModulePath(alias: Alias | null): string | null {
    if (alias) {
      const completionPath = alias.completion?.completionPath
      return completionPath
        ? PathUtils.resolvePath(completionPath, alias.aliasDirectory)
        : null;
    } else {
      return null;
    }
  }

  private getCompletionArray(
    completion: Completion | undefined, completionInput: CompletionInput
  ): string[] {
    let result: string[] | undefined;

    const defaultCompletions = completionInput.defaultCompletions
    if (completion) {
      const customCompletionArray = this.getCustomCompletionArray(
        completion, completionInput
      );
      result = completion.merge
        ? customCompletionArray.concat(defaultCompletions)
        : customCompletionArray;
    } else {
      result = defaultCompletions;
    }

    return result ?? [];
  }

  private getCustomCompletionArray(
    completion: Completion, completionInput: CompletionInput
  ): string[] {
    return ArrayUtils.concatAll(
      [], completion.completionArray, this.loadCompletionFromPath(completionInput)
    );
  }

  private loadCompletionFromPath(completionInput: CompletionInput): string[] | null {
    /* eslint-disable @typescript-eslint/no-var-requires */
    const modulePath = completionInput.modulePath;
    if (modulePath) {
      const module = require(modulePath);
      return module(completionInput) as string[];
    } else {
      return null;
    }
    /* eslint-enable @typescript-eslint/no-var-requires */
  }
}
